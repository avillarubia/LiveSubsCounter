import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col" />
            <th scope="col">Channel</th>
            <th scope="col">Subscribers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Home;
