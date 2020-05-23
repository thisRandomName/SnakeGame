const steps=document.querySelectorAll(".game-grid div"); //array that has all the div elements of the grid
const startButton=document.querySelector("#start");
const gameGrid=document.querySelector(".game-grid");
const result=document.querySelector("#result");
const width=20; //width:20 div elements==20 steps
const height=10; // height:10 div elements==10 steps
let foodIndex=0; //foodIndex at div=0;
let move=0;
let snakeIndex=1; //index that represents the  INITIAL snake's head
let moving=0;
let snakeIndex2=0; //index that represents the INITIAL snake's tail
let snake=[snakeIndex,snakeIndex2]; //array containing the snake-position indexes
let startNewGame=false;
result.innerHTML="";
//let speed=1234567;
let won=-1; //number of game-food items the snake has eaten

start();


//ALL functions here:

function start(){
   startButton.addEventListener("click",(event)=>{
 
    snake.forEach(i => steps[i].classList.remove("game-snake")); //clear all div elements from class "game-snake"
    steps[foodIndex].classList.remove("game-food");
    clearInterval(moving);
    startNewGame=true;
    snakeIndex=1; //index that represents the  INITIAL snake's head
    snakeIndex2=0; //index that represents the INITIAL snake's tail
    steps[snakeIndex].classList.add("game-snake");
    steps[snakeIndex2].classList.add("game-snake");
    snake=[snakeIndex,snakeIndex2];
    move=0;
    foodIndex=0;
    result.innerHTML=0;
    won=-1;
    food();
    moving=setInterval(movement,400); //movement happens every 400ms (statheri taxytita== (1 div)/(4*10^(-3))
   })
}


function control(e){ //snake movement using the keybord
   
    if(e.keyCode===38){// arrow up
        move=-width;   // -20 divs in the game-grid is the exact position above
       
    }else if(e.keyCode===40){//arrow down
        move=+width;   // +20 divs in the game-grid is the exact position below 
        
    }else if(e.keyCode===37){//arrow left
        move=-1;

    }else if(e.keyCode===39){//arrow right
        move=+1;
       
    }
    
    
}    
 



function movement(){

    if ( //width==20 and height=10 => 200 div elements in total numbered from 0..199
        (snake[0] + width >= (width * height) && move === width ) || //if snake hits bottom: div-numbers in the game-grid:180,181,182..199
        (snake[0] % width === width -1 && move === 1) || //if snake hits right wall: div-numbers in the game-grid: 19,39,59,79..199
        (snake[0] % width === 0 && move === -1) || //if snake hits left wall: div-numbers in the game-grid: 0,20,40,60..180
        (snake[0] - width < 0 && move === -width) //if snake hits the top: div-numbers in the game-grid:0,1,2,3,4,5..19
        
    )
    {   clearInterval(moving) ; //this will clear the interval if any of the above happens
        startNewGame=false;
        alert("You lost...")
        result.innerHTML="Please start again";  //game over 
        console.log(startNewGame);
       
    }
    
    //simple snake movement: snake-tail is removed from the end, new snake-head is added in front, with EVERY movement in the correct direction(variable:move)
    if(startNewGame===true){
    snakeIndex2=snake.pop(); //save the LAST element of the snake array , -useful also in case the snake eats-
    steps[snakeIndex2].classList.remove("game-snake");  
    snake.unshift(snake[0]+move); //add NEW snake-head (towards the right direction)
    steps[snake[0]].classList.add("game-snake");
    console.log(snake);
    document.addEventListener("keyup",control);
    
    eat();
    win();
    }
}


function food(){  
    while(steps[foodIndex].classList.contains("game-snake")  ||foodIndex===0){ //divs that contain the snake cannot contain food
        foodIndex=Math.floor(Math.random()*steps.length);  //repeat moving the food in random places (exit while, when div is snake-free)
        
    } steps[foodIndex].classList.add("game-food"); 
    won++;
}
    

function eat(){ 
  if(steps[snake[0]].classList.contains('game-food')) { //snake-head finds food
    steps[snake[0]].classList.remove('game-food'); 
    steps[snakeIndex2].classList.add('game-snake'); //add class "game-snake" to the snakeIndex2 div of the game-grid
    snake.push(snakeIndex2);  //snake array grows by 1 
    result.innerHTML++;
    food(); 
    //speed=speed-20;
    //moving=setInterval(movement,speed);
  }

}
    
function win(){
    if (won===10){
        clearInterval(moving);
        startNewGame=false;
        result.innerHTML="Snake had a great meal !!!!!!! ";
        console.log("start",startNewGame);
    }
    console.log(won);
    
}