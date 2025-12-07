'use client';

import React from 'react';
import { FaHeart, FaLightbulb, FaCode, FaGraduationCap, FaRocket, FaGithub, FaEnvelope, FaBook } from 'react-icons/fa';
import Link from 'next/link';
import '../../styles/Documentation.css'

const Page = () => {
  return (
    <div className="docs-container">
      <div className="docs-content">
        {/* Hero Section - Same as Documentation */}
        <div className="docs-hero">
          <div className="docs-hero-content">
            <div className="hero-badge">
              <FaHeart className="pulse-icon" />
              <span>Passion Project</span>
            </div>
            <h1 className="docs-title">
              <FaBook className="title-icon" />
              About QueryLab
            </h1>
            <p className="docs-subtitle">
              Making database learning accessible to everyone—no installation required, no barriers, just pure learning in your browser.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="docs-main">
          <div className="docs-section">
            
            {/* The Story */}
            <h2 className="section-title">The Story Behind QueryLab</h2>
            
            <div className="info-card">
              <h3>
                <FaLightbulb style={{ marginRight: '10px', color: '#f59e0b' }} />
                The Problem
              </h3>
              <p>
                As a developer who mentored students, I witnessed the same barrier repeatedly: before anyone could write their first SQL query, they needed to install MySQL, PostgreSQL, or MongoDB. Troubleshoot connection issues. Configure environments. Deal with compatibility problems.
              </p>
              <p>
                For many students, this initial setup became an insurmountable hurdle. They wanted to learn databases, not become system administrators.
              </p>
            </div>

            <div className="info-card">
              <h3>
                <FaRocket style={{ marginRight: '10px', color: '#10b981' }} />
                The Solution
              </h3>
              <p>
                What if learning databases could be as simple as opening a website? No installation, no configuration, no barriers—just pure learning.
              </p>
              <p>
                QueryLab brings SQL (SQLite) and MongoDB directly to your browser. Click a button, write a query, see results instantly. That's it.
              </p>
            </div>

            <div className="info-card">
              <h3>
                <FaCode style={{ marginRight: '10px', color: '#8b5cf6' }} />
                The Execution
              </h3>
              <p>
                Built with Next.js, sql.js, and MongoDB Atlas, QueryLab runs SQLite entirely in your browser while providing cloud-based MongoDB sessions. Each user gets an isolated environment that persists across page refreshes.
              </p>
              <p>
                AI-powered help from Google Gemini acts as your personal tutor, explaining errors and suggesting fixes when you get stuck.
              </p>
            </div>

            {/* Why This Matters */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>Why This Matters</h2>
            
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-number">01</div>
                <h4>Accessibility</h4>
                <p>
                  Anyone with internet access can practice databases. No powerful computer required. No admin privileges needed.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-number">02</div>
                <h4>Immediate Feedback</h4>
                <p>
                  Write query → Execute → See results. The learning loop is measured in seconds, not hours.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-number">03</div>
                <h4>Risk-Free Experimentation</h4>
                <p>
                  Isolated sessions mean you can't break anything. DROP TABLE? No problem. Start fresh anytime.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-number">04</div>
                <h4>Dual Database Learning</h4>
                <p>
                  Compare SQL and MongoDB side-by-side. One platform, two paradigms.
                </p>
              </div>
            </div>

            {/* Creator Section */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>About the Creator</h2>
            
            <div className="creator-card">
              <div className="creator-avatar">
                <FaGraduationCap />
              </div>
              <div className="creator-content">
                <h3>Manav Bansal</h3>
                <p className="creator-tagline">Full-Stack Developer • Educator • Open Source Advocate</p>
                <p>
                  I'm a solo developer who believes education should be accessible to everyone. QueryLab started as a weekend project to help my mentees, but it grew into something bigger—a platform that's helped thousands of students take their first steps with databases.
                </p>
                <p>
                  This project is built entirely in my free time, with no funding or team. Every feature, every bug fix, every documentation page—it's all a labor of love. Your feedback and support are what keep this project alive and growing.
                </p>
                <div className="creator-links">
                  <a href="https://github.com/manavbansal1" target="_blank" rel="noopener noreferrer" className="social-link github">
                    <FaGithub /> GitHub
                  </a>
                  <a href="mailto:bansalmanav39@gmail.com" className="social-link email">
                    <FaEnvelope /> Email
                  </a>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>Built With Modern Tech</h2>
            
            <div className="tech-grid">
              <div className="tech-item">
                <h4>Frontend</h4>
                <p>Next.js 14, React 18, Monaco Editor, Bootstrap 5</p>
              </div>
              <div className="tech-item">
                <h4>Backend</h4>
                <p>Next.js API Routes, MongoDB Node Driver, sql.js</p>
              </div>
              <div className="tech-item">
                <h4>Database</h4>
                <p>MongoDB Atlas (Cloud), SQLite (Browser)</p>
              </div>
              <div className="tech-item">
                <h4>AI Integration</h4>
                <p>Google Gemini for intelligent error explanations</p>
              </div>
              <div className="tech-item">
                <h4>Deployment</h4>
                <p>Vercel with automated session cleanup</p>
              </div>
              <div className="tech-item">
                <h4>Features</h4>
                <p>Session isolation, Auto-cleanup, Responsive design</p>
              </div>
            </div>

            {/* Stats */}
            <div className="info-card highlight" style={{ marginTop: '3rem' }}>
              <h3>📊 QueryLab by the Numbers</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">2</div>
                  <div className="stat-label">Database Systems</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">3</div>
                  <div className="stat-label">Sample Databases</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">0</div>
                  <div className="stat-label">Installation Required</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Free & Open Source</div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>The Vision</h2>
            
            <div className="info-card">
              <p>
                QueryLab isn't just about executing queries—it's about democratizing database education. I envision a future where:
              </p>
              <ul className="vision-list">
                <li>Every student, regardless of their computer or location, can learn databases</li>
                <li>Database concepts are taught through hands-on practice, not just theory</li>
                <li>AI assists learning without replacing the struggle that leads to understanding</li>
                <li>Open source tools make education accessible to all</li>
              </ul>
              <p>
                This is just the beginning. With community support, QueryLab will evolve with more databases, interactive tutorials, query challenges, and performance analytics.
              </p>
            </div>

            {/* Support */}
            <h2 className="section-title" style={{ marginTop: '3rem' }}>Support the Project</h2>
            
            <div className="support-grid">
              <div className="support-card">
                <span className="support-emoji">⭐</span>
                <h4>Star on GitHub</h4>
                <p>Show your support and help others discover QueryLab</p>
              </div>
              <div className="support-card">
                <span className="support-emoji">🐛</span>
                <h4>Report Bugs</h4>
                <p>Found an issue? Let me know so I can fix it</p>
              </div>
              <div className="support-card">
                <span className="support-emoji">💡</span>
                <h4>Suggest Features</h4>
                <p>Have ideas? I'd love to hear them</p>
              </div>
              <div className="support-card">
                <span className="support-emoji">📢</span>
                <h4>Spread the Word</h4>
                <p>Share with students, teachers, and developers</p>
              </div>
            </div>

            {/* CTA */}
            <div className="examples-cta" style={{ marginTop: '3rem' }}>
              <div className="cta-content">
                <div className="cta-icon">
                  <FaRocket />
                </div>
                <h3>Ready to Start Learning?</h3>
                <p>
                  Jump in and write your first query in seconds. No setup, no hassle—just learning.
                </p>
                <div className="cta-buttons">
                  <Link href="/" className="cta-button">
                    Start Practicing
                  </Link>
                  <a 
                    href="https://github.com/manavbansal1/query-lab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-button cta-button-secondary"
                  >
                    <FaGithub style={{ marginRight: '8px' }} />
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;