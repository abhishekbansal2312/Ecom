const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = 3000;
let app = express();

app.set("views", "views");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const username = "admin123";
const password = "admin123";
const dbName = "Ecommerce";

const dbURL = `mongodb+srv://${username}:${password}@cluster0.ngppk.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
// Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



// Import routes
const productRoutes = require("./routes/products");




// Use routes
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
