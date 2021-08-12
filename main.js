song = "";
leftWristY = 0;
leftWristX = 0;
scoreLeftWrist = 0;

rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

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

    fill("red");
    stroke("red");
    
    if(scoreLeftWrist > 0.2){

        circle(leftWristX,leftWristY,20);

        numberLeftWristY = Number(leftWristY);
        removeDecimals = floor(numberLeftWristY);
    
        volume = removeDecimals/500;
    
        document.getElementById("volume_value").innerHTML = "Volume = "+volume;
        song.setVolume(volume);  
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed_value").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed_value").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed_value").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed_value").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed_value").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    
}

function modelLoaded(){
    console.log("posnet is initialized");
}

function getPoses(results){
    if(results.length > 0){
    
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

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
    song.rate(1);
}

function stopMusic(){
   song.stop();
}
