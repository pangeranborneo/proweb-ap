// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TambahProduk from './components/TambahProduk';
import ProdukList from './components/ProdukList';

function App() {
  return (
    <Router>
      {/* Navbar dengan perbaikan active state */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          {/* Logo/navbar brand */}
          <NavLink className="navbar-brand" to="/">
            Ecommerce
          </NavLink>
          
          {/* Container untuk tombol navigasi */}
          <div className="d-flex gap-2">
            {/* Link Daftar Produk */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `btn ${isActive ? 'btn-primary' : 'btn-light'}`
              }
            >
              Daftar Produk
            </NavLink>

            {/* Link Tambah Produk */}
            <NavLink
              to="/tambah"
              className={({ isActive }) =>
                `btn ${isActive ? 'btn-success' : 'btn-outline-light'}`
              }
            >
              Tambah Produk
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Konten utama dengan padding bawah navbar */}
      <div className="container mt-5 pt-3">
        <Routes>
          <Route path="/" element={<ProdukList />} />
          <Route path="/tambah" element={<TambahProduk />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;