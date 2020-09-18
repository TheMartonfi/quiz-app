## User stories
* As a user I can view public quizzes because you want to play some quizzes
* As a user I can attempt a quiz because I want to test my knowledge
* As a user I can share quizzes because I want to share it with friends
* As a user I can share my results because I want to compare with my friends
* As a logged in user you can create and manage quizzes because I want to test other peoples knowledge

## Routes
* GET home - All public quizzes
* GET users/:id/quiz - A list of quiz they've made
* GET quiz/:id - A quiz
* GET quiz/:id/result/:id - Quiz result
* POST users/:id/quiz/new - Make new quiz
* DELETE users/:id/quiz/:id/delete - Delete quiz

## Minimum Viable Demo
* A home page with a list of quizzes
* You can take a quiz
* You get results from quizzes
* You can make quizzes

## FrontEnd Mockups
* Home page
* Quiz Page
* New quiz page
* Results

## WorkFlow
* Carl: Front End
* Jayden: Databases
* Pair Programming: Back End

  ### Github Project
    * Front End Mockups
    * Create schemas and seeds for database
    * Set up routes using project-blueprint
    * Set up HTML/SCSS using Front End mockups
      * Home Page
      * Take Quiz
      * Results
      * Make Quiz
    * Set up queries from database to render to routes
      * Query for all public quiz 

  ### Database
    ElephantSQL

  ### Schedule
    * 9:30AM - 7:30PM / 9:30PM Morning meeting (Pick a To Do and get working)
    * Every 3 hours we can check in
    * Once we have MVD we take a bit of time off

