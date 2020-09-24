//Find quiz by question
const getQuizWithQuestion = function(db, options){
  return db.query(`
  SELECT * FROM questions_and_answers
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE questions_and_answers.id = $1;`, [options.question_id])
  .then(res => res.rows[0]);
}
module.exports = getQuizWithQuestion;
