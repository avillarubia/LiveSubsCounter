import React from "react";

const NavBar = () => {
  return (
    <header className="masthead mb-auto">
      <div className="inner">
        <h3 className="masthead-brand">Social Figures</h3>
        <nav className="nav nav-masthead justify-content-center">
          <a className="nav-link active" href="/Home">
            Home
          </a>
          <a className="nav-link" href="/Features">
            Features
          </a>
          <a className="nav-link" href="/Contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
