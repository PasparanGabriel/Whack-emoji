let audioClose, audioCountDown, audioGameOver, audioID, audioLife, audioWin,
  gameOver, gameOverID, itemCN, life, lifeID, position, score, scoreID,
  speakerID, startID, timer, timerEmoji, timerOnID

window.onload = function() {
  audioClose = false

  audioCountDown = document.getElementById('audioCountDown')
  audioGameOver = document.getElementById('audioGameOver')
  audioLife = document.getElementById('audioLife')
  audioWin = document.getElementById('audioWin')

  audioID = document.getElementById('audio')
  gameOverID = document.getElementById('gameOver')
  itemCN = document.getElementsByClassName('item')
  lifeID = document.getElementById('life')
  scoreID = document.getElementById('score')
  startID = document.getElementById('start')
  timerGameID = document.getElementById('timerGame')
  timerOnID = document.getElementById('timerOn')
  speakerID = document.getElementById('speaker')

  position = 0
}

function start() {
  gameOver = false
  life = 3
  minutes = 2
  seconds = 0
  score = 0

  timerEmoji = setInterval(faceJump, 1000)
  timer = setInterval(timerOn, 1000)
  
  gameOverID.removeAttribute('style')
  itemCN[position].classList.remove('emoji')
  itemCN[position].removeAttribute('style')
  addOnClick(itemCN, faceClick)
  lifeID.innerHTML = ('&#10084;&#10084;&#10084;')
  lifeID.removeAttribute('style')
  scoreID.innerHTML = score
  startID.disabled = true
  timerGameID.removeAttribute('style')
  timerOnID.style.color = '#FFFFFF'
  timerOnID.innerHTML = (
    (minutes < 10 ? '0' + minutes : minutes)
    + ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  )
}

function addOnClick(obj, func) {
  for (var i = 0; i < obj.length; i++)
    obj[i].addEventListener('click', func)
}

function audio() {
  if (audioClose) {
    audioClose = false
    audioID.id = 'audio'
    speakerID.setAttribute('src', 'img/speakerOn.png')
  } else {
    audioClose = true
    audioID.id = 'audioDisabled'
    speakerID.setAttribute('src', 'img/speakerOff.png')
  }
}

function faceJump() {
  itemCN[position].classList.remove('emoji')
  itemCN[position].removeAttribute('style')
  itemCN[randomNumber(9)].classList.add('emoji')
  itemCN[position].style.border = 0
}

function faceClick() {
  if (this.classList.contains('emoji') && !gameOver) {
    if (!audioClose) {
      audioWin.play()
    }
    
    score++
    scoreID.innerHTML = score
    itemCN[position].classList.remove('emoji')
    itemCN[position].removeAttribute('style')
  }
  else if (life > 0 && !gameOver) {
    life--

    if (!audioClose) {
      audioLife.play()
    }
  
    switch(life) {
      case 2:
        lifeID.innerHTML = ('&#10084;&#10084;&#128148;')
        break;
      case 1:
        lifeID.innerHTML = ('&#10084;&#128148;&#128148;')
        break;
      case 0:
        lifeID.innerHTML = ('&#128148;&#128148;&#128148;')
        gameOver = true
        break;
      default:
        console.log('Error')
    }
  } else {
    gameOver = true
    life--
  }
}

function randomNumber(number) {
  position = Math.floor(Math.random() * number)
  return position
}

function timerOn() {
  if (gameOver) {
    if (!audioClose) {
      audioGameOver.play()
    }

    clearInterval(timerEmoji)
    clearInterval(timer)

    gameOverID.style.display = 'block'    
    startID.disabled = false
    timerGameID.style.display = 'none'
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
        timerOnID.style.color = '#FF0000'
        if (seconds === 3 && !audioClose) {
          audioCountDown.play()
        }
      }
    }

    timerOnID.innerHTML = (
      (minutes < 10 ? '0' + minutes : minutes)
      + ':' +
      (seconds < 10 ? '0' + seconds : seconds)
    )
  }
}
