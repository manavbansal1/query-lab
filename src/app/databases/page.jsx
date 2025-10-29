'use client';
import React, {useState} from 'react';
import { FaDatabase, FaUsers, FaShoppingCart, FaBlog, FaCode } from 'react-icons/fa';
import '../../styles/Documentation.css'
import '../../styles/Databases.css'

const DatabasesPage = () => {
  
  const [selectedDb, setSelectedDb] = useState('users');
  const databases = {
    users: {
      name: 'Users & Orders',
      icon: <FaUsers />,
      color: '#531294',
      description: 'Master fundamental database relationships with user accounts and their purchase history',
      
      sqlSchema: {
        users: {
          columns: [
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'name', type: 'TEXT' },
            { name: 'email', type: 'TEXT' },
            { name: 'age', type: 'INTEGER' },
            { name: 'created_at', type: 'DATE' }
          ],
          rows: 5
        },
        orders: {
          columns: [
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'user_id', type: 'INTEGER', isFK: true },
            { name: 'product', type: 'TEXT' },
            { name: 'amount', type: 'DECIMAL' },
            { name: 'order_date', type: 'DATE' }
          ],
          rows: 8,
          foreignKey: 'user_id → users.id'
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
  "created_at": "2025-01-15"
}`
        },
        orders: {
          fields: ['_id', 'user_id', 'product', 'amount', 'order_date'],
          documents: 8,
          sampleDoc: `{
  "_id": 1,
  "user_id": 1,
  "product": "Laptop",
  "amount": 1200.00,
  "order_date": "2025-01-20"
}`
        }
      },
      
      learningPath: [
        'Basic SELECT queries',
        'JOIN operations (INNER, LEFT)',
        'Aggregate functions (COUNT, SUM, AVG)',
        'GROUP BY and HAVING clauses',
        'Subqueries and nested queries'
      ],
      
      useCases: [
        'Understanding one-to-many relationships',
        'Customer purchase analysis',
        'Revenue calculations',
        'User activity tracking'
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
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'title', type: 'TEXT' },
            { name: 'content', type: 'TEXT' },
            { name: 'author', type: 'TEXT' },
            { name: 'views', type: 'INTEGER' },
            { name: 'published_at', type: 'DATE' }
          ],
          rows: 3
        },
        comments: {
          columns: [
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'post_id', type: 'INTEGER', isFK: true },
            { name: 'author', type: 'TEXT' },
            { name: 'comment', type: 'TEXT' },
            { name: 'created_at', type: 'DATE' }
          ],
          rows: 5,
          foreignKey: 'post_id → posts.id'
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
  "published_at": "2025-01-10"
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
  "created_at": "2025-01-11"
}`
        }
      },
      
      learningPath: [
        'Sorting and filtering text data',
        'Comment aggregation per post',
        'Engagement rate calculations',
        'Full-text search patterns',
        'Trending content algorithms'
      ],
      
      useCases: [
        'Content popularity analysis',
        'Comment moderation systems',
        'Author performance tracking',
        'User engagement metrics'
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
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'name', type: 'TEXT' },
            { name: 'category', type: 'TEXT' },
            { name: 'price', type: 'DECIMAL' },
            { name: 'stock', type: 'INTEGER' },
            { name: 'rating', type: 'DECIMAL' }
          ],
          rows: 5
        },
        customers: {
          columns: [
            { name: 'id', type: 'INTEGER', isPK: true },
            { name: 'name', type: 'TEXT' },
            { name: 'email', type: 'TEXT' },
            { name: 'city', type: 'TEXT' },
            { name: 'total_spent', type: 'DECIMAL' }
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
        'Price range filtering',
        'Category-based grouping',
        'Inventory management queries',
        'Statistical analysis (AVG, MIN, MAX)',
        'Customer segmentation'
      ],
      
      useCases: [
        'Inventory tracking and alerts',
        'Product category analysis',
        'Customer lifetime value',
        'Pricing strategies'
      ]
    }
  };

  const currentDb = databases[selectedDb];
  return (
    <div className="docs-container">
      <div className="docs-content">
        {/* Hero Section - Same as Documentation */}
        <div className="docs-hero">
          <div className="docs-hero-content">
            <h1 className="docs-title">
              <FaDatabase className="title-icon" />
              Sample Databases
            </h1>
            <p className="docs-subtitle">
              Explore our pre-loaded datasets designed for hands-on learning. Each database provides real-world scenarios to master SQL and MongoDB queries.
            </p>
          </div>
        </div>

        {/* Database Navigation - Same style as docs tabs */}
        <div className="docs-nav">
          {Object.keys(databases).map(key => (
            <button
              key={key}
              className={`docs-nav-btn ${selectedDb === key ? 'active' : ''}`}
              onClick={() => setSelectedDb(key)}
            >
              {databases[key].icon}
              {databases[key].name}
            </button>
          ))}
        </div>

        {/* Main Content - Same as docs-main */}
        <div className="docs-main">
          <div className="docs-section">
            {/* Overview Info Card */}
            <div className="info-card">
              <h3>{currentDb.name}</h3>
              <p>{currentDb.description}</p>
            </div>

            {/* SQL Schema Section */}
            <h2 className="section-title">
              <FaCode style={{ marginRight: '10px' }} />
              SQL Schema (SQLite)
            </h2>
            
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
                {tableInfo.foreignKey && (
                  <div className="foreign-key-note">
                    🔗 Relationship: {tableInfo.foreignKey}
                  </div>
                )}
              </div>
            ))}

            {/* MongoDB Schema Section */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>
              <FaDatabase style={{ marginRight: '10px' }} />
              MongoDB Schema
            </h2>
            
            {Object.entries(currentDb.mongodbSchema).map(([collectionName, collectionInfo]) => (
              <div key={collectionName} className="schema-card">
                <div className="schema-header">
                  <strong>{collectionName}</strong>
                  <span className="badge badge-rows">{collectionInfo.documents} documents</span>
                </div>
                <div className="mongo-fields">
                  <strong>Fields:</strong>
                  <div className="field-tags">
                    {collectionInfo.fields.map((field, idx) => (
                      <span key={idx} className="field-tag">{field}</span>
                    ))}
                  </div>
                </div>
                <div className="code-block">
                  <pre><code>{collectionInfo.sampleDoc}</code></pre>
                </div>
              </div>
            ))}

      </div>
      </div>
    </div>
    </div>
  );
};

export default DatabasesPage;