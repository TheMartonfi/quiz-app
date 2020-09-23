//Inserts and returns one new question object
const insertNewQuestion = function(db, options){
  return db.query(`
  INSERT INTO questions_and_answers (quiz_id, question, answer_1, answer_2, answer_3, answer_correct, image)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`,
  [options.quiz_id, options.question, options.answer_1, options.answer_2, options.answer_3, options.answer_correct, options.image])
  .then(res => res.rows[0]);
}
module.exports = insertNewQuestion;