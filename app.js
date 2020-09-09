//  Defining Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const background = new Image()
background.src = '/img/city_background_1024x512-.jpg'
const avatar = new Image()
avatar.src = '/img/superman.png'
const thugs = new Image()
thugs.src = '/img/eyeHanging.png'
const ghost = new Image()
ghost.src = '/img/ghost.png'
const boom = new Image()
boom.src = '/img/fire.png'
const scaryAudio = new Audio('/audio/evilLaugh.mp3')
let id = null;

// Class players
class Character {
  constructor(img, x, y, w, h) {
    this.img = img;
    this.x = x;
    this.y = y; 
    this.w = w;
    this.h = h;
  }
  drawAvatar = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

// Creating players
let player1 = new Character(avatar, canvas.width / - 100, canvas.height / 2 + 200, 50, 50)

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
    this.color = '#fff'
  }
  drawBullet = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.x++
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
    ctx.drawImage(this.img, this.x--, this.y, this.w, this.h)
  }
  checkCollision = () => {
    if (player1.x < this.x + this.w &&
      player1.x + player1.w > this.x &&
      player1.y < this.y + this.h &&
      player1.y + player1.h > this.y) {
      window.cancelAnimationFrame(id)
      alert('You fucking suck!')
      document.location.reload();
    }
    for (let bullet of bullets) {
      if (bullet.x < this.x + this.w &&
        bullet.x + bullet.w > this.x &&
        bullet.y < this.y + this.h &&
        bullet.y + bullet.h > this.y) {
        killers.splice(killers.indexOf(this), 1)
        bullets.splice(bullets.indexOf(bullet), 1)
      }
    }
  }
}

// Creating multiple enemies
let killers = [new Enemies(thugs, canvas.width - 100, canvas.height / 2 + 150, 50, 50),
  new Enemies(thugs, canvas.width - 100, canvas.height / 2 + 150, 100, 100),
  new Enemies(ghost, canvas.width - 400, canvas.height / 2 + 290, 150, 150),
  new Enemies(thugs, canvas.width - 200, canvas.height / 2 + 100, 50, 50)
]

// Creating interval to add new enemies
let randomKillers = () => Math.floor(Math.random() * canvas.width);

function startGame() {
  setInterval(function () {
    killers.push(new Enemies(ghost, randomKillers() + 100, randomKillers() + 150, 50, 50),
      new Enemies(ghost, randomKillers() + 100, randomKillers() + 250, 75, 75))
  }, 2000)
}

// Control player
window.onkeydown = function (e) {
  console.log(e.key);
  switch (e.key) {
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
      console.log(player1)
      bullets.push(new Bullets(boom, player1.x + player1.w / 2, player1.y + player1.h / 2, 15, 15))
      break;
  }
};

// Game Init
function animate() {
  id = window.requestAnimationFrame(animate);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  player1.drawAvatar()
  for (killer of killers) {
    killer.drawEnemy()
    killer.checkCollision()
  }
  for (bullet of bullets) {
    bullet.drawBullet();
  }
}

// Landing Page Event Listeners
const btn = document.querySelector('.btn');
btn.addEventListener('click', onClick);

function onClick() {
  // console.log('clicked')
  document.querySelector('.game').style.display = 'block'
  document.querySelector('.container').style.display = 'none'
  document.querySelector('h1').style.fontSize = '2rem'
  animate()
  startGame()
  //scaryAudio.play()
}

const landingPage = document.querySelector('body');
landingPage.addEventListener('onload', booAudio);

function booAudio() {
  scaryAudio.play()
}