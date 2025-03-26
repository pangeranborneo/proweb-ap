import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editHarga, setEditHarga] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => setProduk(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus?")) {
      axios.delete(`http://localhost:3001/produk/${id}`)
        .then(() => {
          setProduk(produk.filter(p => p.id !== id));
          toast.success("Produk dihapus!", { autoClose: 2000 });
        })
        .catch(err => console.error(err));
    }
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/produk/${editingProduk}`, { nama: editNama, harga: editHarga })
      .then((res) => {
        setProduk(produk.map(p => p.id === editingProduk ? res.data : p));
        setEditingProduk(null);
        toast.success("Perubahan disimpan!", { autoClose: 2000 });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Daftar Produk</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {produk.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 shadow-sm">
              {editingProduk === item.id ? (
                <div className="card-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={editNama}
                      onChange={(e) => setEditNama(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      value={editHarga}
                      onChange={(e) => setEditHarga(e.target.value)}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-success" onClick={handleSave}>Simpan</button>
                    <button className="btn btn-secondary" onClick={() => setEditingProduk(null)}>Batal</button>
                  </div>
                </div>
              ) : (
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-truncate">{item.nama}</h5>
                    <p className="card-text text-muted">Rp{item.harga.toLocaleString()}</p>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => {
                      setEditingProduk(item.id);
                      setEditNama(item.nama);
                      setEditHarga(item.harga);
                    }}>
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default ProdukList;