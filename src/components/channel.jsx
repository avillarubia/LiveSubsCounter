import React from "react";
import Odometer from "./common/odometer";

const Channel = props => {
  let { imageUrl, name, subsCount } = props;
  let textAlign = { textAlign: "center" }; //common

  return (
    <div className="common-component">
      <table>
        <tbody>
          <tr>
            <td>
              <center>
                <img src={imageUrl} alt={name} />
              </center>
            </td>
          </tr>
          <tr>
            <td>
              <h3 style={textAlign}>{name}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <Odometer subsCount={subsCount} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Channel;
