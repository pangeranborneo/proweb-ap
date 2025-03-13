import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProdukList() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/produk')
      .then((response) => {
        setProduk(response.data);
      })
      .catch((error) => {
        console.error('Terjadi Error: ', error);
      });
  }, []);

  return (
    <div className="container produk-container">
      <h2 className="text-center mb-4">Daftar Produk (From Database)</h2>
      <ul className="list-group produk-list">
        {produk.map((item) => (
          <li key={item.id} className="list-group-item produk-item">
            <strong>{item.nama}</strong> - Rp{item.harga}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProdukList;
