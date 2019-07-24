import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="masthead mb-auto">
      <div className="inner">
        <h3 className="masthead-brand">Social Live Counter</h3>
        <nav className="nav nav-masthead justify-content-center">
          <Link className="nav-link" to="/">
            {/*nav-link active*/}
            Home
          </Link>
          <Link className="nav-link" to="/live">
            Live
          </Link>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
