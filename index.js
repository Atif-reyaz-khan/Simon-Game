buttonsColors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function nextSequence() {
  userClickedPattern=[];
  var random = Math.floor(Math.random() * 4);
  level = level + 1;
  $("#level-title").text("level " + level);



  var randomChoosenColors = buttonsColors[random];
  gamepattern.push(randomChoosenColors);
  $("#" + randomChoosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChoosenColors + ".mp3");
  audio.play();
}
$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  cheakAnswer(userClickedPattern.length-1);

});

function playSound(choosenColor) {
  var a = new Audio("sounds/" + choosenColor + ".mp3");
  a.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
$(document).keypress(function(event) {
  if (!start) {

    $("#level-title").text("level" + level);
    nextSequence();
    start = true;
  }

});
function cheakAnswer(currentlevel){
  if(userClickedPattern[currentlevel]===gamepattern[currentlevel]){
    console.log("sucess");

  if(userClickedPattern.length===gamepattern.length){
    setTimeout(function () {
          nextSequence();
        }, 1000);
  }
}
    else{
      playSound("wrong");
        $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      restart();


    }

  }
  function restart(){
     gamepattern = [];

     level = 0;
     start = false;
  }
