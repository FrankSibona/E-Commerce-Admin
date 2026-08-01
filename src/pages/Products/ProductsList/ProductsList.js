import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);


  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-list-container">
      {}
      <header className="list-header">
        <h2>Productos</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/products/new" className="btn-add">
            <span className="add-text">Agregar Producto</span>
            <span className="add-icon">+</span>
          </Link>
        </div>
      </header>

      {}
      <div className="list-content">
        {loading ? (
          <p className="loading-text">Cargando...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="empty-text">No hay elementos coincidentes.</p>
        ) : (
          <ul className="product-items">
            {filteredProducts.map(product => (
              <li key={product.id} className="product-item">
                <div className="item-info">
                  {}
                  <img src={product.image || 'https://via.placeholder.com/50'} alt={product.name} className="item-image" />
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p>#{product.id}</p>
                  </div>
                </div>
                <Link to={`/products/${product.id}`} className="btn-view">Ver / Editar {'>'}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductsList;