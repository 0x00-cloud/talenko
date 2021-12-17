// Application requirements
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
// Database connection
const url = "mongodb://localhost:27017/pizza";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected...");
});

// session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create(connection),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

// Assests
//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(expressLayout);
app.use(express.static("public"));
app.use(express.json());

const viewsPath = path.join(__dirname, "/resources/views");
app.set("views", viewsPath);
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

// load routes
require("./src/routes/web")(app);

//Error handling

// firing up server

app.listen(PORT, () => {
  console.log(`listenong to server in ${PORT}`);
});
