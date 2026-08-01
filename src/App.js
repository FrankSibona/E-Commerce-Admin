import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import ProductsNew from './pages/Products/ProductsNew/ProductsNew';
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';
import CategoryView from './pages/Categories/CategoryView/CategoryView';


import MainLayout from './components/MainLayout';


const Profile = () => (
  <div style={{ color: 'white', padding: '20px' }}>
    <h2>Perfil de Usuario</h2>
    <p>Vista en construcción...</p>
  </div>
);

const NotFound = () => (
  <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
    <h2>⚠️ Error 404</h2>
    <p>La ruta que intentás buscar no existe o aún no fue implementada.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {}
      <MainLayout>
        <Routes>
          {}
          <Route path="/" element={<Home />} />

          {}
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/new" element={<ProductsNew />} />
          <Route path="/products/:id" element={<ProductView />} />

          {}
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/categories/new" element={<CategoryView />} />
          <Route path="/categories/:id" element={<CategoryView />} />

          {}
          <Route path="/profile" element={<Profile />} />

          {}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;