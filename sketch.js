var bg 
var score
var score2
var score3
var score4
var ground
var zombie
var steve
var score5
var score6
var score7
var score8
var invisground
var healthOFsteve
var obstaclesGrp
var phantomGrp
var cloudGrp
var invisblockgrp
var obstaclesGrp2
var gamestate
var canJump
var respawnbtn
const framespeed=45
function preload(){
zombierunning=loadAnimation("MC_zombieRunning1.png","MC_zombieRunning2.png")
zombierunningback=loadAnimation("MC_zombieRunning3.png","MC_zombieRunning4.png")
groundImg=loadAnimation("Ground.png")
steverunning=loadAnimation("Steve1.png","Steve2.png")
cloudImg1=loadAnimation("cloud1.png")
cloudImg2=loadAnimation("cloud2.png")
cloudImg3=loadAnimation("cloud3.JPG")
bgImg=loadAnimation("background.JPG")
diamondImg=loadAnimation("minecraftDiamond.png")
GoldImg=loadAnimation("MinecraftGold.png")
phantomflying=loadAnimation("Phantom1.png","Phantom2.png","Phantom3.png")
IronImg=loadAnimation("iron.png")
CobblestoneImg=loadAnimation("MinecraftCobbleStone.png")
steveISjumping=loadAnimation("Steve3.png")
music=loadSound("MinecraftMusic.mp3")
halfHeartImg=loadAnimation("Halfheart.png")
DirtImg=loadAnimation("MCDirt.jpg")
cobblestone=loadAnimation("2dcobblestone.png")
MagmaBlock=loadAnimation("MinecraftMagmaBlock.png")
OakLog=loadAnimation("MinecraftOakLog.png")
Diorite=loadAnimation("MinecraftDiorite.jpg")
Campfire=loadAnimation("Campfire1.png","Campfire2.png")
cactus=loadAnimation("minecraftCactus.png")
zombiesound=loadSound("zombie2.mp3","zombie1.mp3","zombie3.mp3")
respawnImg=loadAnimation("respawnbutton.JPG")
}

function setup() {
createCanvas(1280,627)
bg=createSprite(600,300)
bg.addAnimation("background",bgImg)
bg.scale=2
bg.velocityX=-2
frameRate(45)
canJump=true
score=0
score2=createSprite(1100,20)
score2.addAnimation("score",diamondImg)
score2.scale=0.2
obstaclesGrp2=createGroup()
score3=0
score4=createSprite(1100,50)
score4.addAnimation("score",GoldImg)
score4.scale=0.1
score5=0
score6=createSprite(1100,80)
score6.addAnimation("score",IronImg)
score6.scale=0.2
score7=0
score8=createSprite(1100,115)
score8.addAnimation("score",CobblestoneImg)
score8.scale=0.2
invisblockgrp=createGroup()
ground=createSprite(600,570)
ground.addAnimation("moving",groundImg)
ground.scale=1.3
obstaclesGrp=createGroup()
phantomGrp=createGroup()
cloudGrp=createGroup()
invisground=createSprite(640,540,1280,20)
invisground.visible=false
zombie=createSprite(128,407)   
zombie.addAnimation("running",zombierunning)
zombie.scale=0.9
steve=createSprite(328,437)   
steve.addAnimation("running",steverunning)
steve.scale=0.7
steve.debug=false
music.play()
gamestate="ALIVE" 
healthOFsteve=createSprite(10,10)
healthOFsteve.addAnimation("lowHealth",halfHeartImg)

healthOFsteve.scale=0.3
respawnbtn=createSprite(700,250)
respawnbtn.addAnimation("respawn",respawnImg)
}

