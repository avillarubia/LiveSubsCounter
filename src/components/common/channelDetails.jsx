import React from "react";
import NumberFormat from "react-number-format";

const ChannelDetails = ({ channel }) => {
  return (
    <React.Fragment>
      <div id="tooltip">
        <table>
          <tbody>
            <tr>
              <td>
                <img src={channel.imageUrl} alt={channel.imageUrl} />
              </td>
            </tr>
            <tr>
              <td>
                <h4>{channel.name}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h5>
                  <NumberFormat
                    value={channel.subsCount}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default ChannelDetails;
