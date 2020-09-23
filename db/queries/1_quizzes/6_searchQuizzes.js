//Returns an array of quizzes
const searchQuizzes = function(db, options){
  return db.query(`
  SELECT quizzes.id, title, category, description, COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating, image
  FROM quizzes
  FULL OUTER JOIN results ON quizzes.id = results.quiz_id
  WHERE NOT is_unlisted = true
  AND LOWER(title) LIKE $1 OR LOWER(title) LIKE $2 OR LOWER(title) LIKE $3
  GROUP BY quizzes.id, title, category, description;`, [`%${options.search.toLowerCase()}%`, `%${options.search.toLowerCase()}`, `${options.search.toLowerCase()}%`])
  .then(res => res.rows);
}
module.exports = searchQuizzes;