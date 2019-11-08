var score = 0;
var randomNumber;
var gameOver = false;

var interval = setInterval(faceJump, 1000);

$("li").click(faceClick);

function faceJump() {
  $('li').removeClass('emoji');
  
  randomNumber = Math.floor(Math.random() * 9);
  $('li').eq(randomNumber).addClass('emoji');
}

function faceClick() {
  if ($(this).hasClass('emoji') && !gameOver) {
    score++;
    $('#result').html('Your Score: ' + score);
  }
  else {  
    clearInterval(interval);
    gameOver = true;
  }

  if (gameOver) {
    $('#result').html('Game Over<br>' + 'Your Score: ' + score);   
    $('li').click(false);
  }
}
