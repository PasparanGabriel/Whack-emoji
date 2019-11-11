var audioWin
var audioGameOver
var gameOver
var interval
var randomNumber
var score

function start() {
  audioWin = new Audio('audio/win.mp3')
  audioGameOver = new Audio('audio/gameOver.mp3')
  interval = setInterval(faceJump, 1200)
  gameOver = false
  score = 0

  $('.result').html('Your Score: 0')
  $('.gameOver').css('visibility', 'hidden')
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
    $('.item').removeClass('emoji')
    audioWin.play()
  }
  else {
    gameOver = true
    audioGameOver.play()
  }

  if (gameOver) {
    $('.gameOver').css('visibility', 'visible')
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