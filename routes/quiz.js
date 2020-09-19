const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    // Some code here
  });

  router.get("/:id/result/:id", (req, res) => {
    // Some code here
  });

  return router;
};
