//Returns an array of results
const getQuizResults = function(db, options){
  let queryString = `
  SELECT results.id, result, users.username AS username, time_spent, quiz_rating, title, category, description, quiz_id, user_id
  FROM results
  JOIN quizzes ON quiz_id = quizzes.id
  JOIN users ON user_id = users.id`;
  const queryOptions = [];

  if(options.quiz_id){
    queryString += `
    AND quiz_id = $1`;
    queryOptions.push(options.quiz_id);
  } else if(options.user_id){
    queryString += `
    AND users.id = $1`;
    queryOptions.push(options.user_id);
  } else if(options.id){
    queryString += `
    AND results.id = $1`;
    queryOptions.push(options.id);
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
module.exports = getQuizResults;