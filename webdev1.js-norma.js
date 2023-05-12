let left=document.querySelector('.left');
let right=document.querySelector('.right');
let up=document.querySelector('.up');
let down=document.querySelector('.down');
let snakeHead=document.querySelector('.snakeHead');
let snakeBody=document.querySelector('.snakeBody');
let snakeTail=document.querySelector('.snakeTail');
let gridbox=document.querySelector('.gridbox');
let startTimer=document.querySelector('.timerButton');
let colours=['green','blue','pink','yellow','brown'];
let foodCoords=[];
let coords={snakeHead:[200,200],snakeBody:[190,200],snakeTail:[180,200]};
snakeHead.style.left=coords.snakeHead[0]+'px';
snakeHead.style.top=coords.snakeHead[1]+'px';
snakeBody.style.left=coords.snakeBody[0]+'px';
snakeBody.style.top=coords.snakeBody[1]+'px';
snakeTail.style.left=coords.snakeTail[0]+'px';
snakeTail.style.top=coords.snakeTail[1]+'px';
let myInterval=1,foodCount=0,timerInterval=1,timeCounter=60;
let snakeScore=JSON.parse(localStorage.getItem('snakeScore'))||{
    currentScore:0,
    highScore:0};
    console.log(snakeScore);
document.querySelector('.high-score').innerText=`High Score: ${snakeScore.highScore}`;
const drLimit=390,moveBy=10,timeInterval=400,ulLimit=0,columns=19,rows=19;
function addTimer(){
    clearInterval(timerInterval);
    timeCounter-=1;
    document.querySelector('.timer').innerText=`Time remaining: ${timeCounter}`;
    timerInterval=setInterval(addTimer,1000);
    if(timeCounter==0){
        gameOver();
    }
}
function addFood(){
    for(let i=0;i<5;i++){
        let food=document.querySelector(`.${colours[i]}Food`);
        foodLeft=Math.floor(Math.random()*columns+1)*20;
        foodTop=Math.floor(Math.random()*rows+1)*20;
        if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
            foodLeft=Math.floor(Math.random()*columns+1)*20;
            foodTop=Math.floor(Math.random()*rows+1)*20;
        }
        food.style['background-color']=`${colours[i]}`;
        console.log(foodLeft,foodTop);
        food.style.left=foodLeft+'px';
        food.style.top=foodTop+'px';
        foodCoords.push([foodLeft,foodTop]);
        console.log(food.style.left,food.style.top);
    }
    console.log(foodCoords);
}
addFood();
function moveSnakeR(){
    clearInterval(myInterval);
    if(coords.snakeHead[0]<drLimit){
        //y-coords
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';

        //x-coords
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        coords.snakeHead[0]+=moveBy;
        snakeHead.style.left=coords.snakeHead[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top);
        myInterval=setInterval(moveSnakeR,timeInterval);

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            foodCoords=[];
            addFood();
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['background-color']='black';
            food.style['z-index']=0;
            foodCount++;
            console.log(foodCount);

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        clearInterval(myInterval);
        gameOver();
    }
}
function moveSnakeL(){
    clearInterval(myInterval);
    if(coords.snakeHead[0]>ulLimit){
        //y-coords
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        snakeTail.style.top=coords.snakeTail[1]+'px';
        snakeBody.style.top=coords.snakeBody[1]+'px';

        //x-coords
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        coords.snakeHead[0]-=moveBy;
        snakeHead.style.left=coords.snakeHead[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top);
        myInterval=setInterval(moveSnakeL,timeInterval);

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            foodCoords=[];
            addFood();
            foodCount=0;
            console.log(foodCount);
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['background-color']='black';
            food.style['z-index']=0;
            foodCount++;
            console.log(foodCount);

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        clearInterval(myInterval);
        gameOver();
    }
}
function moveSnakeU(){
    clearInterval(myInterval);
    if(coords.snakeHead[1]>ulLimit){
        //x-coords
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        snakeBody.style.left=coords.snakeBody[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';

        //y-coords
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        coords.snakeHead[1]-=moveBy;
        snakeHead.style.top=coords.snakeHead[1]+'px';
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top);
        myInterval=setInterval(moveSnakeU,timeInterval);

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            foodCoords=[];
            addFood();
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['background-color']='black';
            food.style['z-index']=0;
            foodCount++;

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        clearInterval(myInterval);
        gameOver();
    }
}
function moveSnakeD(){
    clearInterval(myInterval);
    if(coords.snakeHead[1]<drLimit){
        //x-coords
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        snakeTail.style.left=coords.snakeTail[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';

        //y-coords
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        coords.snakeHead[1]+=moveBy;
        snakeHead.style.top=coords.snakeHead[1]+'px';
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top);
        myInterval=setInterval(moveSnakeD,timeInterval);

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            foodCoords=[];
            addFood();
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['background-color']='black';
            food.style['z-index']=0;
            foodCount++;
            console.log(foodCount);

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        clearInterval(myInterval);
        gameOver();
    }
}
function gameOver(){
    if(snakeScore.currentScore>snakeScore.highScore){
        snakeScore.highScore=snakeScore.currentScore;
        alert(`Game over.\nYour new High Score is ${snakeScore.highScore}!`);
        snakeScore.currentScore=0;
        localStorage.setItem('snakeScore',JSON.stringify(snakeScore));
    }
    else{
        alert('Game over.\nYour High Score stays the same!')
        snakeScore.currentScore=0;
        localStorage.setItem('snakeScore',JSON.stringify(snakeScore));
    }
    location.reload();
}