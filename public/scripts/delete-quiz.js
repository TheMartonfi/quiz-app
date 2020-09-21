$(() => {

  $("form").submit(function(event) {
    event.preventDefault();

    const deleteURL = $(this).children().attr("id");
    $.post(deleteURL)
      .then(() => {
        console.log("success");
        // Remove deleted quiz

      });
  });

});
