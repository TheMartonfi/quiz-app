function copy(){
  const copyText = document.getElementById("link-botw");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Copied the link: " + copyText.value);
  copyText.remove();
}

$(function() {
  $(".share-result").on('click', function(event){
    event.preventDefault();
    $('body').append(`<input id="link-botw" value='localhost:8080/quiz/result/${$(this).attr('reId')}'>`);
    copy();

  });
  $(".share-quiz").on('click', function(event){
    event.preventDefault();
    $('body').append(`<input id="link-botw" value='localhost:8080/quiz/${$(this).attr('quId')}'>`);
    copy();
  });
})
