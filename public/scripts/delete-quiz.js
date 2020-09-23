$(() => {

  $("form").submit(function(event) {
    event.preventDefault();

    const deleteURL = $(this).children().attr("id");
    const $delete = $(this).parent().parent();

    $.post(deleteURL)
      .then(() => {
        $delete.remove();
      });
  });

});
