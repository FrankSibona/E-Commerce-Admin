import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesList.css';

function CategoriesList() {
  // 1. Estado para guardar el array de categorías
  const [categories, setCategories] = useState([]);

  // 2. Buscar las categorías en el backend
  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  return (
    <div className="categories-list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Listado de Categorías</h3>
        
        {/* Botón para crear una nueva categoría */}
        <Link to="/categories/new" style={{ background: '#007bff', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}>
          + Nueva Categoría
        </Link>
      </div>

      {/* Renderizamos la lista */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {categories.map((category) => (
          <li key={category.id} style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <span>{category.name}</span>
            <Link to={`/categories/${category.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
              Ver / Editar
            </Link>
          </li>
        ))}
      </ul>

      {/* Si no hay categorías, mostramos un aviso */}
      {categories.length === 0 && (
        <p style={{ marginTop: '20px', color: '#666' }}>Aún no hay categorías registradas.</p>
      )}
    </div>
  );
}

export default CategoriesList;