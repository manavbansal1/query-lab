'use client';

import React from 'react';
import Link from 'next/link';
import { FaTools, FaRocket, FaArrowLeft, FaHeart } from 'react-icons/fa';
import '../styles/UnderConstruction.css';

const UnderConstruction = ({ 
  title = "Under Construction", 
  message = "I'm working hard to bring you something amazing!",
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

        {/* Solo Developer Note */}
        <div className="solo-dev-note">
          <FaHeart className="heart-icon" />
          <p>
            <strong>Built by a solo developer</strong><br />
            QueryLab is a passion project built in my free time. 
            Your patience and support mean the world! 🙏
          </p>
        </div>

        {/* Features Coming */}
        <div className="coming-features">
          <h3>What's Coming:</h3>
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

        {/* Support Note */}
        <div className="support-note">
          <p>Want to help? ⭐ Star on GitHub or share with friends!</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;