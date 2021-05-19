var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var PLAY =1;
var END = 0;
var gameState = PLAY;

var Gameover, restart, gameoverimg, restartimg;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimg = loadImage ("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addImage("change", trex_collided);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  Gameover = createSprite(300,100,20,20);
  Gameover.addImage("gameover", gameoverimg);
  Gameover.scale=0.5;
  Gameover.visible = false;
  
  restart=createSprite(300,50,20,20);
  restart.addImage("re", restartimg);
  restart.scale=0.5;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  camera.x = true.x;
  Gameover.position.x = restart.position.x = camera.x


background(180);  
 if (gameState===PLAY) {
   
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  
  if(keyDown("space")&& trex.y>=159) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5 
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
     
   if (obstaclesGroup.isTouching(trex)){
     gameState=END; 
   }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
   
    ground.velocityX = -(4 + score/100); 
    
 }  
  
 else if (gameState===END) {
  trex.velocityY=0;
  ground.velocityX =0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  Gameover.visible=true;
  restart.visible=true;
  trex.changeImage("change", trex_collided);
   
  obstaclesGroup.setLifetimeEach (-1);
  cloudsGroup.setLifetimeEach(-1);
   
   if (mousePressedOver(restart)) {
     reset(); 
   }
 }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(4 + score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState=PLAY;
  Gameover.visible=false;
  restart.visible=false;
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
}