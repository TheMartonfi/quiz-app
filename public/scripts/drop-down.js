$(function() {
  let shrunk = 1
  $('#drop-down').on('click', function(){
    if(shrunk === 0){
      $("#shrunk").attr('id', 'drop-down-list')
      shrunk = 1;
    } else {    
      $("#drop-down-list").attr('id', 'shrunk')
      shrunk = 0;
    }
  })
});