// import React from "react";
import { Link } from "react-router-dom";
import "../style/header.css";

const Header = () => {
  return (
    <div className="topnav">
      {/* <a href="/">Home</a>
      <a href="addProduct">Add Product</a>
      <a href="listProducts">List Products</a> */}
      <Link to = "/">Home</Link>
      <Link to = "addProduct">Add Product</Link>
      <Link to = "listProducts">List Products</Link>
    </div>
  );
};

export default Header;