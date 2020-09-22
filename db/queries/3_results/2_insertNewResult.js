//Inserts and returns one new question object
const insertNewResult = function(db, options){
  return db.query(`
  INSERT INTO results (quiz_id, user_id, result, quiz_rating, time_spent)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`,
  [options.quiz_id, options.user_id, options.result, options.quiz_rating, options.time_spent])
  .then(res => res.rows[0]);
}
module.exports = insertNewResult;
