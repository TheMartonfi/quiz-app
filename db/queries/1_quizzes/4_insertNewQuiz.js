//Inserts and returns one new quiz object
const insertNewQuiz = function(db, options, id){
  if(options.is_unlisted !== true){
    options.is_unlisted = false;
  }
  return db.query(`
  INSERT INTO quizzes (owner_id, title, category, description, time_limit, is_unlisted, image)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`,
  [id, options.title, options.category, options.description, options.time_limit, options.is_unlisted, options.image])
  .then(res => res.rows[0]);
}
module.exports = insertNewQuiz;
