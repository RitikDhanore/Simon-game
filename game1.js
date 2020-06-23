
var buttonColours = ["red", "blue", "green", "yellow"];


var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }

});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

playSound(userChosenColour);

animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){

      userClickedPattern = [];

      level++;
      $("#level-title").text("level "+level);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
  }


function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+ currentColour).addClass("pressed");

  setTimeout(function(){
    $("."+ currentColour).removeClass("pressed");
  },100);

}


function checkAnswer(currentLevel1)
{
  if(gamePattern[currentLevel1]===userClickedPattern[currentLevel1])
  {

    if(gamePattern.length===userClickedPattern.length)
    {
       setTimeout(function(){
         nextSequence();
       },1000);
    }
  }
   else
   {

     playSound("wrong");

     $("body").addClass("game-over");
     setTimeout(function(){
      $("body").removeClass("game-over");
     },100);

     $("#level-title").html("Game Over<br>Press a key to restart");
     started = false;
     level = 0;
     gamePattern = [];

     $(document).keypress(function() {
       if(!started){
         $("#level-title").text("level "+level);
         nextSequence();
         started = true;
       }

     });


   }
}
