import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Estado preparado para las futuras sesiones (US #6)
  const [username] = useState('Emilio'); 
  
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/stats')
      .then(response => response.json())
      .then(data => {
        setProductCount(data.totalProducts || 0);
        setCategoryCount(data.totalCategories || 0);
      })
      .catch(error => console.error("Error cargando estadísticas:", error));
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>¡Hola {username}!</h1>
      </header>

      <div className="home-cards-container">
        
        {/* FILA DE PRODUCTOS */}
        <div className="dashboard-row">
          <div className="row-info">
            <span className="row-icon">📦</span>
            <h3><strong>{productCount}</strong> Productos</h3>
          </div>
          <div className="row-actions">
            <Link to="/products" className="btn-secondary">Ver Listado</Link>
            <Link to="/products/new" className="btn-secondary">Agregar Producto</Link>
          </div>
        </div>

        {/* FILA DE CATEGORÍAS */}
        <div className="dashboard-row">
          <div className="row-info">
            <span className="row-icon">🏪</span>
            <h3><strong>{categoryCount}</strong> Categorías</h3>
          </div>
          <div className="row-actions">
            <Link to="/categories" className="btn-secondary">Ver Listado</Link>
            <Link to="/categories/new" className="btn-secondary">Agregar Categoría</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;