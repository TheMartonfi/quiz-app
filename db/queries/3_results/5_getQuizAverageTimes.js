// Gets average completeion time for individual quiz
const getQuizAverageTime = function(db) {
  return db.query(`
  SELECT quizzes.id, AVG(time_spent) AS average_time FROM results
  JOIN quizzes ON quiz_id = quizzes.id
  GROUP BY quizzes.id
  HAVING AVG(time_spent) IS NOT NULL;`)
  .then(res => res.rows);
}
module.exports = getQuizAverageTime;
