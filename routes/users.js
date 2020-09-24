const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');
const chalk = require('chalk');
const { use } = require('chai');

module.exports = (db, body) => {

  // This route brings you to the all quizzes page and allows you to delete quizzes
  router.get("/quizzes", (req, res) => {
    const user_id = req.session.user;

    //user auth
    if (user_id) {
      queries.getAllUsersQuizzes(db, {id: user_id})
      .then((quizzes) => {
        res.render("delete-quiz", {quizzes, user_id});
      });
    } else {
      res.redirect("/");
    }
  });

  // Takes you to all results page
  router.get("/results", (req, res) => {
    const user_id = req.session.user;

    queries.getQuizResults(db, {user_id})
    .then((results) => {
      queries.getQuizAverageTimes(db)
      .then((averageTimes) => {
        queries.getAverageScore(db)
        .then((averageScores) => {
          results.forEach(result => {
            averageScores.forEach((score) => {
              if(result.quiz_id === score.quiz_id){
                result.average_score = score.avg;
              }
            })
          });
          res.render("results", {results, averageTimes, user_id});
        });
      });
    });
  });

  return router;
};
