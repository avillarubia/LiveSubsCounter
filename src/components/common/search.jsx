import React from "react";

const Search = ({ onKeyPress }) => {
  //my-3
  return (
    <div className="common-component">
      <input
        style={{ backgroundColor: "#333", color: "#fff" }}
        type="text"
        name="query"
        className="input-sm justify-content-center form-control col-md-4"
        placeholder="Enter channel name..."
        onKeyPress={e => onKeyPress(e)}
      />
    </div>
  );
};

export default Search;
