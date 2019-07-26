import React from "react";

const Odometer = ({ subsCount }) => {
  var style = { fontSize: "70px", textAlign: "center" };

  return (
    <p style={style} id="odometer" className="odometer">
      {subsCount}
    </p>
  );
};

export default Odometer;
