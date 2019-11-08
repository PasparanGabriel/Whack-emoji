var gameOver
var interval
var randomNumber
var score

function start() {
  interval = setInterval(faceJump, 1000)
  gameOver = false
  score = 0

  $('.result').html('Your Score: 0')
  $(".start").attr("hidden", true)
  $("li").click(faceClick)
}

function faceJump() {
  $('li').removeClass('emoji')
  
  randomNumber = Math.floor(Math.random() * 9)
  $('li').eq(randomNumber).addClass('emoji')
}

function faceClick() {
  if ($(this).hasClass('emoji') && !gameOver) {
    score++
    $('.result').html('Your Score: ' + score)
  }
  else {
    gameOver = true
  }

  if (gameOver) {
    $('.result').html('Game Over<br>' + 'Your Score: ' + score)
    $('li').click(false)
    $(".start").removeAttr("hidden")

    clearInterval(interval)
  }
}
