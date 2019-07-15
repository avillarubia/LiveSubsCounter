import React, { Component } from "react";
import http from "../services/httpService";
import apiQuery from "../config/api";
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
    const subsCount = channel.statistics.subscriberCount;
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

  displayChart(subsCount) {
    return subsCount > 1 ? <Chart subsCount={subsCount} /> : null;
  }

  render() {
    let { name, imageUrl, subsCount } = this.state;
    subsCount = _.parseInt(subsCount);

    return (
      <React.Fragment>
        <h1 className="cover-heading">Whose channel is that?</h1>
        <SearchBox onKeyPress={this.handleKeyPress} />
        <Channel imageUrl={imageUrl} name={name} subsCount={subsCount} />
        {this.displayChart(subsCount)}
        <p className="lead" />

        {/* <p className="lead">
                    <a href="/" className="btn btn-lg btn-secondary">
                    Learn more
                    </a>
                </p> */}
      </React.Fragment>
    );
  }
}

export default Live;
