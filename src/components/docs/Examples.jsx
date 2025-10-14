'use client';

import React from 'react';

const Examples = () => (
  <div className="docs-section">
    <h2 className="section-title">Practical Examples</h2>

    <div className="example-card">
      <h3>📊 Users & Orders Database</h3>
      <p>Learn relationships between users and their orders</p>
      
      <div className="example-tabs">
        <div className="example-sql">
          <h4>SQL Example</h4>
          <div className="code-block">
            <pre>{`-- Find users who spent more than $500
SELECT 
  u.name, 
  SUM(o.amount) as total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING SUM(o.amount) > 500
ORDER BY total_spent DESC;`}</pre>
          </div>
        </div>
        
        <div className="example-mongo">
          <h4>MongoDB Example</h4>
          <div className="code-block">
            <pre>{`// Find orders over $100
db.orders.find({ 
  amount: { $gt: 100 } 
}).sort({ amount: -1 })

// Count orders per user
db.orders.aggregate([
  {
    $group: {
      _id: "$user_id",
      orderCount: { $sum: 1 },
      totalSpent: { $sum: "$amount" }
    }
  },
  { $sort: { totalSpent: -1 } }
])`}</pre>
          </div>
        </div>
      </div>
    </div>

    <div className="example-card">
      <h3>📝 Blog Database</h3>
      <p>Work with posts and comments</p>
      
      <div className="example-tabs">
        <div className="example-sql">
          <h4>SQL Example</h4>
          <div className="code-block">
            <pre>{`-- Get posts with comment counts
SELECT 
  p.title,
  p.author,
  COUNT(c.id) as comment_count,
  p.views
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
ORDER BY comment_count DESC;`}</pre>
          </div>
        </div>
        
        <div className="example-mongo">
          <h4>MongoDB Example</h4>
          <div className="code-block">
            <pre>{`// Find popular posts
db.posts.find({ 
  views: { $gt: 1000 } 
}).sort({ views: -1 })

// Count comments per post
db.comments.aggregate([
  {
    $group: {
      _id: "$post_id",
      commentCount: { $sum: 1 }
    }
  }
])`}</pre>
          </div>
        </div>
      </div>
    </div>

    <div className="example-card">
      <h3>🛒 E-commerce Database</h3>
      <p>Analyze products and customers</p>
      
      <div className="example-tabs">
        <div className="example-sql">
          <h4>SQL Example</h4>
          <div className="code-block">
            <pre>{`-- Products under $100 with good ratings
SELECT 
  name,
  category,
  price,
  rating,
  stock
FROM products
WHERE price < 100 AND rating >= 4.0
ORDER BY rating DESC, price ASC;`}</pre>
          </div>
        </div>
        
        <div className="example-mongo">
          <h4>MongoDB Example</h4>
          <div className="code-block">
            <pre>{`// Find affordable quality products
db.products.find({
  price: { $lt: 100 },
  rating: { $gte: 4.0 }
}).sort({ rating: -1, price: 1 })

// Average price by category
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  }
])`}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Examples;