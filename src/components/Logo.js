import React from "react";
import Tilt from "react-parallax-tilt";
import "../style/Logo.css";
import imgLogo from "../style/assets/brain.jpg";

const Logo = () => {
  return (
    <div className="logo_container">
      <Tilt
        className="Tilt"
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        perspective={900}
        scale={1.1}
        transitionSpeed={1500}
        gyroscope={true}
        style={{ height: 100, width: 120 }}
      >
        <img src={imgLogo} className="inner-element" alt="logo" />
      </Tilt>
      <div className="logo_title">
        <h1>Smart Brain</h1>
      </div>
    </div>
  );
};

export default Logo;
