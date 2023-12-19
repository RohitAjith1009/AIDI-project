song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function modelLoaded() {
    console.log('posenet is initialized')
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        if(song2Status == "true"){
            song2.stop();
          
        }
        song1.play();
        document.getElementById("song_name").innerHTML="Song 1 Playing....";
    }
    else if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(song1Status == "true"){
            song1.stop();
        }
        song2.play();
        document.getElementById("song_name").innerHTML="Song 2 Playing....";
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + 'leftWristY = ' + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + 'rightWristY = ' + rightWristY)
    }
}