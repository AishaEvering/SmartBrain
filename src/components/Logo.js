import React from "react";
import Tilt from "react-parallax-tilt";
import "../style/Logo.css";
import logo from "../style/assets/smiley.png";

const Logo = () => {
  return (
    <Tilt
      tiltMaxAngleX={25}
      tiltMaxAngleY={25}
      perspective={900}
      scale={1.1}
      transitionSpeed={1500}
      gyroscope={true}
      style={{ height: 50, width: 420 }}
    >
      <img src={logo} className="logo" alt="logo" />
    </Tilt>
  );
};

export default Logo;
