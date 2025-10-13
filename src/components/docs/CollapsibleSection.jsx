'use client';

import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CollapsibleSection = ({ id, title, children, isExpanded, toggle }) => (
  <div className="collapsible-section">
    <button 
      className={`collapsible-header ${isExpanded ? 'active' : ''}`}
      onClick={() => toggle(id)}
    >
      <span>{title}</span>
      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {isExpanded && (
      <div className="collapsible-content">
        {children}
      </div>
    )}
  </div>
);

export default CollapsibleSection;