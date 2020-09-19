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

app.get("/", (req, res) => {
  // Pass in db info as templatevars
  queries.getAllPublicQuizzes(db)
  .then((quizzes) => {
    res.render("make-quiz-questions", {quizzes});
  });
});
app.get("/login/:user", (req, res) => {
  // Pass in db info as templatevars
  req.session.user = req.params.user;
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
