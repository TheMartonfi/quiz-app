//Deletes specific quiz
const deleteQuiz = function(db, options){
  return db.query(`
  DELETE FROM questions_and_answers WHERE id = $1`, [options.id])
  .then(res => res.rows);
}
module.exports = deleteQuiz;