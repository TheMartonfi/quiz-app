const allPublicQuizzes = function(db){
  return db.query(`
  SELECT title, category, description, COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating
  FROM quizzes
  JOIN results ON quizzes.id = results.quiz_id
  WHERE NOT is_unlisted
  GROUP BY title, category, description;`)
  .then(res => res.rows);
}

module.exports = allPublicQuizzes;