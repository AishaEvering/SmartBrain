import { React, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Logo from "../../components/Logo";
import Background from "../../components/Background";
import "../../style/Navigation.css";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const signOut = () => {
    setCurrentUser(null);
    navigate("/home");
  };

  return (
    <>
      <Background />
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <Logo />
          </div>
        </Link>
        <div className="title neonText">Welcome to Face Block!</div>
        <div className="nav-links-container">
          {currentUser?.id ? (
            <span className="nav-link white" onClick={signOut}>
              Sign Out
            </span>
          ) : (
            <>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
