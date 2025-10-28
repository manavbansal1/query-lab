'use client';
import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import '../../styles/Documentation.css'

const DatabasesPage = () => {
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
        
        {/* More content coming... */}
        <div className="docs-main">
          <p>Database selector coming next...</p>
        </div>
      </div>
    </div>
  );
};

export default DatabasesPage;