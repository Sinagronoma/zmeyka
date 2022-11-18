const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/zmeyka.png";

const foodImg = new Image();
foodImg.src = "img/food1.png";

let box = 30;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 18 + 1)) * box,
  y: Math.floor((Math.random() * 18 + 1)) * box,
};
let snake = [];
snake[0] = {
  x:12 * box,
  y:12 * box
};


document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";  
}

function eatTail(head, arr) {
  for (let i =0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game);
  }
}




function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x , food.y );
  for (let i = 0; i < snake.length;i++) {
    ctx.fillStyle = i == 0 ? "green" : "orange";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Helvetica";
  ctx.fillText(score, box * 0.5, box * 1.5);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
     food = {
      x: Math.floor((Math.random() * 18 + 1)) * box,
      y: Math.floor((Math.random() * 18 + 1)) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 22
    || snakeY <  box || snakeY > box * 22)
    clearInterval(game);


  if (dir == "left") snakeX -= 15;
  if (dir == "right") snakeX += 15;
  if (dir == "up") snakeY -= 15;
  if (dir == "down") snakeY += 15;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);


  snake.unshift(newHead);
}

let game = setInterval(drawGame, 50);