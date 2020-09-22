// Gets results for individual quiz
const getQuizResult = function(db, options){
  return db.query(`
  SELECT * FROM results
  WHERE user_id = $1
  AND quiz_id = $2;`, [options.user_id, options.quiz_id])
  .then(res => res.rows[0]);
}
module.exports = getQuizResult;