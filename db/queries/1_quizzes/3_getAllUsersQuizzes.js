const getAllUsersQuizzes = function(db, options){
  return db.query(`
  SELECT quizzes.id, title, category, description, image, users.username as username,COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating, time_limit
  FROM quizzes
  JOIN users ON quizzes.owner_id = users.id
  JOIN results ON quizzes.id = results.quiz_id
  WHERE owner_id = $1
  GROUP BY quizzes.id, title, category, description, users.username;`, [options.id])
  .then(res => res.rows);
}
module.exports = getAllUsersQuizzes;