import React from "react";
import "odometer/odometer.js";
import "odometer/themes/odometer-theme-default.css";

const Odometer = ({ subsCount }) => {
  const odometerStyles = { fontSize: "70px", textAlign: "center" };
  const hideStyle = { visibility: "hidden" };
  const styles =
    subsCount > 0 ? odometerStyles : { ...odometerStyles, ...hideStyle };

  return (
    <p style={styles} className="odometer">
      {subsCount}
    </p>
  );
};

export default Odometer;
