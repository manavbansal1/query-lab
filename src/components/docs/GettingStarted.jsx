'use client';

import React from 'react';
import { FaDatabase, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

const GettingStarted = () => (
  <div className="docs-section">
    <h2 className="section-title">Welcome to QueryLab! 🚀</h2>
    
    <div className="info-card">
      <h3>What is QueryLab?</h3>
      <p>
        QueryLab is an interactive platform for learning and practicing database queries without any installation. 
        Practice SQL (SQLite) and MongoDB queries directly in your browser with instant feedback.
      </p>
    </div>

    <div className="info-card">
      <h3>Quick Start Guide</h3>
      <ol className="numbered-list">
        <li>
          <strong>Choose Your Database Type:</strong> Select between SQL (SQLite) or MongoDB mode
        </li>
        <li>
          <strong>Select a Sample Database:</strong> Choose from Users & Orders, Blog, E-commerce, or create your own Custom database
        </li>
        <li>
          <strong>View the Schema:</strong> Click the "Show" button to see the database structure
        </li>
        <li>
          <strong>Write Your Query:</strong> Use the Monaco editor with syntax highlighting
        </li>
        <li>
          <strong>Execute:</strong> Click "Execute Query" to run your code and see results
        </li>
        <li>
          <strong>Get Help:</strong> If you encounter errors, use the AI-powered help feature
        </li>
      </ol>
    </div>

    <div className="feature-grid">
      <div className="feature-card">
        <FaDatabase className="feature-icon" />
        <h4>Dual Database Support</h4>
        <p>Practice both SQL and MongoDB queries in one place</p>
      </div>
      <div className="feature-card">
        <FaCode className="feature-icon" />
        <h4>Interactive Editor</h4>
        <p>Syntax highlighting and auto-completion</p>
      </div>
      <div className="feature-card">
        <FaLightbulb className="feature-icon" />
        <h4>AI-Powered Help</h4>
        <p>Get intelligent explanations for query errors</p>
      </div>
      <div className="feature-card">
        <FaRocket className="feature-icon" />
        <h4>Instant Results</h4>
        <p>See query results in real-time</p>
      </div>
    </div>

    <div className="info-card highlight">
      <h3>💡 Pro Tip</h3>
      <p>
        Start with the sample queries for each database type to understand the syntax, 
        then modify them to create your own queries. Learning by doing is the best approach!
      </p>
    </div>
  </div>
);

export default GettingStarted;


