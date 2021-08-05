song = "";
leftWristY = 0;
leftWristX = 0;

rightWristY = 0;
rightWristX = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(700,200);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);

    posenet.on('pose',getPoses);
}

function draw(){
    image(video,0,0,600,500);
}

function modelLoaded(){
    console.log("posnet is initialized");
}

function getPoses(results){
    if(results.length > 0){
    
        console.log(results);

        leftWristY = results [0].pose.leftWrist.y;
        leftWristX = results [0].pose.leftWrist.x;
        console.log("Left Wrist X ="+leftWristX+"  Left Wrist Y = "+leftWristY);

        rightWristY = results [0].pose.rightWrist.y;
        rightWristX = results [0].pose.rightWrist.x;
        console.log("Right Wrist X ="+rightWristX+"  Right Wrist Y = "+rightWristY);
    }
}

function playMusic(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stopMusic(){
   song.stop();
}
