// Gets average completeion time for individual quiz
const getQuizAverageTime = function(db, options){
  return db.query(`
  SELECT AVG(time_spent) AS average_time FROM results
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE quiz_id = $1;`, [options.quiz_id])
  .then(res => res.rows[0]);
}
module.exports = getQuizAverageTime;
