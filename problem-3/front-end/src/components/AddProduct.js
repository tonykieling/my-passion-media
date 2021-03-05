import React, { useState, useRef } from "react";
import "../style/add-product.css";
import axios from "axios";

const initialState = {
  name: "",
  weight: "",
  dimensions: {
    height: "",
    width: "",
    depth: ""
  }
};

const butonLabel = "Save Product";
const originalButonColorClass = "bt-style-green";

const AddProduct = () => {
  const [product, setState] = useState(initialState);
  const refName   = useRef(null);

  const handleChangeData = event => {
    const { name, value } = event.target;

    setState(prevState => ({ 
      ...prevState, 
      [name]: value
    }));

    setBtLabel(butonLabel);
    setBtColor(originalButonColorClass);
  };

  // disable form controller
  const [disableFormController, setDisableForm] = useState(false);

  const disableFormFunction = (newState = false) => {
    setDisableForm(newState);
  }


  const [ btLabel, setBtLabel ] = useState(butonLabel);
  const [ btColor, setBtColor ] = useState(originalButonColorClass);

  const saveProduct = async(event) => {
    event.preventDefault();
    console.log("tetttt", product)

    if (!name) {
      setBtLabel("Please, fill name");
      setBtColor("bt-style-yellow");
    } else {

      const url = "/product";
      const data = { name, weight };
      
      try {
        const record = await axios.post( 
          url,
          data,
          {  
            headers: { 
              "Content-Type": "application/json"
            }
        });

        disableFormFunction(true);
        
        if (record.data.message)
          setBtLabel(butonLabel);
          //after receiving success from axios:
          // change button, disable form and after a while defined in delayChangeButtonLabel, clear the form and focus in Name again
        else setBtLabel("Try again, please");
        
        } catch (error) {
          console.log("### error post", error);
        }

        disableFormFunction();
        refName.current.focus();
    }
  }

  return (
    <div className="main">
      <h2 className = "main-title"> Add Product page</h2>

      <form>
        <div>
          <span className = "label-form"> Name </span> 
          <input 
            autoFocus = { true }
            required
            id        = "name"
            className = "text-form" 
            type      = "text"
            name      = "name"
            value     = { name }
            onChange  = { handleChangeData }
            ref       = { refName }
            disabled  = { disableFormController }
          ></input>
        </div>

        <div>
          <span className = "label-form"> Weight </span>
          <input 
            id          = "weight"
            className   = "text-form" 
            type        = "text"
            name        = "weight"
            value       = { weight }
            onChange    = { handleChangeData}
            disabled    = { disableFormController }
          ></input>
        </div>


      <p className = "label-form"> Dimensions </p>

        <div className = "dimensions">
          <span className = "dimensions-title"> Height </span>
          <input 
            id          = "height"
            type        = "text"
            className   = "dimensions-fields" 
            name        = "height"
            value       = { height }
            onChange    = { handleChangeData}
            disabled    = { disableFormController }>
          </input>
        </div>

        <div className   = "dimensions" >
          <span className = "dimensions-title"> Width </span>
          <input 
            id          = "width"
            type        = "text"
            className   = "dimensions-fields" 
            name        = "width"
            value       = { width }
            onChange    = { handleChangeData}
            disabled    = { disableFormController }>
          </input>
        </div>

        <div className = "dimensions">
          <span className   = "dimensions-title" > Depth </span>
          <input 
            id          = "depth"
            type        = "text"
            className   = "dimensions-fields" 
            name        = "depth"
            value       = { depth }
            onChange    = { handleChangeData}
            disabled    = { disableFormController }>
          </input>
        </div>

        <div style = {{textAlign: "center"}}>
          <button
            type = "submit"
            className = { btColor }
            onClick = { saveProduct }
            // style     = { btColor }
          > { btLabel }
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;