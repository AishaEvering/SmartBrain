import React from "react";
import Logo from "./Logo";
import "../style/Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div className="nav">
      <div
        onClick={() => {
          const route = isSignedIn ? "signout" : "home";
          onRouteChange(route);
        }}
        className="login f5 white link dim black underline pointer"
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </div>
      <div
        style={{ display: isSignedIn ? "none" : "block" }}
        onClick={() => onRouteChange("register")}
        className="login f5 white link dim black underline pointer"
      >
        Register
      </div>
      <Logo />
    </div>
  );
};

export default Navigation;
