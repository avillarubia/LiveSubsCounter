import React, { Component } from "react";
import http from "../services/httpService";
import { constructEndpoint } from "../config/api.js";
import Channel from "./channel";
import SearchBox from "./common/search";
import Chart from "./common/chart";
import _ from "lodash";
import Joi from "joi-browser";

class Live extends Component {
  state = {
    query: "",
    prevQuery: "",
    name: "",
    imageUrl: "",
    subsCount: 0,
    error: ""
  };

  schema = Joi.string().required();

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
      if (query) {
        var param = this.getParam(query);
        var endpoint = constructEndpoint(param, query);
        const { data: channels } = await http.get(endpoint);
        this.setStateValues(channels, prevQuery, query);
      }
    }, 1000);
  }

  setStateValues(channels, prevQuery, query) {
    if (this.hasChannels(channels)) {
      const channel = channels.items[0];
      if (prevQuery !== query) this.resetStateValues();
      this.setStateValuesFromResponse(query, channel);
    } else {
      this.resetStateValues();
      this.setState({ error: "No channel found." });
    }
  }

  getParam(query) {
    return this.isID(query) ? "id" : "forUsername";
  }

  hasChannels(channels) {
    return channels.items !== null && channels.items.length > 0;
  }

  isID(query) {
    return query.length === 24 && query.startsWith("UC");
  }

  setStateValuesFromResponse(query, channel) {
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
      var error = this.validate(query);
      this.setState({ query, error });
    }
  };

  validate(query) {
    var { error } = Joi.validate(query, this.schema);
    if (!error) return "";
    return error.details[0].message;
  }

  display(subsCount) {
    return subsCount > 1 ? <Chart subsCount={subsCount} /> : null;
  }

  render() {
    let { name, imageUrl, subsCount, error } = this.state;

    return (
      <React.Fragment>
        <h1 className="cover-heading">Whose channel is that?</h1>
        <br />
        <SearchBox onKeyPress={this.handleKeyPress} error={error} />
        <br />
        <Channel imageUrl={imageUrl} name={name} subsCount={subsCount} />
        {this.display(subsCount)}
      </React.Fragment>
    );
  }
}

export default Live;
