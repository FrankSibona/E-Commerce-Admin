import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout-container">
      {}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <h2 style={{ color: '#a5ec00', margin: 0, fontSize: '24px' }}>Mateando 🧉</h2>
            <button className="close-btn" onClick={closeSidebar}>✖</button>
          </div>
          
          {}
          <nav className="sidebar-nav">
            <NavLink to="/" onClick={closeSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
              🏠 Inicio
            </NavLink>
            <NavLink to="/products" onClick={closeSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              📦 Productos
            </NavLink>
            <NavLink to="/categories" onClick={closeSidebar} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              🏪 Categorías
            </NavLink>
          </nav>
        </div>

        {}
        <div className="sidebar-bottom">
          <Link to="/profile" onClick={closeSidebar} className="profile-link">
            <span className="avatar">👤</span> Admin
          </Link>
        </div>
      </aside>

      {}
      <main className="main-area">
        <header className="main-header">
          <button className="menu-btn" onClick={toggleSidebar}>☰</button>
          {}
        </header>
        <div className="main-content">
          {children} 
        </div>
      </main>
    </div>
  );
};

export default MainLayout;