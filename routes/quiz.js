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
    queries.getQuiz(db, {id: req.params.id2})
    .then((quiz) => {
      queries.getQuizResult(db, {user_id: req.params.id, quiz_id: req.params.id2})
      .then((result) => {
        res.render("result", {quiz, result, userId});
      });
    });
  });

  router.post("/result/new", (req, res) => {
    console.log(req.body)
    let correct = 0;
    if(req.body['1']){
      correct = req.body['1'].length;
    }
    let total = 0;
    let score = 0;
    if(req.body['0']){
      total = req.body['0'].length + correct;
      score = `${Math.round((correct / total) * 100)}%`;
    } else {
      score = '100%'
    }

    const user_id = req.session.user || null;
    const options = {user_id, quiz_rating: req.body.quiz_rating, quiz_id: req.body.quiz_id, result: score};
    queries.insertNewResult(db, options)
    .then((result) => {
      res.redirect(`/quiz/${user_id}/result/${req.body.quiz_id}`);
    })
  });


  return router;
};
