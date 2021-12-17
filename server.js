// Application requirements
const express = require("express");
const app = express();
const path = require("path");
const expressLayout = require("express-ejs-layouts");
app.use(express.static("public"));
const viewsPath = path.join(__dirname, "/resources/views");
app.use(expressLayout);
app.set("views", viewsPath);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
// load routes

// Configurations
const PORT = process.env.PORT || 3000;
// Connection to databases

//add routes

//Error handling

// firing up server

app.listen(PORT, () => {
  console.log(`listenong to server in ${PORT}`);
});
