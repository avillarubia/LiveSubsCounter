import React, { Component } from "react";
import NavBar from "./components/navbar";
import Live from "./components/live";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <div className="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <NavBar />
        <main role="main" className="inner cover">
          <Live />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
