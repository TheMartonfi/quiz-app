const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/quiz/new", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });

  router.get("/:id/quiz", (req, res) => {
    // Some code here
  });

  router.get("/:id/quiz/:id/delete", (req, res) => {
  // Some code here
  });

  return router;
};
