var trex,trex_running,trex_collided;
var ground,invisible_ground,ground_image;
var o1,o2,o3,o4,o5,o6;
var cloudimg,restart_image,gameOver_image;
var gamestate,count,obstaclesGroup,cloudsGroup
var over,restart,highScore,secondHS,jump
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided=loadImage("trex_collided.png");
  
  ground_image=loadImage("ground2.png");
  
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png"); 
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  
  gameOver_image=loadImage("gameOver.png");
  
  cloudimg=loadImage("cloud.png");
  
  restart_image=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(55,180,50,50);
   trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  
  trex.scale=0.5;
 ground = createSprite(300,180,600,20);
  ground.addImage("ground",ground_image);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  trex.setCollider("circle",0,0,50);
  
  //creating empty group
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  count=0;
  
  invisible_ground = createSprite(300,190,600,10);
  invisible_ground.visible = false;
  
  gamestate="play";

  over=createSprite(300,100,30,30);
    over.addImage("gameOver",gameOver_image);
     restart=createSprite(300,150,30,30);
    restart.addAnimation("restart",restart_image);

over.visible=false;
restart.visible=false;

 highScore=0;
 secondHS=0;

 jump=createSprite(10,10,45,45);

jump.shapeColor="green";


}

function draw() {
   background("white");
  
  if(gamestate==="play"){
    //move the ground
    ground.velocityX = -10;
    //scoring
    count = count + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 157.5){
      trex.velocityY = -13 ;
      //playSound("jump.mp3");
  }
  
  if(mousePressedOver(jump)){
    if(trex.isTouching(obstaclesGroup)){
    trex.velocityY = -13 ;
      //playSound("jump.mp3");
    }
  }
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles
  spawnObstacles();
 // console.log(trex.y);
 
 if(count%100===0&&count>0){
   //playSound("checkPoint.mp3");
 }
 
  
  if(trex.isTouching(obstaclesGroup)){
    gamestate="end";
    //playSound("die.mp3");
  }
  }
  else if(gamestate==="end"){
    //stop the ground
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-10);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-10);
   over.visible=true;
   restart.visible=true;
  }
  text("Score: "+ count, 450, 60);
  text("HighScore:"+highScore,450,80);
  text("sec.HIGHSCORE:"+secondHS,450,40);
  
  if(mousePressedOver(restart)){
    reset();   
  }
  
  //console.log(trex.y);
  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  trex.collide(invisible_ground);
  

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -10;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    //switch statement
     switch(rand)
     {
       case 1:obstacle.addImage("o1",o1);
          break;
              
       case 2:obstacle.addImage("o2",o2);
          break;
          
       case 3:obstacle.addImage("o3",o3);
          break;
          
       case 4:obstacle.addImage("o4",o4);
          break;
          
       case 5:obstacle.addImage("o5",o5);
          break;
          
       case 6:obstacle.addImage("o6",o6);
          break;
          
      default:  break;
         
           
      }
      
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
    
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -10;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding clouds in the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gamestate="play";
  over.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  if(highScore<count){
    secondHS=highScore;
    highScore=count;
  }
  count=0;
}