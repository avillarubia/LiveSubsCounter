import React from "react";

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
