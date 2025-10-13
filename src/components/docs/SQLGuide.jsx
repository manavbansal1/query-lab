'use client';

import React, { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';

const SQLGuide = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="docs-section">
      <h2 className="section-title">SQL (SQLite) Guide</h2>

      <div className="info-card">
        <h3>SQL Basics</h3>
        <p>
          SQL (Structured Query Language) is the standard language for managing relational databases. 
          In QueryLab, we use SQLite, a lightweight database engine perfect for learning.
        </p>
      </div>

      {/* SELECT Queries */}
      <CollapsibleSection
        id="sql-select"
        title="SELECT - Retrieving Data"
        isExpanded={expandedSections['sql-select']}
        toggle={toggleSection}
      >
        <p>The SELECT statement retrieves data from one or more tables.</p>
        
        <h4>Basic SELECT</h4>
        <div className="code-block">
          <pre>{`-- Select all columns from users table
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Select with alias
SELECT name AS full_name, email AS user_email FROM users;`}</pre>
        </div>

        <h4>WHERE Clause</h4>
        <div className="code-block">
          <pre>{`-- Filter by condition
SELECT * FROM users WHERE age > 30;

-- Multiple conditions
SELECT * FROM users WHERE age > 25 AND name LIKE 'A%';

-- Using IN operator
SELECT * FROM products WHERE category IN ('Electronics', 'Furniture');`}</pre>
        </div>

        <h4>ORDER BY</h4>
        <div className="code-block">
          <pre>{`-- Sort ascending (default)
SELECT * FROM posts ORDER BY views;

-- Sort descending
SELECT * FROM posts ORDER BY views DESC;

-- Multiple columns
SELECT * FROM users ORDER BY age DESC, name ASC;`}</pre>
        </div>

        <h4>LIMIT</h4>
        <div className="code-block">
          <pre>{`-- Get top 5 users
SELECT * FROM users LIMIT 5;

-- Pagination (skip first 10, get next 5)
SELECT * FROM users LIMIT 5 OFFSET 10;`}</pre>
        </div>
      </CollapsibleSection>

      {/* JOIN Operations */}
      <CollapsibleSection
        id="sql-joins"
        title="JOIN - Combining Tables"
        isExpanded={expandedSections['sql-joins']}
        toggle={toggleSection}
      >
        <p>JOINs combine rows from two or more tables based on related columns.</p>

        <h4>INNER JOIN</h4>
        <div className="code-block">
          <pre>{`-- Get users with their orders
SELECT u.name, o.product, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;`}</pre>
        </div>

        <h4>LEFT JOIN</h4>
        <div className="code-block">
          <pre>{`-- Get all users, including those without orders
SELECT u.name, o.product, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;`}</pre>
        </div>

        <h4>Multiple JOINs</h4>
        <div className="code-block">
          <pre>{`-- Join posts with comments
SELECT p.title, c.author, c.comment
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
ORDER BY p.views DESC;`}</pre>
        </div>
      </CollapsibleSection>

      {/* Aggregate Functions */}
      <CollapsibleSection
        id="sql-aggregates"
        title="Aggregate Functions"
        isExpanded={expandedSections['sql-aggregates']}
        toggle={toggleSection}
      >
        <p>Aggregate functions perform calculations on sets of rows.</p>

        <div className="code-block">
          <pre>{`-- COUNT - Number of rows
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT category) FROM products;

-- SUM - Total of values
SELECT SUM(amount) FROM orders;

-- AVG - Average value
SELECT AVG(price) FROM products;

-- MAX/MIN - Highest/Lowest value
SELECT MAX(age) FROM users;
SELECT MIN(price) FROM products;

-- GROUP BY - Group results
SELECT category, COUNT(*) as product_count, AVG(price) as avg_price
FROM products
GROUP BY category;

-- HAVING - Filter grouped results
SELECT category, AVG(price) as avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;`}</pre>
        </div>
      </CollapsibleSection>

      {/* INSERT, UPDATE, DELETE */}
      <CollapsibleSection
        id="sql-modify"
        title="INSERT, UPDATE, DELETE"
        isExpanded={expandedSections['sql-modify']}
        toggle={toggleSection}
      >
        <h4>INSERT - Adding Data</h4>
        <div className="code-block">
          <pre>{`-- Insert single row
INSERT INTO users (name, email, age) 
VALUES ('John Doe', 'john@example.com', 30);

-- Insert multiple rows
INSERT INTO products (name, category, price, stock) 
VALUES 
  ('Laptop', 'Electronics', 999.99, 10),
  ('Mouse', 'Electronics', 29.99, 50);`}</pre>
        </div>

        <h4>UPDATE - Modifying Data</h4>
        <div className="code-block">
          <pre>{`-- Update single field
UPDATE users SET age = 31 WHERE name = 'John Doe';

-- Update multiple fields
UPDATE products 
SET price = 899.99, stock = 15 
WHERE name = 'Laptop';

-- Update with calculation
UPDATE products SET price = price * 0.9 WHERE category = 'Electronics';`}</pre>
        </div>

        <h4>DELETE - Removing Data</h4>
        <div className="code-block">
          <pre>{`-- Delete specific rows
DELETE FROM users WHERE age < 18;

-- Delete all rows (use carefully!)
DELETE FROM temporary_table;`}</pre>
        </div>
      </CollapsibleSection>

      {/* CREATE TABLE */}
      <CollapsibleSection
        id="sql-create"
        title="CREATE TABLE - Database Design"
        isExpanded={expandedSections['sql-create']}
        toggle={toggleSection}
      >
        <div className="code-block">
          <pre>{`-- Create a new table
CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  department TEXT,
  salary DECIMAL(10,2),
  hire_date DATE DEFAULT CURRENT_DATE
);

-- Create table with foreign key
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER,
  task_name TEXT,
  status TEXT,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Create index for faster queries
CREATE INDEX idx_employee_dept ON employees(department);`}</pre>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SQLGuide;