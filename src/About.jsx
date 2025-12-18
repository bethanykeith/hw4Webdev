import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div>
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
          <h1>
            <Link to="/">About Us</Link>
          </h1>
        </div>
      </div>

      <div className="message-container">
        <img
          src={`${process.env.PUBLIC_URL}/logobistro.png`} 
          alt="Coffee Bistro"
          className="message-image"
        />
        <div className="message">
          <p>
            Welcome to good coffee. Here at Coffee Bistro, we are here to serve you.
          </p>
          <p>
            Founded in 2025 by two friends who love good coffee, Coffee Bistro is
            dedicated to serving the best of the best.
          </p>
          <p>
            Buy our beans online, or come to our flagship location at
            <br />
            1234 1st Ave, NYC.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
