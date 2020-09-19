const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id})
      .then((questions) => {
        
        res.render("index", {quiz, questions});
      });
    });
  });

  router.get("/:id/result/:id", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  return router;
};
