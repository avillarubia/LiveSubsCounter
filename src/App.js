import React, { Component } from "react";
import http from "./services/httpService";
import apiQuery from "./config/api";
import Channel from "./components/channel";
import SearchBox from "./components/common/search";
import Chart from "./components/common/chart";
import _ from "lodash";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    query: "",
    prevQuery: "",
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
      const { query, prevQuery } = this.state;
      if (query.trim() !== "") {
        const { data: channels } = await http.get(
          this.constructApiEndpoint(query)
        );
        if (channels.items !== null && channels.items.length > 0) {
          const channel = channels.items[0];
          if (prevQuery !== query) {
            this.resetStateValues();
          }
          this.setStateValues(query, channel);
        } else this.resetStateValues();
      }
    }, 1000);
  }

  setStateValues(query, channel) {
    var subscriberCount = channel.statistics.subscriberCount;

    this.setState(prevState => ({
      query: query,
      prevQuery: query,
      name: channel.snippet.title,
      imageUrl: channel.snippet.thumbnails.default.url,
      subscriberCount: subscriberCount
      // chartHistory: [
      //   ...prevState.chartHistory,
      //   { subscriberCount: subscriberCount }
      // ]
    }));
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
    let { name, imageUrl, subscriberCount } = this.state;
    subscriberCount = _.parseInt(subscriberCount);

    return (
      <div className="text-center cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <NavBar />
        <main role="main" className="inner cover">
          <h1 className="cover-heading">Whose channel is that?</h1>
          <SearchBox onKeyPress={this.handleKeyPress} />
          <Channel
            imageUrl={imageUrl}
            name={name}
            subscriberCount={subscriberCount}
          />

          {subscriberCount > 1 ? <Chart subsCount={subscriberCount} /> : null}

          <p className="lead" />

          {/* <p className="lead">
        <a href="/" className="btn btn-lg btn-secondary">
          Learn more
        </a>
      </p> */}
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
