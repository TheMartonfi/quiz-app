const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db, body) => {

  // This route POSTs a new quiz to the database
  router.post("/:id/quiz/new", (req, res) => {
    queries.insertNewQuiz(db, req.body, req.session.user)
    .then((quizzes) => {
      res.redirect(`/users/${req.session.user}/quiz/${quizzes.id}/question`)
    });
  });

  // This route bring you to the new quiz page
  router.get("/:id/quiz/new", (req, res) => {
    const userId = req.session.user;
    res.render("make-quiz", {userId});
  });

  // This route brings you to the new question page
  router.get("/:id/quiz/:id2/question", (req, res) => {
    const userId = req.session.user;
    queries.getQuiz(db, {id: req.params.id2})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id2})
      .then((questions) => {
        res.render("make-quiz-questions", {questions, quiz, quiz_id: req.params.id2, userId});
      })
    })
  });

  // This route POSTs a new question to a quiz
  router.post("/:id/quiz/:id2/question", (req, res) => {
    queries.insertNewQuestion(db, req.body)
    .then((question) => {
      res.send(question)
    })
  });

  // This route brings you to the all quizzes page and allows you to delete quizzes
  router.get("/:id/quiz", (req, res) => {
    const userId = req.session.user;
    queries.getAllUsersQuizzes(db, {id: req.params.id})
    .then((quizzes) => {
      res.render("delete-quiz", {quizzes, userId});
    });
  });

  // This route DELETEs a quiz from the database
  router.post("/:id/quiz/:id2/delete", (req, res) => {
    if(req.session.user === req.params.id){
      queries.deleteQuiz(db, {quiz_id: req.params.id2})
      .then((quizzes) => {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });

  // Takes you to all results page
  router.get("/:id/results", (req, res) => {
    const userId = req.session.user;
    queries.getQuizResults(db, {user_id: req.params.id})
    .then((results) => {
      res.render("results", {results, userId});
    });
  });

  return router;
};
