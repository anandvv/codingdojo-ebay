$(document).ready(function(){


  $('#submit').on('click', function(){
    var make = $('#make').val();
    var model = $('#model').val();
    var year = $('#year').val();

    if(make == '' || model == '' || year == ''){
      alert('Please enter all data fields!');
    } else {
      alert(`Make: ${make}\nModel: ${model}\nYear: ${year}`)
    }
  });
})
