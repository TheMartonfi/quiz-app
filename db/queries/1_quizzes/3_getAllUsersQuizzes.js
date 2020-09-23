const getAllUsersQuizzes = function(db, options){
  return db.query(`
  SELECT quizzes.id, title, category, description, image, users.username as username
  FROM quizzes
  JOIN users ON quizzes.owner_id = users.id
  WHERE owner_id = $1
  GROUP BY quizzes.id, title, category, description, users.username;`, [options.id])
  .then(res => res.rows);
}
module.exports = getAllUsersQuizzes;