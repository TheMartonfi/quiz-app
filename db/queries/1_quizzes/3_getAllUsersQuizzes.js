const getAllUsersQuizzes = function(db, options){
  return db.query(`
  SELECT quizzes.id, title, category, description
  FROM quizzes
  JOIN users ON quizzes.owner_id = users.id
  WHERE owner_id = $1
  GROUP BY quizzes.id, title, category, description;`, [options.id])
  .then(res => res.rows);
}
module.exports = getAllUsersQuizzes;