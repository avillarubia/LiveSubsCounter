import React from "react";

const Odometer = ({ subsCount }) => {
  const odometerStyles = { fontSize: "70px", textAlign: "center" };
  // const hideStyle = { visibility: "hidden" };
  // const styles =
  //   subsCount > 0 ? odometerStyles : { ...odometerStyles, ...hideStyle };
  return (
    <React.Fragment>
      <p style={odometerStyles} className="odometer">
        {subsCount}
      </p>
    </React.Fragment>
  );
};

export default Odometer;
