$(() => {

  $(".delete-question").submit(function(event) {
    event.preventDefault();
    $('body').prepend(`<div id="share-card">
    <img src='https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif'/>
    </div>`);
    const deleteURL = $(this).children().attr("id");
    console.log(deleteURL)
    const $delete = $(this).parent();

    $.post(deleteURL)
      .then(() => {
        $delete.remove();
        $('#share-card').remove();
      });
  });

});
