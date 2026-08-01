import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesList.css';

function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && data.data && Array.isArray(data.data)) {

          setCategories(data.data);
        } else {

          console.error('El backend devolvió un error en lugar de una lista:', data);
          setCategories([]); // Forzamos un array vacío
        }
      })
      .catch(err => {
        console.error('Error de conexión al cargar categorías:', err);
        setCategories([]);
      });
  }, []);

  return (
    <div className="categories-list-container" style={{ color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Listado de Categorías</h3>
        
        {}
        <Link to="/categories/new" style={{ background: '#007bff', color: 'white', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}>
          + Nueva Categoría
        </Link>
      </div>

      {}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {categories.length > 0 ? (
          categories.map((category) => (

            <li key={category.id || category.id_categoria || Math.random()} style={{ padding: '15px', border: '1px solid #444', marginBottom: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', background: '#222' }}>
              <span>{category.name || category.nombre || 'Categoría sin nombre'}</span>
              <Link to={`/categories/${category.id || category.id_categoria}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                Ver / Editar
              </Link>
            </li>
          ))
        ) : (
          <p style={{ marginTop: '20px', color: '#888' }}>
            Aún no hay categorías registradas o hubo un error al conectarse con la base de datos.
          </p>
        )}
      </ul>
    </div>
  );
}

export default CategoriesList;