function draw() {
    console.log(steve.y)
background(0);
if (gamestate==="ALIVE"){
    respawnbtn.visible=false
    ground.velocityX=-5
    if (ground.x<550){
        ground.x=width/2
    }
    healthOFsteve.x=steve.x
    healthOFsteve.y=steve.y+100
    if (bg.x<550){
        bg.x=width/2
    }
    if ((score>3)&&(score<10)){
        frameRate(framespeed+1)
    }
    if ((score>9)&&(score<14)){
        frameRate(framespeed+3)
    }
    if ((score>13)&&(score<20)){
        frameRate(framespeed+7)
    }
    if ((score>19)&&(score<30)){
        frameRate(framespeed+10)
    }
    if ((score>29)&&(score<50)){
        frameRate(framespeed+15)
    }
    if (score>50){
        frameRate(framespeed+20)
    }
    else{
        frameRate(framespeed)
    }
    
    if (frameCount % 200 === 0) {score=score+1}
    if (frameCount % 50 === 0) {score3=score3+1}
    if (frameCount % 10 === 0) {score5=score5+1}
    if (frameCount % 1 === 0) {score7=score7+1}
    steve.collide(invisground)
    steve.velocityY+=1
    zombie.collide(invisground)
    steve.collide(obstaclesGrp)

    spawnClouds()
    spawnPhantom()
    if(keyDown("space")&& (steve.y > 417)&&(canJump===true)) {
        steve.velocityY = -20;
        console.log(steve.y)
    }
    if (steve.y<400&&(gamestate="ALIVE")){
        ground.velocityX=-11
        obstaclesGrp.setVelocityXEach(-11)
        invisblockgrp.setVelocityXEach(-11)
        obstaclesGrp2.setVelocityXEach(-11)
        phantomGrp.setVelocityXEach(-11)
        bg.velocityX=-4
    }
    else{if(gamestate==="ALIVE"){
        ground.velocityX=-5
        obstaclesGrp.setVelocityXEach(-5)
        invisblockgrp.setVelocityXEach(-5)
        obstaclesGrp2.setVelocityXEach(-5)
        phantomGrp.setVelocityXEach(-5)
     } }
    if(steve.y<(height-190)){
    steve.addAnimation("notmoving",steveISjumping)
    }
    if (steve.x<(width/10+200)){
        steve.x=width/10+200
    }
    if (zombie.x<(width/10)){
        zombie.x=width/10
    }
    
    if(zombie.isTouching(obstaclesGrp)){

    zombie.y=ground.y-120
    }
    else{
        zombiesound.stop()
        zombie.y=427
    }
    if(zombie.isTouching(invisblockgrp)){
        zombie.y=ground.y-400
        }
    else{
        zombie.y=427
    }
    if(zombie.isTouching(obstaclesGrp2)){
        zombie.y=ground.y-120
        }
        else{
            zombie.y=427
        }
        if (invisblockgrp.isTouching(steve)&&(gamestate==="ALIVE")){
            
            invisblockgrp.setVelocityXEach(0)
            obstaclesGrp.setVelocityXEach(0)
            obstaclesGrp2.setVelocityXEach(0)
            ground.velocityX=0
            canJump=false
            zombie.velocityX=1
        }
        
        
        if(zombie.isTouching(steve)){
            zombie.velocityX=0
            gamestate="DEAD"
        }
        if (phantomGrp.isTouching(steve)){
            cloudGrp.setVelocityXEach(0)
            phantomGrp.setVelocityXEach(-5)
            zombie.velocityX=0
            
            bg.velocityX=0
            healthOFsteve.destroy()
            gamestate="DEAD"

        }
    if (steve.isTouching(obstaclesGrp2)){
        gamestate="DEAD"
    }
}
if (gamestate==="DEAD"){
    console.log("dead")
    cloudGrp.setVelocityXEach(0)
    respawnbtn.visible=true
    obstaclesGrp.setVelocityXEach(0)
    obstaclesGrp2.setVelocityXEach(0)
    invisblockgrp.setVelocityXEach(0)
    ground.velocityX=0
    zombie.velocityX=0
    steve.visible=false
    bg.velocityX=0
    healthOFsteve.visible=false
    music.stop()
    if (mousePressedOver(respawnbtn)){
        reset()
    }
    
}
if (gamestate==="DEAD"){
    
    zombie.addAnimation("dead",zombierunningback)
    zombie.velocityX=-1
}
drawSprites()
fill("white")
textSize(25)
text("= "+score,1125,30)
text("= "+score3,1125,60)
text("= "+score5,1125,90)
text("= "+score7,1125,125)
if (gamestate==="DEAD"){
    text("Press space to jump",200,100)
    text ("click to respawn - ", respawnbtn.x-100,respawnbtn.y-50)
    fill("orange")
    text("This game is to be played on windows", width/8,height-300)
}
}
function spawnClouds() {
    //write code here to spawn the clouds
     if (frameCount % 200 === 0) {
    
    cloud = createSprite(1100,100,40,10);
    cloud.y = Math.round(random(10,60));
    console.log("yes")    
    cloud.scale=0.55
    cloud.velocityX=-3
    cloud.lifetime =1000
    cloud.depth=score8.depth
    cloud.depth=score8.depth-1
    cloudGrp.add(cloud)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: cloud.addAnimation("moving",cloudImg1);
              break;
      case 2: cloud.addAnimation("moving",cloudImg2);
              break;


      default: break;
    }
      }}
