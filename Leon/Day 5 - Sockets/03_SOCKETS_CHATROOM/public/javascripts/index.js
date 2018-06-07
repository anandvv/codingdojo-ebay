$(document).ready(function(){

  $('#btn1').on('click', function(){
    $.get('/ninja1', function(data){
      location.reload();
    })
  })

  $('#btn2').on('click', function(){
    $.get('ninja2', function(data){
      location.reload();
    })
  })
})
