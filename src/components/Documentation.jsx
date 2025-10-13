'use client';

import React, { useState } from 'react';
import { FaDatabase, FaCode, FaLightbulb, FaBook, FaRocket, FaSearch } from 'react-icons/fa';
import GettingStarted from './docs/GettingStarted.jsx';
import SQLGuide from './docs/SQLGuide.jsx';
import MongoDBGuide from './docs/MongoDBGuide.jsx';
import Examples from './docs/Examples.jsx';
import TipsAndTricks from './docs/TipsAndTricks.jsx';
import '../styles/Documentation.css'

const Documentation = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  return (
    <div className="docs-container">
      <div className="docs-content">
        {/* Hero Section */}
        <div className="docs-hero">
          <div className="docs-hero-content">
            <h1 className="docs-title">
              <FaBook className="title-icon" />
              QueryLab Documentation
            </h1>
            <p className="docs-subtitle">
              Master SQL and MongoDB queries with our comprehensive guides and interactive examples
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="docs-nav">
          <button
            className={`docs-nav-btn ${activeTab === 'getting-started' ? 'active' : ''}`}
            onClick={() => setActiveTab('getting-started')}
          >
            <FaRocket />
            Getting Started
          </button>
          <button
            className={`docs-nav-btn ${activeTab === 'sql' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql')}
          >
            <FaDatabase />
            SQL Guide
          </button>
          <button
            className={`docs-nav-btn ${activeTab === 'mongodb' ? 'active' : ''}`}
            onClick={() => setActiveTab('mongodb')}
          >
            <FaDatabase />
            MongoDB Guide
          </button>
          <button
            className={`docs-nav-btn ${activeTab === 'examples' ? 'active' : ''}`}
            onClick={() => setActiveTab('examples')}
          >
            <FaCode />
            Examples
          </button>
          <button
            className={`docs-nav-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <FaLightbulb />
            Tips & Tricks
          </button>
        </div>

        {/* Content Sections */}
        <div className="docs-main">
          {activeTab === 'getting-started' && <GettingStarted />}
          {activeTab === 'sql' && <SQLGuide />}
          {activeTab === 'mongodb' && <MongoDBGuide />}
          {activeTab === 'examples' && <Examples />}
          {activeTab === 'tips' && <TipsAndTricks />}
        </div>
      </div>
    </div>
  );
};

export default Documentation;