import { useState } from 'react'
import './Header.css'

const navLinks = ['CREATIVE', 'EVENTS', 'MERCHANDISE', 'RESOURCES', 'DEMO APP']

export default function Header() {
  const [activeNav] = useState(null)

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-items">
          <span>12345M</span>
          <span>Co-Op $100.00</span>
          <a href="#" className="support-link">Support</a>
        </div>
      </div>
      <div className="header-main">
        <a href="/" className="logo">
          <img src="/tmzLogo.svg" alt="DIRECTV The Marketing ZONE" className="logo-img" />
        </a>
        <nav className="nav">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className={`nav-link ${activeNav === link ? 'active' : ''}`}
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="nav-icons">
          <button className="icon-btn" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="badge">2</span>
          </button>
          <button className="icon-btn" aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="badge">3</span>
          </button>
        </div>
      </div>
    </header>
  )
}
