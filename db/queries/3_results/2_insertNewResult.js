//Inserts and returns one new question object
const insertNewResult = function(db, options){
  return db.query(`
  INSERT INTO results (quiz_id, user_id, result, quiz_rating)
  VALUES ($1, $2, $3, $4)
  RETURNING *`,
  [options.quiz_id, options.user_id, options.result, options.quiz_rating,])
  .then(res => res.rows[0]);
}
exports.insertNewResult = insertNewResult;