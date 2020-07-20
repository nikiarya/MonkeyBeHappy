var monkey, monkeyImage, banana, bananaImage, bananaGroup, obstacle, obstacleImage, obstacleGroup, survivalTime, backImage, backSprite,ground, PLAY, END, gameState;

var gameOver, gameOverImage, restart, restartImage;

function preload(){
  monkeyImage =
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
  
  obstacleImage = loadImage("stone.png");
  
  bananaImage = loadImage("Banana.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}


function setup() {
  createCanvas(600,300);
  
  backSprite = createSprite(300,150,600,300);
  backSprite.addImage("background", backImage);
  backSprite.scale = 1.2;
  
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.2;
  
  ground = createSprite(300,300,600,10);
  ground.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  PLAY = 1; 
  END = 0;
  gameState = PLAY; 
  
  gameOver = createSprite(300,250,10,10);
  gameOver.addImage("gameover" , gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(200,200,10,10);
  restart.addImage("restart" , restartImage);
  restart.visible = false;
  
  textSize(25);
  survivalTime = 0;
  
}

function draw() {
 background(255); 
  
  monkey.collide(ground);
    
  if (gameState == PLAY) {
    
    backSprite.velocityX = -4;
    
    survivalTime = Math.ceil(World.frameCount/World.frameRate);
   
    if(backSprite.x < 0) {
      backSprite.x = backSprite.width/2;
    } 
    
    if(keyDown("space") && monkey.isTouching(ground)) {
    monkey.velocityY = -12;  
    }
  
    
    if(bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
    
    spawnObstacle();
    spawnBananas();
    
    if(obstacleGroup.isTouching(monkey)) {
      gameState = END;
      obstacleGroup.destroyEach();
      bananaGroup.destroyEach();

    } 
  }
  
  else if (gameState == END) {
    monkey.velocityY = 0;
    backSprite.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.y = 110;
    monkey.x = 200;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;
  }

  
  drawSprites();
  
  text("Survival Time: "+ survivalTime, 400, 50);

}

function spawnObstacle() {
  if(World.frameCount % 100 == 0) {
    obstacle = createSprite(600,290,10,10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    
    obstacle.lifetime = 120;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas() {
  if(World.frameCount % 80 == 0) {
    banana = createSprite(600,200,10,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.lifetime = 150;
    
    bananaGroup.add(banana);
  }
}