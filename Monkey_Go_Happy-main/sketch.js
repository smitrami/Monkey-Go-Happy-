/*var backImage, back;
var player, player_running;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backImage = loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");

}

function setup() {
  createCanvas(1500, 700);

  back = createSprite(0, 0, 800, 400);
  back.addImage(backImage);
  back.scale = 1.5;
  back.x = back.width / 2;
  back.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(750, 350, 1500, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

}

function draw() {
  background(0);

  if (gameState === PLAY) {

    if (back.x < 100) {
      back.x = back.width / 2;
    }

    if (keyDown("space")) {
      player.velocityY = -10;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);

  }

  drawSprites();
}
*/
//create variable.
var score = 0;
var ground, ground_img;
var player, player_running;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var invisibleground;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var over;
function preload() {
  player_running = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/stone.png");
  ground_img = loadImage("images/jungle.jpg");
  over = loadImage("images/over.jpg");
}

function setup() {
  createCanvas(2000, 500);
  //create ground.
  ground = createSprite(800, 50, 2000, 400);
  ground.addImage("ground", ground_img);
  ground.scale = 1.5;
  //create monkey.
  player = createSprite(100, 340, 20, 50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  //create invisibleground.
  invisibleground = createSprite(0, 370, 1000, 8);
  invisibleground.velocityX = -3;
  invisibleground.visible = false;
  //create foodgr & obstaclegr.
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(255);
  if (gameState === PLAY) {
    ground.velocityX = -3;
    if (ground.x < 400) {
      ground.x = ground.width / 2;
    }

    if (invisibleground.x < 120) {
      invisibleground.x = invisibleground.width / 2;
    }

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += +0.1;
    }

    if (keyDown("space")) {
      player.velocityY = -10;
    }

    player.velocityY = player.velocityY + 0.8;
    bananas();
    obstacles();

    if (player.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }
  else if (gameState === END) {
    ground.velocityX = 0;
    ground.visible = false;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    player.visible = false;
    background(over);
    textSize(30);
    fill("violet");
    text("Game Over!", 550, 100);
  }

  switch (score) {
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
    default:
      break;
  }
  player.collide(invisibleground);
  drawSprites();
  fill("violet");
  textSize(30);
  text("Score : ", 400, 100);
  text(score, 500, 100);
}
function bananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(1000, 250, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    banana.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(1000, 400, 20, 20);
    obstacle.addImage("catcus", obstacleImage);
    obstacle.scale = 0.30;
    obstacle.velocityX = -4;
    obstacle.lifetime = 270;
    obstacleGroup.add(obstacle);
  }
}