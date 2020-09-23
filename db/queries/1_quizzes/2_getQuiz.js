//Returns a quiz object
const getQuiz = function(db, options){
  return db.query(`
  SELECT quizzes.id, title, category, description, time_limit, COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating, quizzes.image
  FROM quizzes
  FULL OUTER JOIN results ON quizzes.id = results.quiz_id
  WHERE quizzes.id = ${options.id}
  GROUP BY quizzes.id, title, category, description;`)
  .then(res => res.rows[0]);
}
module.exports = getQuiz;
