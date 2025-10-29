'use client';
import React, {useState} from 'react';
import { FaDatabase, FaUsers, FaShoppingCart, FaBlog } from 'react-icons/fa';
import '../../styles/Documentation.css'
import '../../styles/Databases.css'

const databases = {
  users: {
    name: 'Users & Orders',
    icon: <FaUsers />,
    color: '#531294',
    description: 'Master fundamental database relationships with user accounts and their purchase history',
    
    sqlSchema: {
      users: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'name', type: 'TEXT', constraint: 'NOT NULL' },
          { name: 'email', type: 'TEXT', constraint: 'UNIQUE NOT NULL' },
          { name: 'age', type: 'INTEGER' },
          { name: 'created_at', type: 'DATETIME', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
        ],
        rows: 5,
        indexes: ['idx_users_email ON users(email)']
      },
      orders: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'user_id', type: 'INTEGER', isFK: true },
          { name: 'product', type: 'TEXT', constraint: 'NOT NULL' },
          { name: 'amount', type: 'DECIMAL(10,2)' },
          { name: 'order_date', type: 'DATETIME', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
        ],
        rows: 7,
        foreignKey: 'FOREIGN KEY (user_id) REFERENCES users(id)',
        indexes: ['idx_orders_user_id ON orders(user_id)']
      }
    },
    
    mongodbSchema: {
      users: {
        fields: ['_id', 'name', 'email', 'age', 'created_at'],
        documents: 5,
        sampleDoc: `{
"_id": 1,
"name": "Alice Johnson",
"email": "alice@example.com",
"age": 28,
"created_at": Date()
}`
      },
      orders: {
        fields: ['_id', 'user_id', 'product', 'amount', 'order_date'],
        documents: 7,
        sampleDoc: `{
"_id": 1,
"user_id": 1,
"product": "Laptop",
"amount": 1200.00,
"order_date": Date()
}`
      }
    },
    
    learningPath: [
      'Basic SELECT queries and filtering',
      'JOIN operations (INNER, LEFT) between users and orders',
      'Aggregate functions (COUNT, SUM, AVG) for order analysis',
      'GROUP BY to analyze spending per user',
      'Subqueries to find users with specific order patterns'
    ],
    
    useCases: [
      'Understanding one-to-many relationships',
      'Customer purchase history tracking',
      'Revenue calculations and analytics',
      'User activity monitoring',
      'Order statistics and reporting'
    ]
  },
  
  blog: {
    name: 'Blog Platform',
    icon: <FaBlog />,
    color: '#6b1bb8',
    description: 'Explore content management patterns with posts and user-generated comments',
    
    sqlSchema: {
      posts: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'title', type: 'TEXT', constraint: 'NOT NULL' },
          { name: 'content', type: 'TEXT' },
          { name: 'author', type: 'TEXT' },
          { name: 'views', type: 'INTEGER', constraint: 'DEFAULT 0' },
          { name: 'published_at', type: 'DATETIME', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
        ],
        rows: 3
      },
      comments: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'post_id', type: 'INTEGER', isFK: true },
          { name: 'author', type: 'TEXT' },
          { name: 'comment', type: 'TEXT' },
          { name: 'created_at', type: 'DATETIME', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
        ],
        rows: 5,
        foreignKey: 'FOREIGN KEY (post_id) REFERENCES posts(id)'
      }
    },
    
    mongodbSchema: {
      posts: {
        fields: ['_id', 'title', 'content', 'author', 'views', 'published_at'],
        documents: 3,
        sampleDoc: `{
"_id": 1,
"title": "Getting Started with SQL",
"content": "SQL is a powerful...",
"author": "John Doe",
"views": 1500,
"published_at": Date()
}`
      },
      comments: {
        fields: ['_id', 'post_id', 'author', 'comment', 'created_at'],
        documents: 5,
        sampleDoc: `{
"_id": 1,
"post_id": 1,
"author": "Alice",
"comment": "Great tutorial!",
"created_at": Date()
}`
      }
    },
    
    learningPath: [
      'Sorting and filtering text data',
      'Joining posts with their comments',
      'Comment aggregation and counting per post',
      'Engagement rate calculations (comments/views)',
      'Full-text search and trending content queries'
    ],
    
    useCases: [
      'Content popularity analysis',
      'Comment moderation and management',
      'Author performance tracking',
      'User engagement metrics',
      'Most viewed/discussed content identification'
    ]
  },
  
  ecommerce: {
    name: 'E-commerce Store',
    icon: <FaShoppingCart />,
    color: '#8b5cf6',
    description: 'Analyze product catalogs and customer data for business intelligence',
    
    sqlSchema: {
      products: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'name', type: 'TEXT', constraint: 'NOT NULL' },
          { name: 'category', type: 'TEXT' },
          { name: 'price', type: 'DECIMAL(10,2)' },
          { name: 'stock', type: 'INTEGER' },
          { name: 'rating', type: 'DECIMAL(3,2)' }
        ],
        rows: 5
      },
      customers: {
        columns: [
          { name: 'id', type: 'INTEGER', constraint: 'PRIMARY KEY AUTOINCREMENT' },
          { name: 'name', type: 'TEXT', constraint: 'NOT NULL' },
          { name: 'email', type: 'TEXT', constraint: 'UNIQUE' },
          { name: 'city', type: 'TEXT' },
          { name: 'total_spent', type: 'DECIMAL(10,2)', constraint: 'DEFAULT 0' }
        ],
        rows: 3
      }
    },
    
    mongodbSchema: {
      products: {
        fields: ['_id', 'name', 'category', 'price', 'stock', 'rating'],
        documents: 5,
        sampleDoc: `{
"_id": 1,
"name": "Laptop Pro",
"category": "Electronics",
"price": 1299.99,
"stock": 15,
"rating": 4.5
}`
      },
      customers: {
        fields: ['_id', 'name', 'email', 'city', 'total_spent'],
        documents: 3,
        sampleDoc: `{
"_id": 1,
"name": "John Smith",
"email": "john@email.com",
"city": "New York",
"total_spent": 1500.00
}`
      }
    },
    
    learningPath: [
      'Price range filtering and comparisons',
      'Category-based grouping and analysis',
      'Inventory management queries (low stock alerts)',
      'Statistical analysis (AVG, MIN, MAX) on prices and ratings',
      'Customer segmentation by spending and location'
    ],
    
    useCases: [
      'Inventory tracking and low stock alerts',
      'Product category analysis',
      'Customer lifetime value calculation',
      'Pricing strategies and discount analysis',
      'Geographic sales distribution'
    ]
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

        <h2 className="section-title">SQL Schema (SQLite)</h2>

        {Object.entries(currentDb.sqlSchema).map(([tableName, tableInfo]) => (
          <div key={tableName} className="schema-card">
            <div className="schema-header">
              <strong>{tableName}</strong>
              <span className="badge badge-rows">{tableInfo.rows} rows</span>
            </div>
            <div className="column-list">
              {tableInfo.columns.map((col, idx) => (
                <div key={idx} className="column-item">
                  <code>{col.name}</code>
                  <span className="column-type">{col.type}</span>
                  {col.isPK && <span className="badge badge-pk">PRIMARY KEY</span>}
                  {col.isFK && <span className="badge badge-fk">FOREIGN KEY</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default DatabasesPage;