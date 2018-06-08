var Game = function DotGame(options){
    var board = document.getElementById(options.boardId);
    var rangeInput = document.getElementById(options.rangeInputId);
    var scoreBoard = document.getElementById(options.scoreId);
    var boardWidth = board.clientWidth;
    var boardHeight = board.clientHeight;
    var dotCount = 0;
    var timerId = null;
    var speed = 10;
    //var color;
     
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function createDot(){
      // get Random number for diameter of the dot range from 10px to 100px
      var diameter = getRandomInt(20,200);
      
      // get Random number for the horizontal position(left)
      var position = getRandomInt(0,Math.floor(boardWidth/diameter)-1);
      
      // find the exact left for dot
      var left = position * diameter;
      
      // Total height to travel
      var distanceToTravel = boardHeight-diameter;
      
      //total time taken to travel distanceToTravel
      var totalTimeInMillSec = distanceToTravel/speed;
      
      var colorArrPosition = getRandomInt(0,this.colorArr.length-1);

      var dot = document.createElement('div');
      var currentColor = this.colorArr[colorArrPosition];
      dot.style.backgroundColor = currentColor;
      dot.style.width = diameter+'px';
      dot.style.height = diameter+'px';
      dot.style.left = left +'px';
      dot.style.zIndex = dotCount;
      dot.setAttribute('dia',diameter);
      dot.setAttribute('color',currentColor);
      dot.id = 'dot'+dotCount;
      dot.className = 'dot';
      board.appendChild(dot);
      
      var player = dot.animate([
        {transform: 'translateY(0)'},
        {transform: 'translateY('+distanceToTravel+'px)'}
      ], totalTimeInMillSec*1000);
      
      player.addEventListener('finish', function() {
        board.removeChild(dot);
      });
      
      dotCount++;
      clearTimeout(timerId);
      timerId = setTimeout(function(){
           createDot();
       },1000);
    }
    
    function hasClass(element,className){
      if(!element || !element.className){
         return false;
      }
      return element.className.indexOf(className) !== -1;
    }
    
    function attachEvents() {
      rangeInput.addEventListener('change',function(){
          speed = rangeInput.value;
      });
      window.onload = function(){
         createDot();
      };
      board.addEventListener('click',function(e){
         var dot = e.srcEleemnt || e.target;
         if(hasClass(dot,'dot')){
              var colorFromDot = dot.getAttribute('color');
              if(window.color == colorFromDot){
                    var dia = parseInt(dot.getAttribute('dia'));
                    var score = Math.floor((200-dia)/2) +1;
                    scoreBoard.innerHTML = parseInt(scoreBoard.innerHTML)+score;
                    board.removeChild(dot);
              }
         }
      });
    }

    function initValues(gameOptions){
        this.color = gameOptions.color;
        this.gameId = gameOptions.color;
        this.colorArr = gameOptions.colorArr.split(',');
    }
    
    function startGame(gameOptions){
      initValues(gameOptions);
      attachEvents();
    }
    return {
      startGame:startGame
    }
  }({boardId:'board',rangeInputId:'speedRange',scoreId:'score'});