var buttonCollors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;
 
$(document).on("keydown", function (){ 
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }

})




$(".btn").on("click", function(){
        var userChosenColour = $(this).attr("id");
        userClickPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickPattern.length-1);

    })


    function nextSequence() {
        level++;
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonCollors[randomNumber];
        gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
        $("#level-title").text("level " + level);
        userClickPattern =[];
        
}
 
function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);

}
function checkAnswer(currentLevel) {
    
    if ( gamePattern[currentLevel] === userClickPattern[currentLevel]) {
            console.log("sim");
        
        if (gamePattern.length ===  userClickPattern.length )
            setTimeout(function() {
            nextSequence();
            }, 1000);
    } else {
            console.log("wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
            $("body").removeClass("game-over"); 
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart")
            gameOver();
    }
    
}
function gameOver() {
    gamePattern = [];
    level = 0;
    started = false;
}



