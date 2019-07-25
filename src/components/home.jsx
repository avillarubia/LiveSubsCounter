import React, { Component } from "react";
import http from "../services/httpService";
import { constructEndpoint } from "../config/api.js";
import Table from "./common/table";
import Spinner from "./common/spinner";
import { sleep } from "./../utils/sleep";
import _ from "lodash";

class Home extends Component {
  state = {
    channels: []
  };

  topChannels = [
    "UCq-Fj5jknLsUf-MWSy4_brA",
    "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
    "UC295-Dw_tDNtZXFeAPAW6Aw",
    "UCbCmjCuTUZos6Inko4u57UQ",
    "UCpEhnqL0y41EpW2TvWAHD7Q",
    "UCffDXn7ycAzwL2LDlbyWOTw",
    "UCJ5v_MCY6GNUBTO8-D3XoAg",
    "UCIwFjwMjI0y7PDBVEO9-bkQ",
    "UCRijo3ddMTht_IHyNSNXpNQ",
    "UCYWOjHweP2V-8kGKmmAmQJQ"
  ];

  async componentDidMount() {
    const channels = await this.getChannels();
    await sleep(2000);
    this.setState({ channels });
  }

  async getChannels() {
    var _channels = [];
    await Promise.all(
      this.topChannels.map(async topId => {
        const { data: channels } = await http.get(
          constructEndpoint("id", topId)
        );
        const channel = channels.items[0];
        const subsCount = _.parseInt(channel.statistics.subscriberCount);
        const mapped = {
          _id: topId,
          name: channel.snippet.title,
          imageUrl: channel.snippet.thumbnails.default.url,
          subsCount: subsCount
        };
        _channels.push(mapped);
      })
    );

    _channels = _.orderBy(_channels, ["subsCount"], ["desc"]);
    return _channels;
  }

  display(channels) {
    return (
      <React.Fragment>
        <h1 className="cover-heading">Top Youtube Channels</h1>
        {channels.length > 0 ? <Table channels={channels} /> : <Spinner />}
      </React.Fragment>
    );
  }

  render() {
    const { channels } = this.state;
    return this.display(channels);
  }
}

export default Home;
