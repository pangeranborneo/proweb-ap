import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TambahProduk() {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama || !harga) return setError('Semua field wajib diisi');
    
    axios.post('http://localhost:3001/produk', { nama, harga })
      .then(() => {
        setNama('');
        setHarga('');
        setError('');
        toast.success('Produk berhasil ditambahkan!', { autoClose: 2000 });
      })
      .catch(err => {
        console.error(err);
        setError('Gagal menyimpan data');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Tambah Produk Baru</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nama Produk</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Harga</label>
                  <div className="input-group">
                    <span className="input-group-text">Rp</span>
                    <input
                      type="number"
                      className="form-control"
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Simpan Produk
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default TambahProduk;