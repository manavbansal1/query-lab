'use client';

import React from 'react';

const TipsAndTricks = () => (
  <div className="docs-section">
    <h2 className="section-title">Tips & Best Practices</h2>

    <div className="tip-card">
      <div className="tip-icon">💡</div>
      <div className="tip-content">
        <h3>Start Simple</h3>
        <p>
          Begin with basic SELECT or find() queries before moving to complex JOINs or aggregations. 
          Build your understanding step by step.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🎯</div>
      <div className="tip-content">
        <h3>Use Sample Queries</h3>
        <p>
          Click "Load Sample Queries" to see working examples for each database type. 
          Modify them to learn how different parts work.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🔍</div>
      <div className="tip-content">
        <h3>View the Schema First</h3>
        <p>
          Always check the database schema before writing queries. Understanding the structure 
          helps you write better queries and avoid errors.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🤖</div>
      <div className="tip-content">
        <h3>Leverage AI Help</h3>
        <p>
          When you get an error, use the "Ask Gemini for Help" button. The AI will explain 
          what went wrong and suggest fixes to help you learn.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">📊</div>
      <div className="tip-content">
        <h3>SQL: Use LIMIT</h3>
        <p>
          When testing queries, use LIMIT to return only a few rows. This makes results 
          easier to read and queries faster to execute.
        </p>
        <div className="code-block">
          <pre>SELECT * FROM users LIMIT 10;</pre>
        </div>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🎨</div>
      <div className="tip-content">
        <h3>SQL: Use Aliases</h3>
        <p>
          Make your queries more readable with table and column aliases, especially in JOINs.
        </p>
        <div className="code-block">
          <pre>{`SELECT u.name, o.amount 
FROM users u 
JOIN orders o ON u.id = o.user_id;`}</pre>
        </div>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🔗</div>
      <div className="tip-content">
        <h3>MongoDB: Understand Operators</h3>
        <p>
          MongoDB uses operators like $gt, $lt, $in for comparisons. Learn these to write powerful queries.
        </p>
        <div className="code-block">
          <pre>{`db.products.find({ 
  price: { $gt: 50, $lt: 200 } 
})`}</pre>
        </div>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">⚡</div>
      <div className="tip-content">
        <h3>Test Incrementally</h3>
        <p>
          Build complex queries step by step. Test each part before adding more complexity. 
          This makes debugging much easier.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🎓</div>
      <div className="tip-content">
        <h3>Practice Regularly</h3>
        <p>
          The best way to learn databases is through consistent practice. Try to write 
          queries daily, even if just for 10-15 minutes.
        </p>
      </div>
    </div>

    <div className="tip-card">
      <div className="tip-icon">🚀</div>
      <div className="tip-content">
        <h3>Custom Mode</h3>
        <p>
          Once comfortable with sample databases, switch to Custom mode to create your 
          own tables and collections. This solidifies your learning.
        </p>
      </div>
    </div>

    <div className="info-card highlight">
      <h3>🎯 Challenge Yourself</h3>
      <p>Try these progressively harder challenges:</p>
      <ol className="numbered-list">
        <li>Write queries to answer specific questions about the data</li>
        <li>Optimize queries to return results faster</li>
        <li>Combine multiple operations (filter, sort, group) in one query</li>
        <li>Create your own database schema from scratch</li>
        <li>Migrate a SQL query pattern to MongoDB (or vice versa)</li>
      </ol>
    </div>
  </div>
);

export default TipsAndTricks;