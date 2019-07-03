import React, { Component } from "react";
import http from "./services/httpService";
import apiQuery from "./config/api";
import Channel from "./components/channel";
import SearchBox from "./common/search";
import Chart from "./common/chart";

class App extends Component {
  state = {
    query: "",
    name: "",
    imageUrl: "",
    subscriberCount: 0
  };

  constructor() {
    super();
    this.baseState = this.state;
  }

  componentDidMount() {
    this.fetchRealTimeData();
  }

  fetchRealTimeData() {
    setInterval(async () => {
      const { query } = this.state;

      if (query.trim() !== "") {
        const { data: channels } = await http.get(
          this.constructApiEndpoint(query)
        );
        if (channels.items !== null && channels.items.length > 0) {
          const channel = channels.items[0];
          this.setStateValues(query, channel);
        } else {
          this.resetStateValues();
        }
      }
    }, 1000);
  }

  setStateValues(query, channel) {
    this.setState({
      query: query,
      name: channel.snippet.title,
      imageUrl: channel.snippet.thumbnails.default.url,
      subscriberCount: channel.statistics.subscriberCount
    });
  }

  resetStateValues() {
    this.setState(this.baseState);
  }

  constructApiEndpoint(query) {
    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      "part=" +
      apiQuery.part +
      "&forUsername=" +
      query +
      "&key=" +
      process.env.REACT_APP_API_KEY;
    return apiEndpoint;
  }

  handleKeyPress = e => {
    const query = e.currentTarget.value;
    if (e.key === "Enter") {
      this.setState({ query });
    }
  };

  render() {
    const { name, imageUrl, subscriberCount } = this.state;

    return (
      <div className="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
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

        <main role="main" className="inner cover">
          <h1 className="cover-heading">Whose channel is that?</h1>
          <SearchBox onKeyPress={this.handleKeyPress} />
          <Channel
            imageUrl={imageUrl}
            name={name}
            subscriberCount={subscriberCount}
          />
          <Chart />

          <p className="lead">
            Cover is a one-page template for building simple and beautiful home
            pages. Download, edit the text, and add your own fullscreen
            background photo to make it your own.
          </p>
          <p className="lead">
            <a href="/" className="btn btn-lg btn-secondary">
              Learn more
            </a>
          </p>
        </main>

        <footer className="mastfoot mt-auto">
          <div className="inner">
            <p>
              Cover template for{" "}
              <a href="https://getbootstrap.com/">Bootstrap</a>, by{" "}
              <a href="https://twitter.com/aljohnyamaro">@yamaro</a>.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
