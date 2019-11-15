var audioWin
var audioGameOver
var gameOver
var interval
var randomNumber
var score
var timer

function start() {
  audioWin = new Audio('audio/win.mp3')
  audioGameOver = new Audio('audio/gameOver.mp3')
  interval = setInterval(faceJump, 1200)
  gameOver = false
  minutes = 2
  seconds = 0
  score = 0
  timer = setInterval(timerOn, 1000)

  $('.gameOver').css('visibility', 'visible')
  $('.gameOver').html(
    (minutes < 10 ? '0' + minutes : minutes)
    + ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  )
  $('.item').click(faceClick)
  $('.result').html('Your Score: 0')
  $('.start').attr('disabled', 'disabled')
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
  }
}

function timerOn() {
  if (gameOver) {
    audioGameOver.play()

    clearInterval(interval)
    clearInterval(timer)

    $('.gameOver').css('color', 'white')
    $('.gameOver').html('Game Over')
    $('.item').click(false)
    $('.start').removeAttr('disabled')
  } else {
    if (seconds === 0) {
      if (minutes === 0) {
        gameOver = true
      } else {
        minutes--
        seconds = 59
      }
    } else {
      seconds--

      if (minutes === 0 && seconds < 4) {
        $('.gameOver').css('color', 'red')
      }
    }
  
    $('.gameOver').html(
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
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
