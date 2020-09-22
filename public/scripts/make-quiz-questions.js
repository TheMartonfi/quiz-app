$(function() {
  $("form").on('submit', function(event){
    event.preventDefault();
    $('body').prepend(`<div id="share-card">
    <img src='https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif'/>
    </div>`);
    $.ajax(window.location.href, { method: 'POST', data: $(this).serialize()})
    .then((data) =>  {
      let $newQuestion = $("<div class = 'quiz-question'></div>");
      let $question = $(`<h4>${data.question}</h4>`);
      let $answer = $(`<p>${data.answer_correct}</p>`);

      $newQuestion.append($question);
      $newQuestion.append($answer);

      $("#question-container").append($newQuestion);
      $("#question-container").scrollTop(10000000000);
      $(this).children().val('')
      $("#qId").val('<%=quiz_id%>')
      $('#share-card').remove();
    })
  })
});