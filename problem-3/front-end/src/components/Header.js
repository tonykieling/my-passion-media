import React from "react";
import "../style/header.css";

const Header = () => {
  return (
    <div className="topnav">
      <a href="/">Home</a>
      <a href="addProduct">Add Product</a>
      <a href="listProducts">List Products</a>
    </div>
  );
};

export default Header;