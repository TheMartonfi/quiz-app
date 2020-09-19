const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  router.get("/:id/result/:id", (req, res) => {
    // Render ejs file
      // Pass in db info via queries
  });

  return router;
};
