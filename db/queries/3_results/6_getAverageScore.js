// Gets average score for individual result
const getQuizAverageTime = function(db) {
  return db.query(`SELECT AVG(CAST(REPLACE(result, '%', '') AS INT)), quiz_id FROM results GROUP BY quiz_id`)
  .then(res => res.rows);
}
module.exports = getQuizAverageTime;
