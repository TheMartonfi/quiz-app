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
    $('#timer').html(timer.getTimeValues().toString());
  });

  $('#finish-quiz').click(function () {
    $('input[name=time_spent]').val($('#timer').text())
  });

});
