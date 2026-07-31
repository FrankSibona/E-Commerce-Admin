import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Dejamos el nombre estático como lo tenías
  const [username] = useState('Olivia'); 
  
  // Inicializamos los contadores en 0
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  // Se ejecuta automáticamente al abrir la página
  useEffect(() => {
    // Hacemos la petición a la ruta de estadísticas de tu backend
    fetch('http://localhost:3001/api/stats')
      .then(response => response.json())
      .then(data => {
        // Actualizamos el estado con los datos reales que llegan de SQLite
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
        {/* Tarjeta de Productos */}
        <div className="home-card">
          <div className="card-info">
            <span className="card-icon">📦</span>
            <h3>{productCount} Productos</h3>
          </div>
          <div className="card-actions">
            <Link to="/products" className="btn-secondary">Ver Listado</Link>
            <Link to="/products/new" className="btn-primary">Agregar Producto</Link>
          </div>
        </div>

        {/* Tarjeta de Categorías */}
        <div className="home-card">
          <div className="card-info">
            <span className="card-icon">🏪</span>
            <h3>{categoryCount} Categorías</h3>
          </div>
          <div className="card-actions">
            <Link to="/categories" className="btn-secondary">Ver Listado</Link>
            <Link to="/categories/new" className="btn-primary">Agregar Categoría</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;