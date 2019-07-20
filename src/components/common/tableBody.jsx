import React from "react";
import _ from "lodash";
import NumberFormat from "react-number-format";
import Tooltip from "react-tooltips";

const Body = ({ channels }) => {
  return (
    <tbody>
      {channels.map(channel => (
        <tr key={channel._id}>
          <td className="py-1">{getRank(channels, channel)}</td>
          {/* <Tooltip
            content="This is the tooltip content"
            event="hover"
            placement="right"
            eventDelay={0}
          > */}
          <td className="py-1">{channel.name}</td>
          {/* </Tooltip> */}

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
