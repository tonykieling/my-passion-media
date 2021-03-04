const express     = require("express");
const PORT        = process.env.PORT || 3333;
const app         = express();
const bodyParser  = require("body-parser");

// settings for local/dev environment
// const cors = require('cors'); // when running in diff servers, dev env
// app.use(cors());

const productsRoutes = require("./server/routes/product.js");

app.use(express.static('public'));


// settings related to boy-parser, which allows extended urlencoder and enables to receive json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// it checks JSON malformatted messages
app.use((err, req, res, next) => {
  if (err) {
    return res.status(409).json({
      error: err.message
    });
  }
  else
    next()
});


// calls the route regarding contact, which allows add or get contacts
app.use("/product", productsRoutes);


// it deliveres front-end files to the client/browser
app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, './public', 'index.html'))
});


app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
