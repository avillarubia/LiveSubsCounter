import React from "react";
import Header from "./tableHeader";
import Body from "./tableBody";

const Table = ({ channels }) => {
  return (
    //was className=table-dark
    <div className="row justify-content-center">
      <table className="table" style={{ maxWidth: "600px" }}>
        <Header />
        <Body channels={channels} />
      </table>
    </div>
  );
};

export default Table;
