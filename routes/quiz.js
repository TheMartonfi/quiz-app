const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db) => {

  // Takes you to specific quiz
  router.get("/:id", (req, res) => {
    const userId = req.session.user;
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id})
      .then((questions) => {
        res.render("take-quiz", {quiz, questions, userId});
      });
    });
  });

  // Takes you to individual quiz result
  router.get("/:id/result/:id2", (req, res) => {
    const userId = req.session.user;
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuizResult(db, {user_id: req.params.id, quiz_id: req.params.id2})
      .then((result) => {
        res.render("result", {quiz, result, userId});
      });
    });
  });

  // We need a POST route to insert results

  return router;
};
