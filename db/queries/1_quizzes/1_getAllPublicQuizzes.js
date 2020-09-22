//Returns an array of quizzes
const getAllPublicQuizzes = function(db){
  return db.query(`
  SELECT quizzes.id, title, category, description, COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating
  FROM quizzes
  FULL OUTER JOIN results ON quizzes.id = results.quiz_id
  WHERE NOT is_unlisted = true
  GROUP BY quizzes.id, title, category, description;`)
  .then(res => res.rows);
}
exports.getAllPublicQuizzes = getAllPublicQuizzes;