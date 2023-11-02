import React from "react";
import Logo from "./Logo";
import "../style/Navigation.css";

const Navigation = () => {
  return (
    <div className="nav">
      <div>
        <div className="login f5 white link dim black underline pointer">
          Sign Out
        </div>
      </div>
      <Logo />
    </div>
  );
};

export default Navigation;
