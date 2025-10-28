'use client';
import React, {useState} from 'react';
import { FaDatabase, FaUsers, FaShoppingCart, FaBlog } from 'react-icons/fa';
import '../../styles/Documentation.css'

const DatabasesPage = () => {

  const [selectedDb, setSelectedDb] = useState('users');
  
  return (
    <div className="docs-container">
      <div className="docs-content">
        {/* Hero Section */}
        <div className="docs-hero">
          <div className="docs-hero-content">
            <h1 className="docs-title">
              <FaDatabase className="title-icon" />
              Sample Databases
            </h1>
            <p className="docs-subtitle">
              Explore our pre-loaded datasets designed for hands-on learning. 
              Each database provides real-world scenarios to master SQL and MongoDB queries.
            </p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="docs-nav">
          <button
            className={`docs-nav-btn ${selectedDb === 'users' ? 'active' : ''}`}
            onClick={() => setSelectedDb('users')}
          >
            <FaUsers />
            Users & Orders
          </button>
          <button
            className={`docs-nav-btn ${selectedDb === 'blog' ? 'active' : ''}`}
            onClick={() => setSelectedDb('blog')}
          >
            <FaBlog />
            Blog Platform
          </button>
          <button
            className={`docs-nav-btn ${selectedDb === 'ecommerce' ? 'active' : ''}`}
            onClick={() => setSelectedDb('ecommerce')}
          >
            <FaShoppingCart />
            E-commerce Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabasesPage;