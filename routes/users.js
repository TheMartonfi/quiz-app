const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');
const chalk = require('chalk');

module.exports = (db, body) => {
  // This route POSTs a new quiz to the database
  router.post("/:id/quiz/new", (req, res) => {
    if(req.body.is_unlisted){
      req.body.is_unlisted = true;
    } else {
      req.body.is_unlisted = false;
    }

    if (req.body.time_limit === "") {
      req.body.time_limit = "00:00:00"
    }

    if (req.body.title.length > 17) {
      console.log(chalk.red("\nTitle too long!\n"));
      return res.redirect(`/users/${req.params.id}/quiz/new`);
    }

    if (req.body.category === "") {
      console.log(chalk.red("\nPlease pick a category!\n"));
      return res.redirect(`/users/${req.params.id}/quiz/new`);
    }

    queries.insertNewQuiz(db, req.body, req.session.user)
    .then((quizzes) => {
      res.redirect(`/users/${req.session.user}/quiz/${quizzes.id}/question`);
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
    if(userId === req.params.id){
      queries.getAllUsersQuizzes(db, {id: req.params.id})
      .then((quizzes) => {
        res.render("delete-quiz", {quizzes, userId});
      });
    } else {
      queries.getAllUsersQuizzes(db, {id: req.params.id})
      .then((quizzes) => {
        res.render("delete-quiz", {quizzes, userId: req.params.id});
      });
    }
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

  // This route DELETEs a question from the database
  router.post("/:id/quiz/:id2/delete/:id3", (req, res) => {
    if(req.session.user === req.params.id){
      queries.deleteQuestion(db, {id: req.params.id3})
      .then((quizzes) => {
        res.send('dead')
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
      queries.getQuizAverageTimes(db)
      .then((averageTimes) => {
        queries.getAverageScore(db)
        .then((averageScores) => {
          console.log(averageScores)
          results.forEach(result => {
            averageScores.forEach((score) => {
              if(result.quiz_id === score.quiz_id){
                result.average_score = score.avg;
              }
            })
          });
          res.render("results", {results, averageTimes, userId});
        });
      });
    });
  });

  return router;
};
