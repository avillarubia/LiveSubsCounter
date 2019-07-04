import React, { Component } from "react";
import Highcharts from "highcharts/highcharts";

class Chart extends Component {
  componentDidMount() {
    const { series } = this.props;
    console.log(series);
    this.prepareChart(series);
  }

  prepareChart(_series) {
    var _subscriberCount = _series[_series.length - 1].subscriberCount;

    Highcharts.chart("container", {
      chart: {
        type: "spline",
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function() {
            var series = this.series[0];
            setInterval(function() {
              var subs = parseInt(
                _series[_series.length - 1].subscriberCount,
                10
              );
              var x = new Date().getTime(), // current time
                y = subs;
              console.log(subs);
              series.addPoint([x, y], true, false);
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      title: {
        text: "Live random data"
      },
      xAxis: {
        type: "datetime",
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: "Value"
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080"
          }
        ]
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [
        {
          name: "Random data",
          data: (function() {
            // generate an array of random data
            var data = [];
            return data;
          })()
        }
      ]
    });
  }
  render() {
    return <div id="container" style={{ height: 200 }} />;
  }
}

export default Chart;
