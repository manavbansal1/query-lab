// src/components/UnderConstruction.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaTools, FaRocket, FaArrowLeft } from 'react-icons/fa';
import '../styles/UnderConstruction.css';

const UnderConstruction = ({ 
  title = "Under Construction", 
  message = "We're working hard to bring you something amazing!",
  estimatedTime = "Coming Soon"
}) => {
  return (
    <div className="construction-container">
      <div className="construction-content">
        {/* Animated Icon */}
        <div className="construction-icon">
          <FaTools size={80} className="tools-icon" />
          <FaRocket size={40} className="rocket-icon" />
        </div>

        {/* Title */}
        <h1 className="construction-title">{title}</h1>

        {/* Message */}
        <p className="construction-message">{message}</p>

        {/* Estimated Time */}
        <div className="construction-badge">
          <span className="badge-text">{estimatedTime}</span>
        </div>

        {/* Features Coming */}
        <div className="coming-features">
          <h3>What to Expect:</h3>
          <ul>
            <li>✨ Comprehensive guides and tutorials</li>
            <li>📚 Interactive code examples</li>
            <li>🎯 Step-by-step learning paths</li>
            <li>💡 Best practices and tips</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="construction-actions">
          <Link href="/" className="btn-home">
            <FaArrowLeft className="btn-icon" />
            Back to Home
          </Link>
          <Link href="/" className="btn-primary-construct">
            Start Practicing
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UnderConstruction;