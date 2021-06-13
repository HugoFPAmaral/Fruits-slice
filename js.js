var playing = false;
var score;
var lifes;
var fruits = ["apple", "banana", "bomb", "cherries", "grapes", "mango","bomb", "orange", "peach", "pear", "watermelon", "bomb"];
var fruitChosen;
var step;


var action;

$(function (){

$("#startreset").click(function(){
    
    if(playing){
       
        //reload page
        location.reload();    
         
    }
    
    $("#gameover").hide();

    playing= true;
    
    score= 0;
    $("#scorevalue").html(score);

    $("#numberOfLifes").show();
   
    lifes= 3;
    
    addHearts();

    $(this).html("Reset game");

    startGame();
    
 
});


function addHearts(){
   
    //clean before making more hearts
    $("#numberOfLifes").empty();
   
    for(i= 0; i < lifes; i++){
        $("#numberOfLifes").append('<img src="images/heart.png" class="life">');
    }
}

function startGame(){
  
    if(playing){
        
        chooseFruit();

    }

    //make it move
    action = setInterval(function (){
       
        $("#fruit").css("top", $("#fruit").position().top + step);
        
        //check if the fruit is too low (position)

        if($("#fruit").position().top > $("#board").height()){
           
            if(lifes > 1){

                    if(fruits[fruitChosen] !== "bomb"){
                    
                        lifes--;

                        addHearts(); 

                        chooseFruit();
                    }
                    
                   chooseFruit();
               
             }else if(fruits[fruitChosen] === "bomb"){

                    addHearts(); 

                    chooseFruit();

             }else{
                
                //gameover
                playing= false;
                $("#numberOfLifes").empty();
                $("#gameover").show();
                $("#gameover").html("<p>Game over!</p><p>Your score is " + score + "</p>");
                $("#startreset").html("Start game");
                
                stopAction();
            }
        }    
    }, 10)
}


function chooseFruit(){

    if(lifes==0){
        
        stopAction();
        playing=false;
       
    }

    fruitChosen = Math.floor(Math.random() * 12);

    $("#fruit").show();

    $("#fruit").attr("src" , "images/" + fruits[fruitChosen] + ".png");

    $("#fruit").css({
        "left" : Math.floor(Math.random() * 550),
        "top" : -80
    });

    //speed
    step = Math.floor(Math.random() * 5) + 2;
}


$("#fruit").mouseover(function(){
    
    if(fruits[fruitChosen] != "bomb"){
    score++;
    
    $("#scorevalue").html(score);
        
    //play fruit sound
    $("#slicesound")[0].play();

    //stop fruit
    clearInterval(action);

    //hide fruit
    $("#fruit").hide("explode", 500); //slice fruit

    //send new fruit
    setTimeout(startGame, 800);   
    
    }else{

        //play bomb sound
        $("#bombsound")[0].play();

        //stop bomb
        clearInterval(action);

        //hide bomb
        $("#fruit").hide("explode", 500); //slice bomb

        //send new fruit
        setTimeout(startGame, 800);        
       
        lifes--;

       if(lifes === 0){

        //game over 
        playing= false;

        stopAction();
    
        $("#numberOfLifes").empty();
        $("#gameover").show();
        $("#gameover").html("<p>Game over!</p><p>Your score is " + score + " .</p>");
        $("#startreset").html("Start game"); // change button to Start game
        
       }

       addHearts();
        
    }

})


//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit").hide();
  
}

});