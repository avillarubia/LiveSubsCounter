import React from "react";
import Header from "./tableHeader";
import Body from "./tableBody";

const Table = ({ channels }) => {
  return (
    //was className=table-dark
    <table className="table" style={{ maxWidth: "500px" }}>
      <Header />
      <Body channels={channels} />
    </table>
  );
};

export default Table;
