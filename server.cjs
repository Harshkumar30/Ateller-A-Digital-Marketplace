const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
const PORT = 5005;
const FILE_PATH = path.join(__dirname, 'users.xlsx');

app.use(cors());
app.use(express.json());

// Helper: Read/Write Excel
const getUsers = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      console.log('users.xlsx not found, returning empty');
      return [];
    }
    console.log('Reading file:', FILE_PATH);
    const workbook = xlsx.readFile(FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    console.log('Sheet name:', sheetName);
    const sheet = workbook.Sheets[sheetName];
    const users = xlsx.utils.sheet_to_json(sheet);
    console.log(`Parsed ${users.length} users`);
    return users;
  } catch (error) {
    console.error('getUsers error:', error.message);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    console.log(`Saving ${users.length} users to ${FILE_PATH}`);
    const worksheet = xlsx.utils.json_to_sheet(users);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Users');
    xlsx.writeFile(workbook, FILE_PATH);
    console.log('File write completed');
  } catch (error) {
    console.error('saveUsers error:', error.message);
    throw error; // Re-throw to be caught by caller
  }
};

// --- API Endpoints ---

// Register - with logging and error handling
app.post('/api/register', (req, res) => {
  try {
    console.log('Register attempt:', req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ error: 'Missing fields' });
    }

    console.log('Reading users.xlsx...');
    const users = getUsers();
    console.log(`Found ${users.length} existing users`);

    if (users.find(u => u.email === email)) {
      console.log('Duplicate email:', email);
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { name, email, password, registeredAt: new Date().toISOString() };
    console.log('New user:', newUser);
    users.push(newUser);
    
    console.log('Saving users.xlsx...');
    saveUsers(users);
    console.log('users.xlsx saved successfully');
    
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (error) {
    console.error('Register error:', error.message, error.stack);
    res.status(500).json({ error: 'Server error during registration: ' + error.message });
  }
});

// Login - with basic logging
app.post('/api/login', (req, res) => {
  try {
    console.log('Login attempt:', req.body.email);
    const { email, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.email === email && String(u.password) === String(password));

    if (!user) {
      console.log('Login failed: invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful:', email);
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.listen(PORT, () => {
  console.log(`Luxe Auth Server running at http://localhost:${PORT}`);
});
