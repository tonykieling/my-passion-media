import React from "react";
import "../style/home.css";

const Home = () => {
  return (
    <div className="home-settings">
      <h1> Hello Mr. Dumpty</h1>
      <h2> Welcome and enjoy the system </h2>
      <h2>In the bar above you can reach and work on the folowing features:</h2>
      <ul>
        <li><h2><a href = "/addProduct">Add a new product</a></h2></li>
        <li><h2><a href = "/listProducts">List, Edit and Delete a product</a></h2></li>
      </ul>
    </div>
  );
};

export default Home;