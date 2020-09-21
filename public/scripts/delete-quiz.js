$(() => {

  $("form").submit(function(event) {
    event.preventDefault();

    const deleteURL = $(this).children().attr("id");
    const $quizContainer = $(this).parent();

    $.post(deleteURL)
      .then(() => {
        $quizContainer.remove();
      });
  });

});
