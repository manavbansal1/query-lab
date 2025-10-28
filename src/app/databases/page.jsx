'use client';
import React, {useState} from 'react';
import { FaDatabase, FaUsers, FaShoppingCart, FaBlog } from 'react-icons/fa';
import '../../styles/Documentation.css'
import '../../styles/Databases.css'

const databases = {
  users: {
    name: 'Users & Orders',
    icon: <FaUsers />,
    description: 'Master fundamental database relationships with user accounts and purchase history',
    sqlSchema: {
      users: {
        columns: [
          { name: 'id', type: 'INTEGER', isPK: true },
          { name: 'name', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'age', type: 'INTEGER' },
        ],
        rows: 5
      },
      orders: {
        columns: [
          { name: 'id', type: 'INTEGER', isPK: true },
          { name: 'user_id', type: 'INTEGER', isFK: true },
          { name: 'product', type: 'TEXT' },
          { name: 'amount', type: 'DECIMAL' },
        ],
        rows: 8
      }
    }
  },
  blog: {
    name: 'Blog Platform',
    icon: <FaBlog />,
    description: 'Explore content management patterns with posts and comments',
    sqlSchema: {
      posts: {
        columns: [
          { name: 'id', type: 'INTEGER', isPK: true },
          { name: 'title', type: 'TEXT' },
          { name: 'author', type: 'TEXT' },
          { name: 'views', type: 'INTEGER' },
        ],
        rows: 3
      }
    }
  },
  ecommerce: {
    name: 'E-commerce Store',
    icon: <FaShoppingCart />,
    description: 'Analyze product catalogs and customer data',
    sqlSchema: {
      products: {
        columns: [
          { name: 'id', type: 'INTEGER', isPK: true },
          { name: 'name', type: 'TEXT' },
          { name: 'price', type: 'DECIMAL' },
          { name: 'stock', type: 'INTEGER' },
        ],
        rows: 5
      }
    }
  }
};

const DatabasesPage = () => {
  
  const [selectedDb, setSelectedDb] = useState('users');
  const currentDb = databases[selectedDb];
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
        <div className="docs-main">
        <div className="docs-section">
          <h2>{currentDb.name}</h2>
          <p>{currentDb.description}</p>
          {/* Schema display next... */}
        </div>
      </div>
      </div>
    </div>
  );
};

export default DatabasesPage;