function spawnPhantom(){
 if (frameCount % 300 ===0){
    phantom=createSprite(1200,100,40,10) 
    phantom.y = Math.round(random(170,210))
    phantom.velocityX=-7
    phantom.addAnimation("Flying",phantomflying)
    phantom.scale=0.7
    phantom.lifetime = 1000
    if (gamestate==="ALIVE"){
    setTimeout(obstacles,3000)
    }

    phantomGrp.add(phantom)
 }   
}      
function obstacles(){
    if (gamestate==="ALIVE"){
   obstacleBlock=createSprite(1200,100,40,10)
   obstacleBlock.y = ground.y-90
   obstacleBlock.velocityX=ground.velocityX
   obstacleBlock.lifetime=cloud.lifetime
   
   var randBlock = Math.round(random(1,4));
    switch(randBlock) {
      case 1: obstacleBlock.addAnimation("Dirt",DirtImg);
              obstacleBlock.scale=0.5
              break;
    case 2: obstacleBlock.addAnimation("cobblestone",cobblestone);
        obstacleBlock.scale=0.3
              break;
    case 3: obstacleBlock.addAnimation("Oak",OakLog);
        obstacleBlock.scale=0.3
              break;
     case 4: obstacleBlock.addAnimation("diorite",Diorite);
        obstacleBlock.scale=0.5
               break;
      default: break;
    }
    obstaclesGrp.add(obstacleBlock)
    obstacleBlock.depth=zombie.depth
    obstacleBlock.depth=zombie.depth-1
    invisblock=createSprite(120,400,3,70)
    invisblock.x=obstacleBlock.x-45
    invisblock.visible=false
    
    invisblock.y=ground.y-110
    
    invisblock.velocityX=obstacleBlock.velocityX
    invisblock.lifetime=1000
    invisblockgrp.add(invisblock)
   invisblock.depth=zombie.depth
    invisblock.depthdepth=zombie.depth-1
    if (gamestate==="ALIVE"){
    setTimeout(obstacles2,4000)
    }}
console.log(randBlock)
   
}
//pending things:  zombie and phantom sound. respawn function
function obstacles2(){
    if (gamestate==="ALIVE"){
    obstacleBlock2=createSprite(1200,100,40,10)
    obstacleBlock2.y = ground.y-110
    obstacleBlock2.velocityX=ground.velocityX
    obstacleBlock2.lifetime=1000
    var select_block = Math.round(random(1,3));
    switch(select_block) {
      case 1: obstacleBlock2.addAnimation("Magmablock",MagmaBlock);
              obstacleBlock2.scale=0.3
              break;
    case 2: obstacleBlock2.addAnimation("Campfire",Campfire);
        obstacleBlock2.scale=0.5
              break;
              case 3: obstacleBlock2.addAnimation("cactus",cactus);
              obstacleBlock2.scale=0.3
                    break;


      default: break;
    }
    obstaclesGrp2.add(obstacleBlock2)
}}
function reset(){
    zombie.velocityX=0
    zombie.x=128
    cloudGrp.destroyEach()
    obstaclesGrp2.destroyEach()
    obstaclesGrp.destroyEach()
    invisblockgrp.destroyEach()
    phantomGrp.destroyEach()
    steve.visible=true
    steve.x=328
    steve.y=437
    music.play()
    healthOFsteve.visible=true
    healthOFsteve.x=steve.x
    healthOFsteve.y=steve.y+100
    bg.velocityX=-2
    score=0
    score3=0
    score5=0
    score7=0
    gamestate="ALIVE"
}