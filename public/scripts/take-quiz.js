$(function() {
  let rating = 0;

  let answers = document.getElementsByClassName('answer-container');

  let answered = 0;

  $("h4 > input:checkbox").on('click', function() {
    $(this).parent().parent().children().children().prop("checked", false);
    $(this).prop("checked", true);
  });

  $("h4").on('click', function() {
    let unAnswered = true
    for(let i = 0; i < 4; i++){
      if($(this).parent().children().children()[i].checked === true){
        unAnswered = false
      }
    }
    if(unAnswered === true){
      answered++;
    }
    $(this).parent().children().children().prop("checked", false);
    $(this).children().prop("checked", true);
  });

  $(".star").on('click', function() {
    const starSelectedVal = $(this).attr("val");
    const $stars = $(this).parent().children();

    rating = starSelectedVal;
    $('#rating').val(rating);
    $stars.attr('class', 'star');

    $stars.each((star) => {
      if (star <= starSelectedVal - 1) {
        $(`[val=${star + 1}]`).attr('class', 'rated');
      }
    });
  });

  let $timer = $('#timer');
  const timer = new Timer();
  timer.start();
  timer.addEventListener('secondsUpdated', function(e) {
    const currentTime = timer.getTimeValues().toString();
    const timeLimit = $('input[name=time_limit]').val();
    const dateTimeCurrent = new Date('1970-01-01T' + currentTime + 'Z');
    const dateTimeLimit = new Date('1970-01-01T' + timeLimit + 'Z');
    const currentTimeInSeconds = Date.parse(dateTimeCurrent) / 1000;
    const timeLimitInSeconds = Date.parse(dateTimeLimit) / 1000;
    const timeRemaining = timeLimitInSeconds - currentTimeInSeconds;
    let secondsRemaining = timeRemaining % 60;
    let minutesRemaining = Math.floor(timeRemaining / 60) % 60;
    let hoursRemaining = Math.floor(timeRemaining / 3600);

    if (secondsRemaining < 10) {
      secondsRemaining = '0' + secondsRemaining;
    }

    if (minutesRemaining < 10) {
    minutesRemaining = '0' + minutesRemaining;
    }

    if (hoursRemaining < 10) {
      hoursRemaining = '0' + hoursRemaining;
    }

    if (timeLimit === "00:00:00") {
      $timer.html(currentTime);
    } else {
      $timer.html(`${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`);
    }

    if (timeRemaining <= 30 && Math.sign(timeRemaining) === 1) {
      $timer.attr("id", "red-timer");
      $timer = $('#red-timer');
    }

    if (currentTime === timeLimit) {
      $('#finish-quiz').trigger('click');
    }

  });

  $('#finish-quiz').click(function () {
    console.log(answers, answered)
    if(answered === answers.length){
      $('input[name=time_spent]').val(timer.getTimeValues().toString());
    } else {
      alert('Finish the questions first');
    }
  });

});
