import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Live from "./components/live";
import Contact from "./components/contact";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <div className="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <NavBar />

        <main role="main" className="inner cover">
          <Switch>
            <Route path="/live" component={Live} />
            <Route path="/contact" component={Contact} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
