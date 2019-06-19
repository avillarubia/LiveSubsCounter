import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";

class App extends Component {
  state = {
    snippet: {},
    statistics: {}
  };

  async componentDidMount() {
    setInterval(async () => {
      const { data: channels } = await http.get(
        config.apiEndpoint + config.apiKey
      );

      const channel = channels.items[0];
      const snippet = channel.snippet;
      const statistics = channel.statistics;

      this.setState({ snippet, statistics });
      console.log(channels);
    }, 1000);
  }

  render() {
    return (
      <h1>
        {this.state.snippet.title} :
        <span className="odometer">
          {this.state.statistics.subscriberCount}
        </span>
      </h1>
    );
  }
}

export default App;
