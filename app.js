//  Defining Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const background = new Image();
background.src = './img/scareBackground.jpg';
const avatar = new Image();
avatar.src = '../img/potter.png';
const thugs = new Image();
thugs.src = '../img/eyeHanging.png';
const ghost = new Image();
ghost.src = '../img/ghost.png';
const malo = new Image();
malo.src = '../img/malo.png';
const boom = new Image();
boom.src = '../img/fire.png';
const scaryAudio = new Audio('../audio/evilLaugh.mp3');
const piupiu = new Audio('../audio/gunshot.mp3');
const explosion = new Audio('../audio/explosion.mp3');
const ouch = new Audio('../audio/ouch.mp3');
const gameOver = new Audio('../audio/gameOver.mp3');
const gameSong = new Audio('../audio/gameSong.mp3');
let id = null;

// Class players
class Character {
  constructor(img, x, y, w, h, score, lives) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.score = 0;
    this.lives = 3
  }
  drawAvatar = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

// Creating players
let player1 = new Character(avatar, canvas.width / -100, canvas.height / 2 + 200, 50, 50);

// Function Score
function drawScore(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '20px Play';
  ctx.fillText(text, x, y);

}

// Functions Lives
function drawLives(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '20px Play';
  ctx.fillText(text, x, y);
}

// Function Reset
function reset() {
  player1.x = canvas.width / -100;
  player1.y = canvas.height / 2 + 200;

  killer.x = canvas.width - 100;
  killer.y = canvas.height / 2 + 150;
}

// Creating bullets
let bullets = [];

// Class Bullets
class Bullets {
  constructor(img, x, y, w, h) {
    this.img = img
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawBullet = () => {
    ctx.drawImage(this.img, this.x++, this.y, this.w, this.h);
    this.x += 5
  }
}

// Enemies Class
class Enemies {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  drawEnemy = () => {
    ctx.drawImage(this.img, this.x--, this.y, this.w, this.h);
  }
  checkCollision = () => {
    if (player1.x < this.x + this.w &&
      player1.x + player1.w > this.x &&
      player1.y < this.y + this.h &&
      player1.y + player1.h > this.y) {
        player1.lives--
        ouch.play()
        reset()
    }
    if (player1.score === 25) {
      // youWin();
      window.cancelAnimationFrame(id)
      alert('YOU WIN 👻')
      location.reload()
    }
    if (player1.lives === 0) {
      // location.reload()
      window.cancelAnimationFrame(id);
      gameOver.play();
      setInterval(() => {
        died();
      }, 1000);
    }
    for (let bullet of bullets) {
      if (bullet.x < this.x + this.w &&
        bullet.x + bullet.w > this.x &&
        bullet.y < this.y + this.h &&
        bullet.y + bullet.h > this.y) {
        killers.splice(killers.indexOf(this), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        explosion.play();
        player1.score++;
      }
    }
  }
}

// Creating multiple enemies
let killers = [new Enemies(thugs, canvas.width - 100, canvas.height / 2 + 150, 50, 50),
  new Enemies(thugs, canvas.width - 100, canvas.height / 2 + 150, 100, 100),
  new Enemies(ghost, canvas.width - 400, canvas.height / 2 + 290, 150, 150),
  new Enemies(malo, canvas.width - 200, canvas.height / 2 + 30, 100, 100)
];

// Creating interval to add new enemies
let randomKillers = () => Math.floor(Math.random() * canvas.width);
let randomGhosts = () => Math.floor(Math.random() * canvas.height);

function startGame() {
  setInterval(function () {
    killers.push(new Enemies(thugs, randomKillers() - 130, randomGhosts() / 2, 50, 50),
      new Enemies(ghost, randomKillers() - 100, randomGhosts(), 75, 75),
      new Enemies(malo, randomKillers() - 100, randomGhosts(), 100, 100))
  }, 4000);
}

// Control player
window.onkeydown = function (e) {
  // console.log(e.key);
  switch (e.key) {
    case "w":
      player1.y -= 20;
      break;
    case "s":
      player1.y += 20;
      break;
    case "a":
      player1.x -= 20;
      break;
    case "d":
      player1.x += 20;
      break;
    case "ArrowUp":
      player1.y -= 20;
      break;
    case "ArrowDown":
      player1.y += 20;
      break;
    case "ArrowLeft":
      player1.x -= 20;
      break;
    case "ArrowRight":
      player1.x += 20;
      break;
    case " ":
      // console.log(player1)
      bullets.push(new Bullets(boom, player1.x + player1.w / 2, player1.y + player1.h / 2, 15, 15));
      piupiu.play()
      break;
  }
};

// Background image looping variable
let x = 0

// Game Init
function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let w = x--; w < canvas.width; w += background.width) {
    for (let h = 0; h < canvas.height; h += background.height) {
      ctx.drawImage(background, w, h);
    }
  }
  player1.drawAvatar()
  for (killer of killers) {
    killer.drawEnemy();
    killer.checkCollision();
  }
  for (bullet of bullets) {
    bullet.drawBullet();
  }
  drawScore("Score: " + player1.score, canvas.width / 15, canvas.height / 14, 'white');
  drawLives("Lives: " + player1.lives, canvas.width - 150, canvas.height / 14, 'white');
}

// Landing Page Event Listeners
const btn = document.querySelector('.btn');
btn.addEventListener('click', onClick);

function onClick() {
  // console.log('clicked')
  document.querySelector('.game').style.display = 'block';
  document.querySelector('.container').style.display = 'none';
  document.querySelector('h1').style.fontSize = '2rem';
  animate();
  startGame();
  gameSong.play();
}

// Landing page Audio
const landingPage = document.querySelector('body');
landingPage.addEventListener('onload', booAudio);

function booAudio() {
  scaryAudio.play();
}

// Function Win
// function youWin() {
//   document.querySelector('.win').style.display = 'block';
//   document.querySelector('.game').style.display = 'none';
//   document.querySelector('h1').style.fontSize = '2rem';
// }

// Function Died
function died() {
  document.querySelector('.game-over').style.display = 'block';
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.reset').style.display = 'block';
}

// API Giphy
window.addEventListener('load', giphy);

function giphy() {
  axios.get('https://api.giphy.com/v1/gifs/random?api_key=xBjE8MsbO6fIB901FFH6j8eZ2ZnjGuZi&tag=scared scary horror thirlled&rating=g').then((res) => {
    // console.log(res.data.data)
    const data = res.data.data;
    const randomGif = Math.floor(Math.random() * data.length);
    document.querySelector('.gif').innerHTML += `<iframe src="${data.embed_url}" width="480" height="201" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/wilderpeople-hunt-for-the-wilderpeople-orchard-julian-dennison-l0HlRU3kWnmqbbuuI"></a></p>`
  })
}

// Play again function
document.querySelector('.reset').addEventListener('click', playAgain)

function playAgain() {
  location.reload()
}