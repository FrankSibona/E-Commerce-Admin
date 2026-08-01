import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductView.css'; // <-- Importamos tu archivo CSS

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: 0, stock: 0, description: '', image: '', category: '' });

  // Cargar datos actuales
  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Guardar cambios (PUT)
  const handleSave = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(() => navigate('/products'))
    .catch(err => console.error("Error al actualizar", err));
  };

  // Eliminar (DELETE)
  const handleDelete = () => {
    if(window.confirm("¿Seguro que querés eliminar este producto?")) {
      fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' })
      .then(() => navigate('/products'))
      .catch(err => console.error("Error al borrar", err));
    }
  };

  return (
    <div className="product-view-container">
      <header className="view-header">
        <h2>Productos &gt; #{id}</h2>
        <button type="button" onClick={handleDelete} className="btn-delete">Eliminar</button>
      </header>

      <form onSubmit={handleSave} className="product-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="name" value={product.name || ''} onChange={handleChange} required className="form-input" />
        </div>
        
        <div className="form-row">
          <div className="form-group half-width">
            <label>Valor ($):</label>
            <input type="number" name="price" value={product.price || 0} onChange={handleChange} required min="0" className="form-input" />
          </div>
          <div className="form-group half-width">
            <label>Stock:</label>
            <input type="number" name="stock" value={product.stock || 0} onChange={handleChange} required min="0" className="form-input" />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea name="description" value={product.description || ''} onChange={handleChange} rows="4" className="form-input text-area" />
        </div>

        <div className="form-group">
          <label>URL de Imagen:</label>
          <input type="text" name="image" value={product.image || ''} onChange={handleChange} className="form-input" />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/products')} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-save">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductView;