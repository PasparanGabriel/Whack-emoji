let audioClose, audioCountDown, audioGameOver, audioLife, audioWin, gameOver, life, score, timer, timerEmoji

window.onload = function() {
  audioClose = false

  audioCountDown = new Audio('audio/countDown.mp3')
  audioGameOver = new Audio('audio/gameOver.mp3')
  audioLife = new Audio('audio/life.mp3')
  audioWin = new Audio('audio/win.mp3')
}

function start() {
  gameOver = false
  life = 3
  minutes = 2
  seconds = 0
  score = 0

  timerEmoji = setInterval(faceJump, 1200)
  timer = setInterval(timerOn, 1000)

  $('.gameOver').removeAttr('style')
  $('.item').unbind('click').click(faceClick)
  $('.life').html('&hearts;&hearts;&hearts;')
  $('.life').removeAttr('style')
  $('.score').html(score)
  $('.start').attr('disabled', 'disabled')
  $('.timerGame').removeAttr('style')
  $('.timerOn').css('color', '#FFFFFF')
  $('.timerOn').html(
    (minutes < 10 ? '0' + minutes : minutes)
    + ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  )
}

function audio() {
  if (audioClose) {
    audioClose = false
    $('.audio').removeClass('audioDisabled')
    $('#speaker').attr('src','img/speakerOn.png')
  } else {
    audioClose = true
    $('.audio').addClass('audioDisabled')
    $('#speaker').attr('src','img/speakerOff.png')
  }
}

function faceJump() {
  $('.item').removeClass('emoji').removeAttr('style')
  $('.item').eq(randomNumber(9)).addClass('emoji').css('border', '0')
}

function faceClick() {
  if ($(this).hasClass('emoji') && !gameOver) {
    if (!audioClose) {
      audioWin.play()
    }
    
    score++
    $('.score').html(score)
    $('.item').removeClass('emoji').removeAttr('style')
  }
  else if (life > 1) {
    life--

    if (!audioClose) {
      audioLife.play()
    }
  
    switch(life) {
      case 2:
        $('.life').html('&hearts;&hearts;')
        break;
      case 1:
        $('.life').html('&hearts;')
        break;
      default:
        console.log('Error')
    }
  } else {
    life--
    $('.life').css('visibility', 'hidden')
    gameOver = true
  }
}

function randomNumber(number) {
  return Math.floor(Math.random() * number)
}

function timerOn() {
  if (gameOver) {
    if (!audioClose) {
      audioGameOver.play()
    }

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
        audioCountDown.play()
      }
    }
  
    $('.timerOn').html(
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }
}
