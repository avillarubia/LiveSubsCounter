import React from "react";

const Search = ({ onKeyPress, error }) => {
  //my-3

  return (
    <div className="common-component">
      <input
        style={{ backgroundColor: "#333", color: "#fff" }}
        type="text"
        name="query"
        className="input-sm justify-content-center form-control col-md-4"
        placeholder="Enter youtube channel name or id..."
        onKeyPress={e => onKeyPress(e)}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Search;
