import React from "react";
import NumberFormat from "react-number-format";
import Tooltip from "react-tooltips";
import ChannelDetails from "./channelDetails";
import _ from "lodash";

const Body = ({ channels }) => {
  return (
    <tbody>
      {channels.map(channel => (
        <tr key={channel.query}>
          <td className="py-1">{getRank(channels, channel)}</td>

          <td className="py-1">
            <Tooltip
              content="This is the tooltip content"
              component={<ChannelDetails channel={channel} />}
              event="hover"
              placement="right"
              eventDelay={0}
            >
              {channel.name}
            </Tooltip>
          </td>

          <td className="py-1">
            <NumberFormat
              value={channel.subsCount}
              displayType={"text"}
              thousandSeparator={true}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Body;

function getRank(channels, channel) {
  return _.indexOf(channels, channel) + 1;
}
