import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    clickedMenu: ""
  };

  menus = ["/", "/Live", "/About"];

  handleClick(menu) {
    this.setState({ clickedMenu: menu });
  }

  getMenu(menu) {
    return menu === "/" ? "Home" : menu.replace("/", "");
  }

  getMenuClass(menu) {
    return this.state.clickedMenu === menu ? "active" : "";
  }

  render() {
    return (
      <header className="masthead mb-auto">
        <div className="inner">
          <h5 className="masthead-brand">Social Live Counter</h5>
          <nav className="nav nav-masthead justify-content-center">
            {this.menus.map(menu => (
              <Link
                key={this.getMenu(menu)}
                to={menu.toLowerCase()}
                onClick={this.handleClick.bind(this, menu)}
                className={"nav-link " + this.getMenuClass(menu)}
              >
                {this.getMenu(menu)}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
