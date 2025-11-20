import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div>
      {/* HERO SECTION */}
      <div
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.PUBLIC_URL}/beans.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "15vh"
        }}
      >
        <div className="hero_text">
          <Link to="/">CONTACT US</Link>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="contactpage">
        <img
          src={`${process.env.PUBLIC_URL}/cafeBistroMap.png`}
          alt="Map to Beth’s Bistro"
          className="map-img"
        />
      </div>

      {/* CONTACT FORM SECTION */}
      <div className="contact-form-section">
        <h2>We Want To Hear From You!</h2>
        <form id="contactForm" action="#" method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
