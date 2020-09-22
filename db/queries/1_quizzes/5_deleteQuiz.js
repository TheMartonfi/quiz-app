//Deletes specific quiz
const deleteQuiz = function(db, options){
  return db.query(`
  DELETE FROM quizzes WHERE id = $1`, [options.quiz_id])
  .then(res => res.rows);
}
exports.deleteQuiz = deleteQuiz;