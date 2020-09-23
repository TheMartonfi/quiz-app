//Returns a quiz object
const getQuestions = function(db, options){
  return db.query(`
  SELECT question, answer_1, answer_2, answer_3, answer_correct, questions_and_answers.image, audio, video
  FROM questions_and_answers
  JOIN quizzes ON questions_and_answers.quiz_id = quizzes.id
  WHERE quizzes.id = ${options.id};`)
  .then(res => res.rows);
}
module.exports = getQuestions;