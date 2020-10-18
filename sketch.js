//varible declaration
   var PLAY = 1;
   var END = 0;
   var gameState = PLAY;
   var backgroundimg;
   var monkey_running,monkey_collided;
   var bananaGroup,bananaimg;
   var obstacleGroup,obstacleimg;
   var groundimg;
   var score = 0;
   var counter = 0;
   var gameoverimg,restartimg;
   var gameover,restart;




function preload(){
     backgroundimg = loadImage("jungle.jpg");
  
     monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
     bananaimg = loadImage("banana.png");
     obstacleimg = loadImage("stone.png");
  
     obstacleGroup = new Group();
     bananaGroup = new Group();
  
     gameoverimg = loadImage("gameOver.png");
     restartimg = loadImage("restart.png");
  
     monkey_collided = loadImage("Monkey_coll.png");
  
}


function setup() {
  createCanvas(displayWidth, displayHeight - 200);
  
  infiniteground = createSprite(0,0,800,400);
  backgrnd();
  
  Monkey = createSprite(300,280,20,50);
  Monkey.addAnimation("running", monkey_running);
  Monkey.addAnimation("collided",monkey_collided);
  Monkey.scale = 0.15
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
   score = 0; 
   counter = 0;
   gameover = createSprite(300,100);
   gameover.addImage(gameoverimg);

   restart = createSprite(300,140);
   restart.addImage(restartimg);
   gameover.scale = 0.5;
   restart.scale = 0.5;
   gameover.visible = false;
   restart.visible = false;
  
  
  
}


function draw(){
 background(255); 

if(gameState === PLAY){
 
  //making infinite ground
  if(infiniteground.x <100) {
    infiniteground.x = infiniteground.width/2
  }
  
   //jump when the space key is pressed
 if(keyDown("space") && Monkey.y >= 150){
      Monkey.velocityY = -12 ;
  }
 
  //add gravity
 Monkey.velocityY = Monkey.velocityY + 0.8;
 
  //calling global functions
 spawnBananas();
 spawnObstacles();

 
  
  //making monkey collide on invisible ground
 Monkey.collide(invisibleGround);
  
  // incresing score
 if(Monkey.isTouching(bananaGroup)){
   score = score + 2 ;   
   bananaGroup.destroyEach();
 }
  
  //creating code to make you lose
 if(obstacleGroup.isTouching(Monkey)){
         counter = counter + 1;
         obstacleGroup.destroyEach();
     if(counter === 1) {
       Monkey.scale = 0.1;
     }

     if(counter === 2) {
       gameState = END;
     }  
 }
  
 

}
  else if(gameState === END) {
    
    //making gameover and restart visible
    gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    infiniteground.velocityX = 0
    Monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    // destroy banana and obstacle Group
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
     //change the monkey animation
    Monkey.y = 240;
    Monkey.scale = 0.3;
    Monkey.changeAnimation("collided",monkey_collided);
    
    if(mousePressedOver(restart)) {
    reset();
  }
    
  } 
 drawSprites();
  Score();

}

//global function for infinite background
function backgrnd() {
  infiniteground.addImage(backgroundimg);
  infiniteground.velocityX = -4
  infiniteground.x = infiniteground.width/2;
  infiniteground.scale = 1.5; 
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,280,10,40);
    obstacle.addImage(obstacleimg);
    obstacle.velocityX = -4;
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

//global function for banana
function spawnBananas() {
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaimg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

//global function for score
function Score() {
 stroke("white");
 textSize(30);
 fill("white");
text("Score: "+ score, 1125,50);
   
  switch(score){  
   case 10: Monkey.scale = 0.12;
       break;
   case 20: Monkey.scale = 0.14;
       break;
   case 30: Monkey.scale = 0.16;
       break;
   case 40: Monkey.scale = 0.18;
       break;
   default: break;
 }
  
} 

//global function for reseting
function reset(){
  gameState = PLAY;
  score = 0;
  gameover.visible = false;
  restart.visible = false;
  Monkey.scale = 0.1;
  counter = 0;
  backgrnd();
  Monkey.changeAnimation("running", monkey_running);
  
    }