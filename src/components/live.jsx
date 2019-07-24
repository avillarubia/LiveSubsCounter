import React, { Component } from "react";
import http from "../services/httpService";
import { constructEndpoint } from "../config/api.js";
import Channel from "./channel";
import SearchBox from "./common/search";
import Chart from "./common/chart";
import _ from "lodash";

class Live extends Component {
  state = {
    query: "",
    prevQuery: "",
    name: "",
    imageUrl: "",
    subsCount: 0
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
          constructEndpoint("forUsername", query)
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
    const subsCount = _.parseInt(channel.statistics.subscriberCount);
    this.setState(prevState => ({
      query: query,
      prevQuery: query,
      name: channel.snippet.title,
      imageUrl: channel.snippet.thumbnails.default.url,
      subsCount: subsCount
      // chartHistory: [
      //   ...prevState.chartHistory,
      //   { subsCount: subsCount }
      // ]
    }));
  }

  resetStateValues() {
    this.setState(this.baseState);
  }

  handleKeyPress = e => {
    const query = e.currentTarget.value;
    if (e.key === "Enter") {
      this.setState({ query });
    }
  };

  display(subsCount) {
    return subsCount > 1 ? (
      <React.Fragment>
        <Chart subsCount={subsCount} />
        <p className="lead" />
      </React.Fragment>
    ) : null;
  }

  render() {
    let { name, imageUrl, subsCount } = this.state;

    return (
      <React.Fragment>
        <h1 className="cover-heading">Whose channel is that?</h1>
        <br />
        <SearchBox onKeyPress={this.handleKeyPress} />
        <br />
        <Channel imageUrl={imageUrl} name={name} subsCount={subsCount} />
        {this.display(subsCount)}
      </React.Fragment>
    );
  }
}

export default Live;
