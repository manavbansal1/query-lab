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
      users: `// Find all users
    db.users.find()
    
    // Find all orders
    // db.orders.find()
    
    // Find orders with amount > 100
    // db.orders.find({ amount: { $gt: 100 } })
    
    // Find users older than 30
    // db.users.find({ age: { $gt: 30 } })
    
    // Count total orders
    // db.orders.countDocuments()`,
      
      blog: `// Find all posts
    db.posts.find()
    
    // Find all comments
    // db.comments.find()
    
    // Find posts sorted by views (descending)
    // db.posts.find().sort({ views: -1 })
    
    // Find comments for post_id 1
    // db.comments.find({ post_id: 1 })
    
    // Count comments per post
    // db.comments.countDocuments({ post_id: 1 })`,
      
      ecommerce: `// Find all products
    db.products.find()
    
    // Find all customers
    // db.customers.find()
    
    // Find products under $100
    // db.products.find({ price: { $lt: 100 } })
    
    // Find products by category
    // db.products.find({ category: "Electronics" })
    
    // Find customers by city
    // db.customers.find({ city: "New York" })
    
    // Sort products by price
    // db.products.find().sort({ price: 1 })`,
      
      custom: `// Create your own collections!
    db.employees.insertMany([
      { name: "John Doe", department: "IT", salary: 75000 },
      { name: "Jane Smith", department: "HR", salary: 65000 }
    ])
    
    // Query your data
    // db.employees.find()
    
    // Find by department
    // db.employees.find({ department: "IT" })
    
    // Update a document
    // db.employees.updateOne({ name: "John Doe" }, { $set: { salary: 80000 } })
    
    // Delete a document
    // db.employees.deleteOne({ name: "Jane Smith" })`
    }
  }
  
export const databaseOptions = [
{ id: 'users', name: 'Users & Orders' },
{ id: 'blog', name: 'Blog' },
{ id: 'ecommerce', name: 'E-commerce' },
{ id: 'custom', name: 'Custom' }
];