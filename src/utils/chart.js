import Highcharts from "highcharts/highcharts";
import { data } from "../objects/data";

export function visualize() {
  return Highcharts.chart("container", {
    chart: {
      type: "spline",
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function() {
          var series = this.series[0];
          setInterval(function() {
            var time = new Date().getTime();
            const subsCount = data.subsCount;
            series.addPoint([time, subsCount], true, false);
          }, 1000);
        }
      },
      backgroundColor: "transparent"
    },
    credits: { enabled: false },
    time: { useUTC: false },
    xAxis: {
      type: "datetime",
      tickPixelInterval: 150
    },
    yAxis: {
      plotLines: [
        {
          value: 0,
          width: 1,
          color: "#808080"
        }
      ],
      visible: false
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br/>",
      pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}"
    },
    title: {
      text: ""
    },
    legend: { enabled: false },
    exporting: { enabled: false },
    series: [
      {
        name: "subscribers per second",
        data: (function() {
          var data = [];
          return data;
        })(),
        marker: { enabled: false }
      }
    ]
  });
}
