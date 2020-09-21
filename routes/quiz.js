const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db) => {

  // Takes you to specific quiz
  router.get("/:id", (req, res) => {
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id})
      .then((questions) => {
        res.render("take-quiz", {quiz, questions});
      });
    });
  });

  // Takes you to individual quiz result
  router.get("/:id/result/:id2", (req, res) => {
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuizResult(db, {user_id: req.params.id, quiz_id: req.params.id2})
      .then((result) => {
        res.render("result", {quiz, result});
      });
    });
  });

  // We need a POST route to insert results

  return router;
};
