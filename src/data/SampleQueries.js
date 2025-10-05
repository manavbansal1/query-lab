// File storing the samples to be shown in the sample queries
// and the the list of database options

export const sampleQueries = {
    sql: {
      users: `-- Users & Orders Database
  SELECT * FROM users;
  
  SELECT u.name, COUNT(o.id) as order_count, SUM(o.amount) as total_spent
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id;
  
  SELECT * FROM orders WHERE amount > 100;`,
      
      blog: `-- Blog Database
  SELECT * FROM posts ORDER BY views DESC;
  
  SELECT p.title, COUNT(c.id) as comment_count
  FROM posts p
  LEFT JOIN comments c ON p.id = c.post_id
  GROUP BY p.id;`,
      
      ecommerce: `-- E-commerce Database
  SELECT * FROM products WHERE price < 100;
  
  SELECT category, AVG(price) as avg_price
  FROM products
  GROUP BY category;`,
      
      custom: `-- Create Your Own Database!
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT,
    salary DECIMAL(10,2)
  );
  
  INSERT INTO employees VALUES 
    (1, 'John Doe', 'IT', 75000);
  
  SELECT * FROM employees;`
    },
    
    mongodb: {
      users: `// Users Collection
  db.users.find()
  
  db.users.find({ age: { $gt: 30 } })`,
      
      blog: `// Posts Collection
  db.posts.find().sort({ views: -1 })
  
  db.posts.find({ author: "John Doe" })`,
      
      ecommerce: `// Products Collection
  db.products.find({ price: { $lt: 100 } })`,
      
      custom: `// Create Your Own Collection!
  db.employees.insertMany([
    { name: "John Doe", department: "IT", salary: 75000 }
  ])
  
  db.employees.find()`
    }
  };
  
export const databaseOptions = [
{ id: 'users', name: 'Users & Orders' },
{ id: 'blog', name: 'Blog' },
{ id: 'ecommerce', name: 'E-commerce' },
{ id: 'custom', name: 'Custom' }
];