const express = require('express');
const router  = express.Router();
const queries = require('../db/queries');

module.exports = (db) => {

  // Takes you to individual quiz result
  router.get("/result/:id", (req, res) => {
    const user_id = req.session.user;

    queries.getQuizResult(db, {user_id: user_id, id: req.params.id})
    .then((result) => {
      queries.getQuiz(db, {id: result.quiz_id})
      .then((quiz) => {
        queries.getQuizAverageTime(db, {quiz_id: quiz.id})
        .then((averageTime) => {
          queries.getQuizResults(db, {quiz_id: quiz.id})
          .then((results) => {
            const averageArr = []
            results.forEach(element => {
              if(element.result.length === 2){
                averageArr.push(Number(element.result[0]))
              } else {
                averageArr.push(Number(element.result[0] + element.result[1]))
              }
            });
            let average_score = 0;
            averageArr.forEach((element) => {
              average_score += element;
            })
            average_score /= averageArr.length;
            average_score = Math.round(average_score * 10) / 10

            res.render("result", {quiz, result, averageTime, user_id, average_score});
          })
        });
      });
    });
  });

  // Takes you to new quiz page
  router.get("/new", (req, res) => {
    const user_id = req.session.user;
    res.render("make-quiz", {user_id});
  });


  // This route POSTs a new quiz to the database
  router.post("/new", (req, res) => {
    const user_id = req.session.user;

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
      return res.redirect(`/new`);
    }

    if (req.body.category === "") {
      console.log(chalk.red("\nPlease pick a category!\n"));
      return res.redirect(`/new`);
    }

    queries.insertNewQuiz(db, req.body, user_id)
    .then((quizzes) => {
      res.redirect(`/quiz/new/${quizzes.id}/question`);
    });
  });

  // This route brings you to the new question page
  router.get("/new/:id/question", (req, res) => {
    const user_id = req.session.user;
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id})
      .then((questions) => {
        res.render("make-quiz-questions", {questions, quiz, quiz_id: req.params.id, user_id});
      })
    })
  });

  // This route DELETEs a quiz from the database
  router.post("/:id/delete", (req, res) => {
    const user_id = req.session.user;
    const quiz_id = req.params.id;

    queries.getQuiz(db, {id: quiz_id})
    .then((quiz) => {
      if (user_id == quiz.owner_id) {
      queries.deleteQuiz(db, {quiz_id})
      .then((quiz) => {
        res.redirect("/users/quizzes");
        });
      } else {
        res.redirect("/");
      }
    });
  });

  // Takes you to specific quiz
  router.get("/:id", (req, res) => {
    const user_id = req.session.user;
    queries.getQuiz(db, {id: req.params.id})
    .then((quiz) => {
      queries.getQuestions(db, {id: req.params.id})
      .then((questions) => {
        res.render("take-quiz", {quiz, questions, user_id});
      });
    });
  });

  // This route POSTs a new question to a quiz
  router.post("/new/:id/question", (req, res) => {
    queries.insertNewQuestion(db, req.body)
    .then((question) => {
      res.send(question)
    })
  });

  // Posts new result to database
  router.post("/result/new", (req, res) => {
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
    const options = {user_id, quiz_rating: req.body.quiz_rating, quiz_id: req.body.quiz_id, result: score, time_spent: req.body.time_spent};

    queries.insertNewResult(db, options)
    .then((result) => {
      res.redirect(`/quiz/result/${result.id}`);
    })
  });

  // This route DELETEs a question from the database
  router.post("/delete/question/:id", (req, res) => {
    const user_id = req.session.user;

    queries.getQuizWithQuestion(db, {question_id: req.params.id})
    .then((quiz) => {
      if(user_id == quiz.owner_id){
        queries.deleteQuestion(db, {id: req.params.id})
        .then((quizzes) => {
          res.send('dead')
        });
      } else {
        res.redirect('/');
      }
    });
  });

  return router;
};
