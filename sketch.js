
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, bananaScore;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var background, backgroundImage;


function preload(){
  backgroundImage=loadImage("jungle.jpg")
  
             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
jungle=createSprite(200,200,200,200);
  jungle.addImage("jungle", backgroundImage);
  monkey=createSprite(80,315,20,20);
  monkey.scale=0.1;
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
ground.visible=false;
  foodGroup=new Group();
  obstaclesGroup=new Group();
  bananaScore=0;
}


function draw() {
background(120,154,202);
  if(gameState===PLAY){
    food();
    obstacles();
    survivalTime=Math.ceil(frameCount/frameRate())
    if(foodGroup.isTouching(monkey)){
      bananaScore=bananaScore+2;
    }
    if(foodGroup.isTocuhing(monkey)){
      foodGroup.destroyEach();
    }
    if(foodGroup.isTouching(monkey)){
      var rand=Math.round(random(1,10));
      switch(rand){
        case 1:monkey.scale=0.1;
          break;
          case 2:monkey.scale=0.6;
          break;
          case 3:monkey.scale=0.2;
          break;
          case 4:monkey.scale=0.3;
          break;
          case 5: monkey.scale=0.5;
          break;
          case 6:monkey.scale=0.7
          break;
          default: break;
      }
    }
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
      monkey.scale=0.0008
    }
    jungle.velocityX=-4;
  }
  else if(gameState===END){
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    ground.velocityY=0;
    monkey.VelocityY=0;
    foodGroup.velocityY=0;
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    jungle.velocityX=0;
  }
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyDown("space")& monkey.y>314){
    monkey.velocityY=-14;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  if(jungle.x<0){
    jungle.x=jungle.width/2;
  }
  drawSprites();
  text("Survival Time:"+survivalTime, 100,50);
  text("Banana:"+bananaScore,200,80);
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(400,243,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(235,270));
    banana.velocityX=-7;
    banana.setLifetime=100;
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(250,329,20,20);
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstaclesGroup.add(obstacle);

  }
}


