import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <span className="footer-logo">DIRECTV</span>
        <div className="footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Help</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          ©2026 DIRECTV. DIRECTV and all other DIRECTV marks are trademarks of DIRECTV, LLC. All other marks are the property of their respective owners.
        </p>
      </div>
    </footer>
  )
}
