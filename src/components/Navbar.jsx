'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import '../styles/Navbar.css';

export default function Navbar({ onContactClick }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand me-auto mx-3" href="/">
          <Image
            src="/logo.png"
            alt="QueryLab"
            width={30}
            height={30}
            className="d-inline-block align-text-top me-2"
          />
          QueryLab
        </Link>
        
        <div
          className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ visibility: isOpen ? 'visible' : 'hidden' }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">QueryLab</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link 
                  href="/" 
                  className={`nav-link mx-lg-2 ${pathname === '/' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/documentation" 
                  className={`nav-link mx-lg-2 ${pathname === '/documentation' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Documentation
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/databases" 
                  className={`nav-link mx-lg-2 ${pathname === '/databases' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Databases
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  href="/about" 
                  className={`nav-link mx-lg-2 ${pathname === '/about' ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <button className="contact-button" onClick={onContactClick}>
          Contact
        </button>
        
        <button
          className="navbar-toggler pe-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="offcanvas-backdrop fade show" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}