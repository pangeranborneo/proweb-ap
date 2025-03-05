// index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = 3001;

app.use(cors());

// Agar Express.js dapat membaca data dari body request atau memproses JSON dibody
app.use(express.json());

// GET route - Server memberikan respons "Hello World from Express.js!".
app.get('/', (req, res) => {
  res.send('Hello World from Express.js!');
});

// POST route - Server menerima data JSON dengan key "nama", lalu dikembalikan sebagai respons yang sama.
app.post('/data', (req, res) => {
  const { nama } = req.body; // Data dari client
  res.send(`Data diterima: ${nama}`);
});


// CREATE
app.post('/produk', async (req, res) => {
  const { nama, harga } = req.body;
  try {
    const newProduk = await pool.query(
      'INSERT INTO produk (nama, harga) VALUES ($1, $2) RETURNING *',
      [nama, harga]
    );
    res.json(newProduk.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ
app.get('/produk', async (req, res) => {
  try {
    const allProduk = await pool.query('SELECT * FROM produk');
    res.json(allProduk.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE - Mengupdate data produk berdasarkan ID
app.put('/produk/:id', async (req, res) => {
  const { id } = req.params;
  const { nama, harga } = req.body;
  try {
    const updateProduk = await pool.query(
      'UPDATE produk SET nama = $1, harga = $2 WHERE id = $3 RETURNING *',
      [nama, harga, id]
    );

    if (updateProduk.rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json(updateProduk.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - Menghapus produk berdasarkan ID
app.delete('/produk/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduk = await pool.query(
      'DELETE FROM produk WHERE id = $1 RETURNING *',
      [id]
    );

    if (deleteProduk.rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json({ message: `Produk dengan ID ${id} berhasil dihapus`, data: deleteProduk.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});