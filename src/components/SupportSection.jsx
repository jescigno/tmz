import './SupportSection.css'

export default function SupportSection() {
  return (
    <section className="support-section">
      <div className="support-container">
        <div className="support-content">
          <h2 className="support-title">We're here to help</h2>
          <p className="support-text">
            Our dedicated team is here to guide you every step of the way. Fill out the form, and we will contact you shortly to find out how we can support you.
          </p>
          <a href="#" className="support-btn">CONTACT SUPPORT</a>
        </div>
        <div className="support-image-wrapper">
          <img src="/support-image.png" alt="Support team member" className="support-image" />
        </div>
      </div>
    </section>
  )
}
