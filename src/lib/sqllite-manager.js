let SQL = null;

// Initialize sql from CDN
export async function initSQLite() {
    // If Sql is already initialzied return
    if (SQL) return SQL;

    // Wait for sql.js to load from CDN
    if (typeof window === 'undefined') {
        throw new Error('SQL.js only works in browser');
    }
    
    // Wait for initSqlJs to be available
    while (!window.initSqlJs) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    SQL = await window.initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });

    return SQL;
}

// Create Empty database
export async function createEmptyDatabase() {
    const SQL = await initSQLite();
    return new SQL.Database();
}
  
// Pre-built databases
export async function createSampleDatabase(type = 'users') {
    const SQL = await initSQLite();
    const db = new SQL.Database();
    
    if (type === 'users') {
      // Users & Orders Database
      // Create the USers table and the orders table
      db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          age INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          product TEXT NOT NULL,
          amount DECIMAL(10,2),
          order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        );
        
        CREATE INDEX idx_users_email ON users(email);
        CREATE INDEX idx_orders_user_id ON orders(user_id);
      `);
      
      db.run(`
        INSERT INTO users (name, email, age) VALUES 
          ('Alice Johnson', 'alice@example.com', 28),
          ('Bob Smith', 'bob@example.com', 35),
          ('Carol White', 'carol@example.com', 42),
          ('David Brown', 'david@example.com', 31),
          ('Eve Davis', 'eve@example.com', 29);
          
        INSERT INTO orders (user_id, product, amount) VALUES 
          (1, 'Laptop', 1200.00),
          (1, 'Mouse', 25.50),
          (2, 'Keyboard', 75.00),
          (3, 'Monitor', 350.00),
          (2, 'Headphones', 89.99),
          (4, 'Webcam', 120.00),
          (5, 'Desk', 450.00),
          (1, 'Chair', 299.99);
      `);
    } else if (type === 'blog') {
      db.run(`
        CREATE TABLE posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT,
          author TEXT,
          views INTEGER DEFAULT 0,
          published_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          post_id INTEGER,
          author TEXT,
          comment TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES posts(id)
        );
      `);
      
      db.run(`
        INSERT INTO posts (title, content, author, views) VALUES 
          ('Getting Started with SQL', 'SQL is a powerful database language...', 'John Doe', 1500),
          ('Advanced Joins Explained', 'Understanding different types of joins...', 'Jane Smith', 2300),
          ('Database Optimization Tips', 'Here are 10 tips to optimize...', 'Mike Johnson', 890);
          
        INSERT INTO comments (post_id, author, comment) VALUES 
          (1, 'Alice', 'Great tutorial!'),
          (1, 'Bob', 'Very helpful, thanks!'),
          (2, 'Carol', 'Could you explain LEFT JOIN more?'),
          (2, 'David', 'Excellent examples'),
          (3, 'Eve', 'These tips saved me hours!');
      `);
    } else if (type === 'ecommerce') {
      db.run(`
        CREATE TABLE products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          category TEXT,
          price DECIMAL(10,2),
          stock INTEGER,
          rating DECIMAL(3,2)
        );
        
        CREATE TABLE customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          city TEXT,
          total_spent DECIMAL(10,2) DEFAULT 0
        );
      `);
      
      db.run(`
        INSERT INTO products (name, category, price, stock, rating) VALUES 
          ('Laptop Pro', 'Electronics', 1299.99, 15, 4.5),
          ('Wireless Mouse', 'Electronics', 29.99, 50, 4.2),
          ('Office Chair', 'Furniture', 199.99, 8, 4.7),
          ('Desk Lamp', 'Furniture', 45.00, 25, 4.0),
          ('USB-C Cable', 'Accessories', 12.99, 100, 4.3);
          
        INSERT INTO customers (name, email, city, total_spent) VALUES 
          ('John Smith', 'john@email.com', 'New York', 1500.00),
          ('Sarah Lee', 'sarah@email.com', 'Los Angeles', 890.50),
          ('Mike Chen', 'mike@email.com', 'Chicago', 2300.00);
      `);
    }
    
    return db;
}
 
// Execute query and return results
export function executeQuery(db, query) {
    try {
      const results = db.exec(query);
      
      if (results.length === 0) {
        return {
          type: 'success',
          message: 'Query executed successfully',
          changes: db.getRowsModified() // Return the rows modified
        };
      }
      
      const result = results[0];
      return {
        type: 'table',
        columns: result.columns,
        rows: result.values.map(row => {
          const obj = {};
          result.columns.forEach((col, i) => {
            obj[col] = row[i];
          });
          return obj;
        }),
        rowCount: result.values.length
      };
    } catch (error) {
      throw new Error(error.message);
    }
}

// Get database schema
// sUed when the users asks for database schema
export function getDatabaseSchema(db) {
    const schema = db.exec(`
      SELECT 
        name,
        type,
        sql
      FROM sqlite_master 
      WHERE type IN ('table', 'index')
      ORDER BY type, name;
    `);
    
    return schema[0]?.values || [];
}