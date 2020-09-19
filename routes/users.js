const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db, body) => {

  // Change this to a post request to insert new quiz
  router.get("/:id/quiz/new", (req, res) => {
    queries.insertNewQuiz(db, req.body)
    .then((quizzes) => {
      console.log(quizzes)
      res.render("make-quiz", {quizzes});
    });
  });

  // This route brings you to the all quizzes page and allows you to delete quizzes
  router.get("/:id/quiz", (req, res) => {
    queries.getAllUsersQuizzes(db, {id: req.params.id})
    .then((quizzes) => {
      console.log(quizzes)
      res.render("delete-quiz", {quizzes});
    });
  });

  // Change this to a post request to delete
  router.get("/:id/quiz/:id2/delete", (req, res) => {
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

  // We need a new GET route to show to make-quiz page

  return router;
};
