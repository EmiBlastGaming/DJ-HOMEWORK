var leftwristx = 0
var leftwristy = 0
var rightwristx = 0
var rightwristy = 0
var leftwristscore = 0
var rightwristscore = 0

function preload() {
    song1 = loadSound("harry_potter.mp3")
    song2 = loadSound("zelda_lost_woods.mp3")
}
function setup() {
    canvas = createCanvas(600, 400)
    background("yellow")
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    pose = ml5.poseNet(video, modelLoaded)
    pose.on("pose", Results)
}
function draw() {
    image(video, 0, 0, 600, 400)
    fill("yellow")
    stroke("black")
    if(leftwristscore >0.2 && !song1.isPlaying()) {
        song2.stop()
        song1.play()
    } else if(rightwristscore >0.2 && !song2.isPlaying()) {
        song1.stop()
        song2.play()
    }
}
function modelLoaded() {
    console.log("PoseNet inicializado")
}
function Results(poses) {
    if(poses.length >0) {
        leftwristx = poses[0].pose.leftWrist.x
        leftwristy = poses[0].pose.leftWrist.y
        rightwristy = poses[0].pose.rightWrist.y
        rightwristx = poses[0].pose.rightWrist.x
        leftwristscore = poses[0].pose.keypoints[9].score
        rightwristscore = poses[0].pose.keypoints[10].score
        
    } else {
        console.error("oops")
    }
}