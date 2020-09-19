//Returns an array of quizzes
const allPublicQuizzes = function(db){
  return db.query(`
  SELECT title, category, description, COUNT(results.*) as times_played, AVG(quiz_rating) as average_rating
  FROM quizzes
  JOIN results ON quizzes.id = results.quiz_id
  WHERE NOT is_unlisted
  GROUP BY title, category, description;`)
  .then(res => res.rows);
}
exports.allPublicQuizzes = allPublicQuizzes;

//Returns an array of results
const quizResults = function(db, options){
  let queryString = `
  SELECT result, time_spent, quiz_rating, title, category, description
  FROM results
  JOIN quizzes ON quiz_id = quizzes.id`;
  const queryOptions = []

  if(options.quiz_id){
    queryString += `
    AND quiz_id = $1`;
    queryOptions.push(options.quiz_id);
  } else {
    if(options.title){
      queryOptions.push(`%${options.title}%`);
      queryString += `
      AND quizzes.title LIKE $${queryOptions.length}`;
    }
    if(options.category){
      queryOptions.push(`${options.category}`);
      queryString += `
      AND category = $${queryOptions.length}`;
    }
  }

  return db.query(queryString, queryOptions)
  .then(res => res.rows);
}
exports.quizResults = quizResults;

//Inserts and returns one new quiz
const insertNewQuiz = function(db, options){
  return db.query(`
  INSERT INTO quizzes (owner_id, title, category, description, is_unlisted)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`,
  [options.owner_id, options.title, options.category, options.description, options.is_unlisted])
  .then(res => res.rows[0])
}
exports.insertNewQuiz = insertNewQuiz;

//Inserts and returns one new question
const insertNewQuestion = function(db, options){
  return db.query(`
  INSERT INTO questions_and_answers (quiz_id, question, answer_1, answer_2, answer_3, answer_correct)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`,
  [options.quiz_id, options.question, options.answer_1, options.answer_2, options.answer_3, options.answer_correct])
  .then(res => res.rows[0])
}
exports.insertNewQuestion = insertNewQuestion;