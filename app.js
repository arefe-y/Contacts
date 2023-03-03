const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./config/db");

//Load Config
dotEnv.config({ path: "./config/config.env" });

//Database Connection
connectDB();

//Passport Configuration
require("./config/passport");

const app = express();

//View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");

//Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI})
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//Static Folders
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/users", require("./routes/users"));
app.use("/dashboard", require("./routes/dashboard"));

//404
app.use(require("./controllers/errorControllers").get404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server in running... on port : ${PORT}`));
