const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5005/api/register', {
      name: 'Luxe Member XP',
      email: 'member@luxe.com',
      password: 'password123'
    });
    console.log('Registration Success:', res.data);

    const loginRes = await axios.post('http://localhost:5005/api/login', {
      email: 'member@luxe.com',
      password: 'password123'
    });
    console.log('Login Success:', loginRes.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

test();
