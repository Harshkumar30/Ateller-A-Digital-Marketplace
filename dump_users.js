const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, 'users.xlsx');
console.log('File exists:', fs.existsSync(FILE_PATH));
if (fs.existsSync(FILE_PATH)) {
  try {
    const wb = xlsx.readFile(FILE_PATH);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(sheet);
    console.log('Users JSON:', JSON.stringify(json, null, 2));
    const range = xlsx.utils.decode_range(sheet['!ref']);
    console.log('Sheet range:', JSON.stringify({range, headers: Object.keys(json[0] || {})}));
  } catch (e) {
    console.error('Read error:', e.message);
  }
} else {
  console.log('File missing');
}
