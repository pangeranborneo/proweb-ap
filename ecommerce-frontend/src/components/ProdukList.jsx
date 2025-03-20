import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editHarga, setEditHarga] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => {
        setProduk(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const Delete = (id) => {
    axios.delete(`http://localhost:3001/produk/${id}`)
      .then(() => {
        setProduk(produk.filter((p) => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  const startEdit = (produk) => {
    setEditingProduk(produk.id);
    setEditNama(produk.nama);
    setEditHarga(produk.harga);
  };

  const cancelEdit = () => {
    setEditingProduk(null);
    setEditNama('');
    setEditHarga('');
  };

  const saveEdit = () => {
    axios.put(`http://localhost:3001/produk/${editingProduk}`, { nama: editNama, harga: editHarga })
      .then((response) => {
        setProduk(produk.map(p => p.id === editingProduk ? response.data : p));
        cancelEdit();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container produk-container">
      <h2 className="text-center mb-4">Daftar Produk (From Database)</h2>
      <ul className="list-group produk-list">
        {produk.map((item) => (
          <li key={item.id} className="list-group-item produk-item d-flex justify-content-between align-items-center">
            {editingProduk === item.id ? (
              <div className="d-flex flex-column">
                <div className="d-flex">
                <input
                  type="text"
                  value={editNama}
                  onChange={(e) => setEditNama(e.target.value)}
                  className="form-control mb-2"
                  />
                <input
                  type="number"
                  value={editHarga}
                  onChange={(e) => setEditHarga(e.target.value)}
                  className="form-control mb-2"
                  />
                  </div>
                <div>
                  <button className="btn btn-success me-2" onClick={saveEdit}>Save</button>
                  <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <strong>{item.nama}</strong> - Rp{item.harga}
              </div>
            )}
            <div>
              <button className="btn btn-danger me-2" onClick={() => Delete(item.id)}>Delete</button>
              <button className="btn btn-primary" onClick={() => startEdit(item)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
    
  );
}

export default ProdukList;