import React, { Component } from "react";
import http from "../services/httpService";
import Channel from "./channel";
import SearchBox from "./common/search";
import Chart from "./common/chart";
import _ from "lodash";
import Joi from "joi-browser";

let intervalRequest;

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

  componentWillUnmount() {
    clearInterval(intervalRequest);
  }

  fetchRealTimeData() {
    intervalRequest = setInterval(async () => {
      const { query, prevQuery } = this.state;
      if (query) {
        var api = process.env.REACT_APP_API_URL;
        var reqBody = {
          param: this.getParam(query),
          query
        };
        const channel = await http.post(api, reqBody);

        this.setStateValues(channel, prevQuery);
      }
    }, 1000);
  }

  setStateValues(channel, prevQuery) {
    if (channel.subsCount) {
      const { query, name, imageUrl, subsCount } = channel;
      if (prevQuery !== query) this.resetStateValues();
      this.setState({ query, prevQuery: query, name, imageUrl, subsCount });
    } else {
      this.resetStateValues();
      this.setState({ error: "No channel found." });
    }
  }

  getParam(query) {
    return this.isID(query) ? "id" : "forUsername";
  }

  isID(query) {
    return query.length === 24 && query.startsWith("UC");
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
