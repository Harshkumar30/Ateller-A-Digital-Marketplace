import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import * as xlsx from 'xlsx'

const excelStoragePlugin = () => ({
  name: 'excel-storage-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Create a URL object to handle query params and ensure clean path matching
      const url = req.url.split('?')[0];
      
      // Test endpoint to verify plugin is active
      if (url === '/api/test' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ message: 'Excel plugin is active' }));
      }

      if ((url === '/api/register' || url === '/api/login') && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            if (!body) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Empty request body' }));
            }
            
            const data = JSON.parse(body);
            const FILE_PATH = path.resolve(process.cwd(), 'users.xlsx');
            
            // Helper: Read users
            const getUsers = () => {
              try {
                if (!fs.existsSync(FILE_PATH)) return [];
                const workbook = xlsx.readFile(FILE_PATH);
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                return xlsx.utils.sheet_to_json(sheet);
              } catch (e) {
                console.error('Error reading users.xlsx:', e.message);
                return [];
              }
            };

            // Helper: Save users
            const saveUsers = (users) => {
              try {
                const worksheet = xlsx.utils.json_to_sheet(users);
                const workbook = xlsx.utils.book_new();
                xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
                xlsx.writeFile(workbook, FILE_PATH);
              } catch (e) {
                console.error('Error writing users.xlsx:', e.message);
                throw new Error('Failed to save data. The file might be open in another program.');
              }
            };

            const users = getUsers();

            if (url === '/api/register') {
              const { name, email, password } = data;
              if (!name || !email || !password) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Missing name, email, or password' }));
              }
              if (users.find(u => u.email === email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'User already exists' }));
              }
              const newUser = { name, email, password, registeredAt: new Date().toISOString() };
              users.push(newUser);
              saveUsers(users);
              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'User registered successfully', user: { name, email } }));
            } else if (url === '/api/login') {
              const { email, password } = data;
              const user = users.find(u => u.email === email && String(u.password) === String(password));
              if (!user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Invalid credentials' }));
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Login successful', user: { name: user.name, email: user.email } }));
            }
          } catch (error) {
            console.error('Plugin Error:', error.message);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), excelStoragePlugin()],
})
