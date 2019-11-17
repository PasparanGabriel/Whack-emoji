let audioWin, audioGameOver, gameOver, score, timer, timerEmoji

window.onload = function() {
  audioWin = new Audio('audio/win.mp3')
  audioGameOver = new Audio('audio/gameOver.mp3')
}

function start() {
  gameOver = false
  minutes = 2
  seconds = 0
  score = 0

  timerEmoji = setInterval(faceJump, 1200)
  timer = setInterval(timerOn, 1000)

  $('.gameOver').css('display', 'none')
  $('.item').unbind('click').click(faceClick)
  $('.score').html(score)
  $('.start').attr('disabled', 'disabled')
  $('.timerGame').css('display', 'block')
  $('.timerOn').css('color', '#FFFFFF')
  $('.timerOn').html(
    (minutes < 10 ? '0' + minutes : minutes)
    + ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  )
}

function faceJump() {
  $('.item').removeClass('emoji').removeAttr('style')
  $('.item').eq(randomNumber(9)).addClass('emoji').css('border', '0')
}

function faceClick() {
  if ($(this).hasClass('emoji') && !gameOver) {
    audioWin.play()
    score++
    $('.score').html(score)
    $('.item').removeClass('emoji').removeAttr('style')
  }
  else {
    gameOver = true
  }
}

function randomNumber(number) {
  return Math.floor(Math.random() * number)
}

function timerOn() {
  if (gameOver) {
    audioGameOver.play()

    clearInterval(timerEmoji)
    clearInterval(timer)

    $('.gameOver').css('display', 'block')
    $('.item').click(false)
    $('.start').removeAttr('disabled')
    $('.timerGame').css('display', 'none')
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
        $('.timerOn').css('color', '#FF0000')
      }
    }
  
    $('.timerOn').html(
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }
}
