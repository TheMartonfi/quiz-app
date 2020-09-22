const getAllPublicQuizzes = require('./queries/1_quizzes/1_getAllPublicQuizzes');
const getQuiz = require('./queries/1_quizzes/2_getQuiz');
const getAllUsersQuizzes = require('./queries/1_quizzes/3_getAllUsersQuizzes');
const insertNewQuiz = require('./queries/1_quizzes/4_insertNewQuiz');
const deleteQuiz = require('./queries/1_quizzes/5_deleteQuiz');

const insertNewQuestion = require('./queries/2_questions/1_insertNewQuestion');
const getQuestions = require('./queries/2_questions/2_getQuestions');

const getQuizResults = require('./queries/3_results/1_getQuizResults');
const insertNewResult = require('./queries/3_results/2_insertNewResult');
const getQuizResult = require('./queries/3_results/3_getQuizResult');
const getQuizAverageTime = require('./queries/3_results/4_getQuizAverageTime');

module.exports = {getAllPublicQuizzes, getQuiz, getAllUsersQuizzes, insertNewQuiz, deleteQuiz, insertNewQuestion, getQuestions, getQuizResults, insertNewResult, getQuizResult, getQuizAverageTime};
