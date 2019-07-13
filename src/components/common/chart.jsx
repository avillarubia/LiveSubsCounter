import React, { Component } from "react";
import { visualize } from "../../utils/chart";
import { data } from "../../objects/data";

class Chart extends Component {
  componentWillReceiveProps() {
    const subsCount = this.props.subsCount;
    data.subsCount = subsCount;
  }

  componentDidMount() {
    visualize();
  }

  render() {
    return <div id="container" style={{ height: 150 }} />;
  }
}

export default Chart;
