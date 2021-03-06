import React, { 
  useState, 
  useEffect } from "react";

import axios from "axios";
import "../style/list-products.css";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


const url = "/product";
const noData = <tr><td colSpan="7" style = {{textAlign: "center"}}>No products right now.</td></tr>

const AddProduct = () => {

  const [products, setProducts] = useState("");

  const [dataTable, setDataTable] = useState("");

  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchData = async() => {
  
      try {
        const getData = await axios.get( 
          url,
          {  
            headers: { 
              "Content-Type": "application/json"
            }
        });

        if (getData.data.content)
          setProducts(getData.data.content);
        
        } catch (error) {
          console.log("### error post", error);
        }
    }

    fetchData();
  }, []);


  useEffect(() => {
    console.log("product effect", products);
    products && setDataTable(renderDataTable(products));
  }, [products]);


  const updateProducts = productRemoved => {
    console.log("products before removeing", products)
    const newTable = products.filter(e => e._id !== productRemoved);
    console.log("newTable", newTable);
    return(newTable);
  }


  const deleteProduct = async(product) => {
    console.log("product", product)
    const wannaDelete = window.confirm(`Are you sure you want to delete ${product.name}?`);
    if (wannaDelete === true) {
      console.log("delete confirmed")

      const data = { productId: product._id };
      console.log("data", data)
      try {
        const deleteProduct = await axios.delete( 
          url,
          {  
            headers: { 
              "Content-Type": "application/json"
            },
            data
        });
        console.log("deleteProduct", deleteProduct);
        if (deleteProduct.data.success) {
          setMessage(`Product "${product.name}" has been deleted successfully!`);
          //////////////////////////////
          // update the table
          const newProducts = updateProducts(product._id);
          setProducts(newProducts);

        } else setMessage(deleteProduct.data.error);

        setTimeout(() => {
          setMessage("");
        }, 2500);
        
        } catch (error) {
          console.log("### error post", error);
        }
    }

  };


  const editProduct = product => {
    console.log("edit", product);
  }


  const renderDataTable = products => {
    console.log("rendering data", products);
    return products.map((product, index) => {
      const { _id, name, weight, height, width, depth } = product;

      return (
        <tr key = { _id }>
          <td className = "set-center" onClick = {() => editProduct(product)}>{ index + 1 }</td>
          <td className = "set-left" onClick = {() => editProduct(product)}>{ name}</td>
          <td className = "set-center" onClick = {() => editProduct(product)}>{ weight}</td>
          <td className = "set-center" onClick = {() => editProduct(product)}>{ height}</td>
          <td className = "set-center" onClick = {() => editProduct(product)}>{ width}</td>
          <td className = "set-center" onClick = {() => editProduct(product)}>{ depth}</td>

          <td className = "icons" onClick = {() => editProduct(product)}>
            <FaEdit color = "green" />
          </td>
          <td className = "icons" onClick = { () => deleteProduct(product)}>
            <FaTrash color = "darkred" />
          </td>
        </tr>
      )
    })
  }


  return (
    <div className="main">
      <h2 className = "main-title"> List Products page</h2>

      <div className = "message">
          <p> { message }</p>
      </div>

      <table>
        <thead id = "color-head">
          <tr style={{align:"center"}} >
            <th rowSpan="2" className = "num-head"> #</th>
            <th rowSpan="2" className = "name-head" >Name</th>
            <th rowSpan="2" className = "others-head" >Weight (Kg)</th>
            <th rowSpan="1" colSpan="3">Dimensions (cm)</th>
            <th rowSpan="2" colSpan="2">Actions</th>
          </tr>
          <tr>
            <th className = "others-head">Height</th>
            <th className = "others-head">Width</th>
            <th className = "others-head">Depth</th>
          </tr>
        </thead>
        <tbody>
          { ( dataTable && dataTable.length ) ? dataTable : noData}
        </tbody>
      </table>
      { console.log("products", products)}
      { console.log("datatable", dataTable)}
    </div>
  );
};

export default AddProduct;