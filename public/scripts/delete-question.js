$(() => {

  $(".delete").submit(function(event) {
    event.preventDefault();

    const deleteURL = $(this).children().attr("id");
    const $delete = $(this).parent();

    $.post(deleteURL)
      .then(() => {
        $delete.remove();
      });
  });

});
