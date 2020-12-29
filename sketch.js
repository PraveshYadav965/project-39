//declaring the variable
var Play = 1;
var End = 0;
var gameState = Play;

var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score = 0;
var ST = 0;
var bg,  backgroundImage;
var restart, restartImage;
var gameOverImage;
var jumpSound, checkPointSound, collectSound, dieSound;
var invisibleGround;


function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png")
  monkey_collided = loadAnimation("sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameoover2.jpg");
  
  jumpSound = loadSound("Sonic_Jump_Sound_Effect(256k).mp3");
  checkPointSound = loadSound("Checkpoint_Sound_Effect(256k).mp3");
  collectSound = loadSound("Coin_Collect_sound_effect(256k).mp3");
  dieSound = loadSound("Roblox_Death_Sound_-_OOF_-_Sound_Effect(256k).mp3");
  
  backgroundImage = loadImage("f.jpg");

}


function setup() { 
  
  createCanvas(600, 400);
 
  monkey = createSprite(50, 340);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.15;
 
  
  invisibleGround = createSprite(300, 385, 600, 5);
  invisibleGround.visible = false;
  
  restart = createSprite(300, 200);
  restart.addImage("restart", restartImage);
  restart.scale = 0.2;
  
  gameOver = createSprite(300, 165);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.6;
  
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("circle", 10,30,250);
  ;

  bg = createSprite(100, 150 );
  bg.addImage(backgroundImage);

}


function draw() {
  
  
  background("skyblue");

  bg.velocityX = -4;
  if(bg.x < 250){

      bg.x = bg.width / 2;

  }

  monkey.depth = bg.depth;
  monkey.depth = monkey.depth + 1;
  
  
  if(gameState === Play){

    FoodGroup.setVelocityEachX = -(4 + 3* ST/50);
    obstaclesGroup.velocityX = -(4 + 3* ST/50);

   
    ST = ST + Math.round(getFrameRate()/60);

    gameOver.visible = false;
    restart.visible = false;
    
   background.velocityX = -(5 + 3* score/20)
    
    monkey.changeAnimation("running", monkey_running);
    
    if(score>0 && score%20 === 0){
      
       checkPointSound.play() 
      
    }
    
   if (bg.x < 250){
         bg.x = bg.width/2;
   }

   
     camera.position.x = invisibleGround.x;
    
   
    if(keyDown("space")&& monkey.y >= 340.5) {
        monkey.velocityY = -15;
        jumpSound.play();
    }
    
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    
    spawnFood();
  
    
    spawnObstacle();
    
    if(obstaclesGroup.isTouching(monkey)){

      monkey.velocityY = -15;
      jumpSound.play();
        
       
    }
    
    monkey.collide(invisibleGround);
    
    if(FoodGroup.isTouching(monkey)) {
      
       collectSound.play();
       FoodGroup.destroyEach();
       score = score + 1;
      
    }
    
  }
  
   else if (gameState === End) {
      gameOver.visible = true;
      restart.visible = true;
     
      bg.velocityX = 0;
      monkey.velocityY = 0
      
     monkey.changeAnimation("collided", monkey_collided);
     
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
     
     if(mousePressedOver(restart)) {
        reset();
     }
     
   }

  drawSprites();

  textSize(20);
  fill("yellow");
  textFont("algerian");
  text("Survival time: "+ST,10,30);

  textSize(20);
  fill("yellow");
  textFont("algerian");
  text("Banana: "+score,10,60);

  textSize(10);
  fill("yellow");
  textFont("algerian");
  text("This is an AI based game and for banana you have to jump randomly", 235, 30);
  
}


function reset() {
  gameState = Play;
  restart.visible = false;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  score = 0;
  ST = 0;
  
}
function spawnObstacle() {
 if(frameCount % 100 === 0){
   
  obstacle = createSprite(600, 354);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.velocityX = -8;
   
  obstacle.scale = 0.15;
  obstacle.lifetime = 400;
  
  obstaclesGroup.add(obstacle);
  
 }
   
}
function spawnFood() {
  if(frameCount % 110 === 0) {
     banana = createSprite(600, 300);
     banana.y = Math.round(random(120,250));
     banana.addImage("banana", bananaImage);
     banana.scale = 0.15;
     banana.velocityX = -5;
     banana.lifetime = 400;
     FoodGroup.add(banana);
  }
}