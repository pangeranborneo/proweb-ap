import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State untuk pesan sukses
  const Adding = () => toast("Produk Berhasil Ditambah!");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi
    if (!nama || !harga) {
      setError('Nama dan Harga wajib diisi');
      setSuccessMessage(''); // Hapus pesan sukses jika ada error
      return;
    }
    setError('');

    axios.post('http://localhost:3001/produk', { nama, harga })
      .then((res) => {
        console.log('Produk berhasil ditambah:', res.data);
        setNama('');
        setHarga('');
        setSuccessMessage('Data berhasil disimpan!'); // Set pesan sukses
        setError(''); // Hapus pesan error jika ada
      })
      .catch((err) => {
        console.error('Error menambah produk:', err);
        setError('Gagal menyimpan data. Silakan coba lagi.'); // Set pesan error
        setSuccessMessage(''); // Hapus pesan sukses jika ada error
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title text-center">Tambah Produk</h2>
            </div>
            <div className="card-body">
              {/* Tampilkan pesan error jika ada */}
              {error && <div className="alert alert-danger">{error}</div>}
              
              {/* Tampilkan pesan sukses jika ada */}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="namaProduk" className="form-label">Nama Produk:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="namaProduk"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="hargaProduk" className="form-label">Harga:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="hargaProduk"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" onClick={Adding} className="btn btn-primary">Simpan</button>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahProduk;