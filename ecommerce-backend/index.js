// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

// Agar Express.js dapat membaca data dari body request atau memproses JSON dibody
app.use(express.json());

// GET route
app.get('/', (req, res) => {
  res.send('Hello World from Express.js!');
});


// POST route
app.post('/data', (req, res) => {
  const { nama } = req.body; // Data dari client
  res.send(`Data diterima: ${nama}`);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});