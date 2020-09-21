const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db, body) => {

  // Change this to a post request to insert new quiz
  router.post("/:id/quiz/new", (req, res) => {
    queries.insertNewQuiz(db, req.body, req.session.user)
    .then((quizzes) => {
      console.log(quizzes)
      // res.render("make-quiz", {quizzes});
      res.redirect(`/users/${req.session.user}/quiz/${quizzes.id}/question`)
    });
  });

  // This route bring you to the new quiz page
  router.get("/:id/quiz/new", (req, res) => {
    res.render("make-quiz");
  });

  // This route brings you to the new question page
  router.get("/:id/quiz/:id2/question", (req, res) => {
    queries.getQuiz(db, {id: req.params.id2})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id2})
      .then((questions) => {
        res.render("make-quiz-questions", {questions, quiz, quiz_id: req.params.id2});
      })
    })
  });

  // This route POSTs a new question to a quiz
  router.post("/:id/quiz/:id2/question", (req, res) => {
    queries.insertNewQuestion(db, req.body)
    .then((question) => {
      console.log(question);
      res.redirect(`/users/${req.session.user}/quiz/${req.body.quiz_id}/question`)
    })
  });

  // This route brings you to the all quizzes page and allows you to delete quizzes
  router.get("/:id/quiz", (req, res) => {
    queries.getAllUsersQuizzes(db, {id: req.params.id})
    .then((quizzes) => {
      console.log(quizzes);
      res.render("delete-quiz", {quizzes});
    });
  });

  // Change this to a post request to delete
  router.post("/:id/quiz/:id2/delete", (req, res) => {
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

  router.get("/:id/results", (req, res) => {
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuizResults(db, {id: req.params.id2})
      .then((results) => {
        console.log(results);
        res.render("results", {results});
      });
    });
  });

  return router;
};
