var gameOver
var interval
var randomNumber
var score

function start() {
  interval = setInterval(faceJump, 1000)
  gameOver = false
  score = 0

  $('.result').html('Your Score: 0')
  $('.start').attr('disabled', 'disabled')
  $('.item').click(faceClick)
}

function faceJump() {
  $('.item').removeClass('emoji')
  
  randomNumber = Math.floor(Math.random() * 9)
  $('.item').eq(randomNumber).addClass('emoji')
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
    $('.item').click(false)
    $('.start').removeAttr('disabled')

    clearInterval(interval)
  }
}

$(document).ready(function() {
  $('.item').click(function() {
    var intervalCursor = setInterval(() => {
      $(this).css('cursor', 'url(img/cursor.cur), auto')
      clearInterval(intervalCursor)
    }, 1000)

    $(this).css('cursor', 'url(img/cursorClick.cur), auto')
  })
})