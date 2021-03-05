import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Header from "./components/Header.js";
import AddProduct from "./components/AddProduct.js";
import ListProducts from "./components/ListProducts.js";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path = "/addProduct">
          <AddProduct />
        </Route>

        <Route exact path = "/listProducts">
          <ListProducts />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
