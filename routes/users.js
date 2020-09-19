const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db) => {
  router.get("/:id/quiz/new", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  router.get("/:id/quiz", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
    queries.getAllUsersQuizzes(db, {id: req.params.id})
    .then((quizzes) => {
      console.log(quizzes)
      res.render("index", {quizzes});
    });
  });

  router.get("/:id/quiz/:id2/delete", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
    queries.deleteQuiz(db, {quiz_id: req.params.id2})
    .then((quizzes) => {
      res.redirect('/');
    });
  });

  return router;
};
