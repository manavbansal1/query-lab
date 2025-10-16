'use client';

import React, { useState } from 'react';
import { FaLightbulb, FaRocket, FaCode, FaDatabase, FaChartLine, FaBolt, FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import '../../styles/TipsAndTricks.css'

const TipsAndTricks = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: <FaLightbulb /> },
    { id: 'beginner', name: 'Beginner', icon: <FaGraduationCap /> },
    { id: 'intermediate', name: 'Intermediate', icon: <FaCode /> },
    { id: 'advanced', name: 'Advanced', icon: <FaRocket /> },
    { id: 'performance', name: 'Performance', icon: <FaBolt /> }
  ];

  const tips = [
    // Beginner Tips
    {
      category: 'beginner',
      title: 'Start with Simple Queries',
      description: 'Master the basics before moving to complex operations. Build your understanding step by step.',
      details: [
        'Begin with SELECT * to see all data',
        'Add WHERE clauses one at a time',
        'Practice ORDER BY and LIMIT',
        'Understand each part before combining'
      ],
      example: {
        sql: 'SELECT * FROM users LIMIT 10;',
        mongodb: 'db.users.find().limit(10)'
      },
      level: 'Beginner',
      color: '#10b981'
    },
    {
      category: 'beginner',
      title: 'Always View the Schema First',
      description: 'Understanding the database structure is crucial before writing any queries.',
      details: [
        'Click "Show Schema" before querying',
        'Note table/collection names',
        'Understand column/field relationships',
        'Check data types'
      ],
      level: 'Beginner',
      color: '#10b981'
    },
    {
      category: 'beginner',
      title: 'Use Sample Queries as Templates',
      description: 'Learn from working examples and modify them for your needs.',
      details: [
        'Click "Load Sample Queries" button',
        'Run the sample first to see results',
        'Modify one part at a time',
        'Save successful queries for reference'
      ],
      level: 'Beginner',
      color: '#10b981'
    },
    {
      category: 'beginner',
      title: 'Test with Small Datasets',
      description: 'Use LIMIT to work with manageable result sets while learning.',
      details: [
        'Add LIMIT 10 to SQL queries',
        'Use .limit(10) in MongoDB',
        'Faster execution during testing',
        'Easier to review results'
      ],
      example: {
        sql: '-- Always limit while testing\nSELECT * FROM orders\nWHERE amount > 100\nLIMIT 10;',
        mongodb: '// Limit results for testing\ndb.orders.find({ \n  amount: { $gt: 100 } \n}).limit(10)'
      },
      level: 'Beginner',
      color: '#10b981'
    },

    // Intermediate Tips
    {
      category: 'intermediate',
      title: 'Master JOINs Progressively',
      description: 'Start with INNER JOIN, then move to LEFT/RIGHT joins as you understand the concepts.',
      details: [
        'INNER JOIN: matching records only',
        'LEFT JOIN: all from left table',
        'Practice with 2 tables first',
        'Then try multi-table joins'
      ],
      example: {
        sql: '-- Start with INNER JOIN\nSELECT u.name, o.product\nFROM users u\nINNER JOIN orders o \n  ON u.id = o.user_id;',
        mongodb: '// Use aggregation lookup\ndb.orders.aggregate([\n  {\n    $lookup: {\n      from: "users",\n      localField: "user_id",\n      foreignField: "_id",\n      as: "user_info"\n    }\n  }\n])'
      },
      level: 'Intermediate',
      color: '#3b82f6'
    },
    {
      category: 'intermediate',
      title: 'Use Meaningful Aliases',
      description: 'Make your queries readable with clear table and column aliases.',
      details: [
        'Use short, clear table aliases (u for users)',
        'Rename columns for clarity',
        'Helps in complex queries',
        'Makes results easier to understand'
      ],
      example: {
        sql: 'SELECT \n  u.name AS customer_name,\n  COUNT(o.id) AS order_count\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.id;',
        mongodb: 'db.users.aggregate([\n  {\n    $project: {\n      customer_name: "$name",\n      email: "$email"\n    }\n  }\n])'
      },
      level: 'Intermediate',
      color: '#3b82f6'
    },
    {
      category: 'intermediate',
      title: 'Group Data Effectively',
      description: 'Master GROUP BY to analyze data by categories.',
      details: [
        'Group by one column first',
        'Add aggregate functions (COUNT, SUM, AVG)',
        'Use HAVING to filter groups',
        'Combine with ORDER BY for sorted results'
      ],
      example: {
        sql: 'SELECT \n  category,\n  COUNT(*) as products,\n  AVG(price) as avg_price\nFROM products\nGROUP BY category\nORDER BY products DESC;',
        mongodb: 'db.products.aggregate([\n  {\n    $group: {\n      _id: "$category",\n      products: { $sum: 1 },\n      avgPrice: { $avg: "$price" }\n    }\n  },\n  { $sort: { products: -1 } }\n])'
      },
      level: 'Intermediate',
      color: '#3b82f6'
    },
    {
      category: 'intermediate',
      title: 'Understand Query Execution Order',
      description: 'Know how databases process your queries for better results.',
      details: [
        'FROM/JOIN happens first',
        'WHERE filters rows',
        'GROUP BY aggregates',
        'HAVING filters groups',
        'SELECT picks columns',
        'ORDER BY sorts results',
        'LIMIT restricts output'
      ],
      level: 'Intermediate',
      color: '#3b82f6'
    },

    // Advanced Tips
    {
      category: 'advanced',
      title: 'Use Subqueries Wisely',
      description: 'Break complex problems into smaller, manageable queries.',
      details: [
        'Test subquery independently first',
        'Use in WHERE, FROM, or SELECT',
        'Consider JOINs as alternative',
        'Watch for performance impact'
      ],
      example: {
        sql: '-- Find users with above-average spending\nSELECT name, total_spent\nFROM customers\nWHERE total_spent > (\n  SELECT AVG(total_spent)\n  FROM customers\n);',
        mongodb: '// Use aggregation pipeline\ndb.customers.aggregate([\n  {\n    $group: {\n      _id: null,\n      avgSpent: { $avg: "$total_spent" }\n    }\n  }\n])'
      },
      level: 'Advanced',
      color: '#8b5cf6'
    },
    {
      category: 'advanced',
      title: 'Leverage Indexes (Conceptually)',
      description: 'Understand which fields benefit from indexing for faster queries.',
      details: [
        'Index columns used in WHERE',
        'Index foreign key columns',
        'Index columns used in ORDER BY',
        'Don\'t over-index (trade-off)'
      ],
      level: 'Advanced',
      color: '#8b5cf6'
    },
    {
      category: 'advanced',
      title: 'Master Aggregation Pipelines',
      description: 'MongoDB\'s aggregation framework is powerful - learn to chain operations.',
      details: [
        'Each stage transforms data',
        'Order of stages matters',
        '$match early for performance',
        'Use $project to shape output'
      ],
      example: {
        sql: '-- Multi-step analysis\nSELECT \n  category,\n  ROUND(AVG(price), 2) as avg_price,\n  COUNT(*) as count\nFROM products\nWHERE stock > 0\nGROUP BY category\nHAVING COUNT(*) > 3\nORDER BY avg_price DESC;',
        mongodb: 'db.products.aggregate([\n  { $match: { stock: { $gt: 0 } } },\n  {\n    $group: {\n      _id: "$category",\n      avgPrice: { $avg: "$price" },\n      count: { $sum: 1 }\n    }\n  },\n  { $match: { count: { $gt: 3 } } },\n  { $sort: { avgPrice: -1 } }\n])'
      },
      level: 'Advanced',
      color: '#8b5cf6'
    },
    {
      category: 'advanced',
      title: 'Use CASE for Conditional Logic',
      description: 'Add computed columns based on conditions.',
      details: [
        'CASE WHEN for if-then logic',
        'Can use in SELECT or WHERE',
        'Useful for categorization',
        'MongoDB: use $cond in aggregation'
      ],
      example: {
        sql: 'SELECT \n  name,\n  total_spent,\n  CASE\n    WHEN total_spent > 2000 THEN \'VIP\'\n    WHEN total_spent > 1000 THEN \'Premium\'\n    ELSE \'Regular\'\n  END as tier\nFROM customers;',
        mongodb: 'db.customers.aggregate([\n  {\n    $addFields: {\n      tier: {\n        $switch: {\n          branches: [\n            { case: { $gt: ["$total_spent", 2000] }, then: "VIP" },\n            { case: { $gt: ["$total_spent", 1000] }, then: "Premium" }\n          ],\n          default: "Regular"\n        }\n      }\n    }\n  }\n])'
      },
      level: 'Advanced',
      color: '#8b5cf6'
    },

    // Performance Tips
    {
      category: 'performance',
      title: 'Filter Early, Aggregate Late',
      description: 'Reduce data volume before performing expensive operations.',
      details: [
        'WHERE before GROUP BY in SQL',
        '$match early in MongoDB pipeline',
        'Reduces data to process',
        'Significantly faster queries'
      ],
      example: {
        sql: '-- Good: Filter first\nSELECT category, AVG(price)\nFROM products\nWHERE stock > 0  -- Filter early\nGROUP BY category;',
        mongodb: '// Good: Match early\ndb.products.aggregate([\n  { $match: { stock: { $gt: 0 } } },  // Filter early\n  { $group: { _id: "$category", avgPrice: { $avg: "$price" } } }\n])'
      },
      level: 'Performance',
      color: '#f59e0b'
    },
    {
      category: 'performance',
      title: 'Select Only What You Need',
      description: 'Don\'t use SELECT * - specify columns to reduce data transfer.',
      details: [
        'List specific columns needed',
        'Faster data transfer',
        'Less memory usage',
        'Clearer intent in code'
      ],
      example: {
        sql: '-- Bad\nSELECT * FROM users;\n\n-- Good\nSELECT id, name, email FROM users;',
        mongodb: '// Bad\ndb.users.find()\n\n// Good  \ndb.users.find({}, { name: 1, email: 1 })'
      },
      level: 'Performance',
      color: '#f59e0b'
    },
    {
      category: 'performance',
      title: 'Use LIMIT for Large Datasets',
      description: 'Always limit results when exploring data.',
      details: [
        'Prevents overwhelming results',
        'Faster query execution',
        'Better for testing',
        'Pagination for full data'
      ],
      level: 'Performance',
      color: '#f59e0b'
    },
    {
      category: 'performance',
      title: 'Avoid Complex Calculations in WHERE',
      description: 'Filter on indexed columns directly when possible.',
      details: [
        'Functions on columns prevent index use',
        'Pre-calculate if possible',
        'Consider computed columns',
        'Test query performance'
      ],
      level: 'Performance',
      color: '#f59e0b'
    }
  ];

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="docs-section tips-section">
      <h2 className="section-title">Tips & Best Practices</h2>
      
      <p className="tips-intro">
        Level up your database query skills! From beginner basics to advanced techniques,
        master SQL and MongoDB with these practical tips and real-world examples.
      </p>

      {/* Category Filter */}
      <div className="tips-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="tips-grid">
        {filteredTips.map((tip, idx) => (
          <div key={idx} className="tip-card-new">
            <div className="tip-header-new">
              <div className="tip-level-badge" style={{ backgroundColor: tip.color }}>
                {tip.level}
              </div>
              <h3 className="tip-title-new">{tip.title}</h3>
            </div>

            <p className="tip-description">{tip.description}</p>

            {tip.details && (
              <div className="tip-details">
                <h4>Key Points:</h4>
                <ul>
                  {tip.details.map((detail, i) => (
                    <li key={i}>
                      <FaCheckCircle className="check-icon" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tip.example && (
              <div className="tip-examples">
                <div className="tip-example-panel">
                  <div className="example-label">SQL</div>
                  <pre><code>{tip.example.sql}</code></pre>
                </div>
                <div className="tip-example-panel">
                  <div className="example-label">MongoDB</div>
                  <pre><code>{tip.example.mongodb}</code></pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Learning Path CTA */}
      <div className="learning-path-cta">
        <div className="cta-content">
          <FaGraduationCap className="cta-icon" />
          <h3>Ready to Practice?</h3>
          <p>
            Apply these tips in the query editor! Start with beginner tips and work your way up.
            Remember: consistent practice is the key to mastery.
          </p>
          <div className="cta-buttons">
            <a href="/" className="cta-button primary">
              <FaCode /> Open Query Editor
            </a>
            <a href="/documentation" className="cta-button secondary">
              <FaDatabase /> View Examples
            </a>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="quick-reference">
        <h3>Quick Reference</h3>
        <div className="reference-grid">
          <div className="reference-card">
            <h4>Learning Path</h4>
            <ol>
              <li>Start with simple SELECT queries</li>
              <li>Master filtering with WHERE</li>
              <li>Learn JOINs for relationships</li>
              <li>Practice GROUP BY for analysis</li>
              <li>Explore advanced techniques</li>
            </ol>
          </div>
          <div className="reference-card">
            <h4>Best Practices</h4>
            <ul>
              <li>Always view schema first</li>
              <li>Test queries with LIMIT</li>
              <li>Use meaningful aliases</li>
              <li>Comment complex queries</li>
              <li>Learn from errors (use AI help!)</li>
            </ul>
          </div>
          <div className="reference-card">
            <h4>Performance Tips</h4>
            <ul>
              <li>Filter data early</li>
              <li>Select only needed columns</li>
              <li>Use indexes effectively</li>
              <li>Avoid functions in WHERE</li>
              <li>Limit result sets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsAndTricks;