$(function() {
  $("#new-quiz-questions-container").on('submit', function(event){
    event.preventDefault();
    $('body').prepend(`<div id="share-card">
    <img src='https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif'/>
    </div>`);
    $.ajax(window.location.href, { method: 'POST', data: $(this).serialize()})
    .then((data) =>  {
      let $newQuestion = $("<div class = 'quiz-question'></div>");
      let $delete = $(`<form class='delete-question'>
      <button type="submit" class="btn btn-outline-danger" id="/users/<%= user_id %>/quiz/<%= quiz.id %>/delete/<%= question.id %>"><i class="fas fa-trash-alt"></i></button>
    </form>`)
      let $question = $(`<h4>${data.question}</h4>`);
      let $answer1 = $(`<p>${data.answer_1}</p>`);
      let $answer2 = $(`<p>${data.answer_2}</p>`);
      let $answer3 = $(`<p>${data.answer_3}</p>`);
      let $answer_correct = $(`<p>${data.answer_correct}</p>`);

      $newQuestion.append($question);
      $newQuestion.append($answer_correct);
      $newQuestion.append($answer1);
      $newQuestion.append($answer2);
      $newQuestion.append($answer3);
      $newQuestion.append($delete);

      $("#question-container").append($newQuestion);
      $("#question-container").scrollTop(Infinity);
      $('#share-card').remove();
    })
  });

  $("#question-input-container").children("button").click(function () {
    const qId = $("#qId").val();

    setTimeout(() => {
      $(this).parent().children('input').val('');
      $("#media-input-container").children('input').val('');
      $("#qId").val(qId);
    }, 0);
  });
});
