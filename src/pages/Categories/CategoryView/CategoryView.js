import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryView.css';

const CategoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = !id; 
  
  const [category, setCategory] = useState({ name: '' });


  useEffect(() => {
    if (!isNew) {
      fetch(`http://localhost:3001/api/categories/${id}`)
        .then(res => res.json())
        .then(data => setCategory(data))
        .catch(err => console.error(err));
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };


  const handleSave = (e) => {
    e.preventDefault();
    const url = isNew ? 'http://localhost:3001/api/categories' : `http://localhost:3001/api/categories/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    })
    .then(async (res) => {

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Error del servidor: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {

      navigate('/categories');
    })
    .catch(err => {
      console.error("Error al guardar:", err);

      alert("No se pudo guardar la categoría. Error: " + err.message);
    });
  };


  const handleDelete = () => {
    if(window.confirm("¿Seguro que querés eliminar esta categoría?")) {
      fetch(`http://localhost:3001/api/categories/${id}`, { method: 'DELETE' })
      .then(() => navigate('/categories'))
      .catch(err => console.error("Error al borrar", err));
    }
  };

  return (
    <div className="category-view-container">
      <header className="view-header">
        <h2>Categorías &gt; {isNew ? 'Nueva Categoría' : `#${id}`}</h2>
        {}
        {!isNew && (
          <button type="button" onClick={handleDelete} className="btn-delete">Eliminar</button>
        )}
      </header>

      <form onSubmit={handleSave} className="category-form">
        <div className="form-group">
          <label>Nombre de la Categoría:</label>
          <input 
            type="text" 
            name="name" 
            value={category.name || ''} 
            onChange={handleChange} 
            required 
            className="form-input" 
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/categories')} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-save">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryView;