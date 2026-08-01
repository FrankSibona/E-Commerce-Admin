import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsNew = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: 0, stock: 0, description: '', image: '', category: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Crear nuevo (POST)
  const handleSave = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(() => navigate('/products'))
    .catch(err => console.error("Error al crear", err));
  };

  return (
    <div className="product-form-container" style={{ color: 'white' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2>Productos &gt; Nuevo</h2>
      </header>

      <form onSubmit={handleSave} style={{ background: '#222', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre:</label><br/>
          <input type="text" name="name" value={product.name} onChange={handleChange} required style={{ padding: '8px', width: '100%', marginTop: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label>Valor ($):</label><br/>
            <input type="number" name="price" value={product.price} onChange={handleChange} required min="0" style={{ padding: '8px', width: '100%', marginTop: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Stock:</label><br/>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} required min="0" style={{ padding: '8px', width: '100%', marginTop: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white' }} />
          </div>
        </div>

        <div>
          <label>Descripción:</label><br/>
          <textarea name="description" value={product.description} onChange={handleChange} rows="4" style={{ padding: '8px', width: '100%', marginTop: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white' }} />
        </div>

        <div>
          <label>URL de Imagen:</label><br/>
          <input type="text" name="image" value={product.image} onChange={handleChange} style={{ padding: '8px', width: '100%', marginTop: '5px', borderRadius: '5px', border: 'none', background: '#333', color: 'white' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button type="button" onClick={() => navigate('/products')} style={{ background: '#555', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>
          <button type="submit" style={{ background: '#ec0000', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductsNew;