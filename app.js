const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Root route for API usage instructions
app.get('/', (req, res) => {
  res.send(`
    <h2>🎓 School Management API</h2>
    <p>Welcome! This API allows you to add and retrieve schools sorted by distance.</p>
    <h3>📌 Available Endpoints:</h3>
    <ul>
      <li><strong>POST</strong> <code>/api/addSchool</code> – Add a new school</li>
      <li><strong>GET</strong> <code>/api/listSchools?latitude=12.97&longitude=77.59</code> – List schools sorted by proximity</li>
    </ul>
    <p>Use a tool like <a href="https://www.postman.com/" target="_blank">Postman</a> to test the endpoints.</p>
  `);
});

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
