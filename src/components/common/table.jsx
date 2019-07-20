import React from "react";
import Header from "./tableHeader";
import Body from "./tableBody";

const Table = ({ channels }) => {
  return (
    <table className="table table-dark">
      <Header />
      <Body channels={channels} />
    </table>
  );
};

export default Table;
