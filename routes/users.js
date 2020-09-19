const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db, body) => {
  router.get("/:id/quiz/new", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
    queries.insertNewQuiz(db, req.body)
    .then((quizzes) => {
      console.log(quizzes)
      res.render("index", {quizzes});
    });
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
    if(req.session.user === req.params.id){
      queries.deleteQuiz(db, {quiz_id: req.params.id2})
      .then((quizzes) => {
        console.log('Another one bites the dust...')
        res.redirect('/');
      });
    } else {
      console.log('fail')
      res.redirect('/');
    }
  });

  return router;
};
