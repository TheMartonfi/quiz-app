require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const queries    = require('./db/queries')

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'cookieSession',
  keys: ['random'],
}));

const usersRoutes = require("./routes/users");
const quizRoutes = require("./routes/quiz");

app.use("/users", usersRoutes(db));
app.use("/quiz", quizRoutes(db));

// Home page
app.get("/", (req, res) => {
  const user_id = req.session.user;
  queries.getAllPublicQuizzes(db)
  .then((quizzes) => {
    res.render("home", {quizzes, user_id});
  });
});

// Search Page
app.post("/search", (req, res) => {
  const user_id = req.session.user;
  queries.searchQuizzes(db, {search: req.body.search})
  .then((quizzes) => {
    console.log(quizzes)
    res.render("search", {quizzes, user_id, query: req.body.search});
  });
});

// Hacker login route
app.get("/login/:user", (req, res) => {
  req.session.user = req.params.user;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
