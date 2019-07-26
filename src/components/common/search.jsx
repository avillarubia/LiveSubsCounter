import React from "react";

const Search = ({ onKeyPress, error }) => {
  //my-3

  return (
    <React.Fragment>
      <div className="common-component">
        <input
          style={{ backgroundColor: "#333", color: "#fff" }}
          type="text"
          name="query"
          className="input-sm justify-content-center form-control col-md-4"
          placeholder="Enter youtube channel name or id..."
          onKeyPress={e => onKeyPress(e)}
        />
      </div>
      {error && <small>{error}</small>}
    </React.Fragment>
  );
};

export default Search;
