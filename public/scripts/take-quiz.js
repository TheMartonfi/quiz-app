$(function() {
  let rating = 0;

  $("h4 > input:checkbox").on('click', function() {
    $(this).parent().parent().children().children().prop("checked", false);
    $(this).prop("checked", true);
  });

  $("h4").on('click', function() {
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

  var timer = new Timer();
  timer.start();
  timer.addEventListener('secondsUpdated', function(e) {
    const currentTime = timer.getTimeValues().toString();
    const timeLimit = $('input[name=time_limit]').val();

    $('#timer').html(currentTime);

    // If there's less than 30 seconds turn timer red
    const dateTimeCurrent = new Date('1970-01-01T' + currentTime + 'Z');
    const dateTimeLimit = new Date('1970-01-01T' + timeLimit + 'Z');

    console.log(Date.parse(dateTimeCurrent) / 1000);
    console.log(Date.parse(dateTimeLimit) / 1000);

    if (currentTime === timeLimit) {
      $('#finish-quiz').trigger('click');
    }
  });

  $('#finish-quiz').click(function () {
    $('input[name=time_spent]').val($('#timer').text())
  });

});
