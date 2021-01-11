var tower , towerImage
var door,doorImage,doorGroup
var climber,climberImage,climberGroup;
var ghost,ghostImage
var invisibleBlock,invisibleBlockgroup;
var gameState=("PLAY");
function preload() {
 towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}
function setup () {
  createCanvas (600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(150,200);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockgroup=new Group(); 
}
function draw () {
  background(0);
  if (gameState==="PLAY") {
    if (tower.y>400) {
    tower.y=300;
  }
  if (keyDown("space")) {
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.3;
  
  if (keyDown("right_arrow")) {
    ghost.x=ghost.x+3;
  }
  if (keyDown("left_arrow")) {
    ghost.x=ghost.x-3;
  }
    if (climberGroup.isTouching(ghost)) {
    ghost.velocityY=0;
  }
  if (invisibleBlockgroup.isTouching(ghost)||ghost.y>600) {
    ghost.destroy();
    gameState=("END");
  }
  
  spawnDoors();
  drawSprites();
  } 
  if (gameState==="END") {
    textSize(60);
    
    fill("orange");
    stroke("yellow");
    strokeWeight(10);
    text("GAME OVER ",130,300);
    
  }
}

function spawnDoors() {
  if (frameCount %250===0) {
    door=createSprite(200,-50);
    door.addImage(doorImage);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x= Math.round(random(100,400))
    climber.x=door.x;
    climber.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    climberGroup.add(climber);
    door.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    doorGroup.add(door);
    invisibleBlockgroup.add(invisibleBlock);
  }
}