const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, 'users.xlsx');
console.log('File exists:', fs.existsSync(FILE_PATH));
console.log('File size:', fs.existsSync(FILE_PATH) ? `${fs.statSync(FILE_PATH).size} bytes` : 'N/A');
if (fs.existsSync(FILE_PATH)) {
  try {
    const wb = xlsx.readFile(FILE_PATH);
    console.log('Sheets:', wb.SheetNames);
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(sheet, {header: 1});
    console.log('Raw sheet data (first 10 rows):', JSON.stringify(json.slice(0,10), null, 2));
    const users = xlsx.utils.sheet_to_json(sheet);
    console.log('Parsed users:', JSON.stringify(users, null, 2));
    console.log('Number of users:', users.length);
  } catch (e) {
    console.error('Read error:', e.message);
    console.error('Stack:', e.stack);
  }
} else {
  console.log('File missing - create it first');
}
