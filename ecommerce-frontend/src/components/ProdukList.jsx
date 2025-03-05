// src/components/ProdukList.jsx
import React, { useEffect, useState } from 'react';

function ProdukList() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    // Data statis sementara
    setProduk([
      { id: 1, nama: 'Produk A' },
      { id: 2, nama: 'Produk B' },
    ]);
  }, []);

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>{item.nama}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProdukList;