const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/quiz/new", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  router.get("/:id/quiz", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  router.get("/:id/quiz/:id/delete", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  return router;
};
