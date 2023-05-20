let left=document.querySelector('.left');
let right=document.querySelector('.right');
let up=document.querySelector('.up');
let down=document.querySelector('.down');
let snakeHead=document.querySelector('.snakeHead');
let snakeBody=document.querySelector('.snakeBody');
let snakeTail=document.querySelector('.snakeTail');
let snakeTail1=document.querySelector('.snakeTail1');
let snakeTail2=document.querySelector('.snakeTail2');
let snakeTail3=document.querySelector('.snakeTail3');
let snakeTail4=document.querySelector('.snakeTail4');
let snakeTail5=document.querySelector('.snakeTail5');
let powerUp=document.querySelector('.powerUp');
let gridbox=document.querySelector('.gridbox');
let startTimer=document.querySelector('.timerButton');
let livesPara=document.querySelector('.lives');
let pauseButton=document.querySelector('.pause');
let resumeButton=document.querySelector('.resume-button');
let overlay=document.querySelector('.overlay');
let startOverlay=document.querySelector('.start-overlay');
let gridInput=document.querySelector('.input-text');
let wallSound=document.querySelector('.hit-wall');
let colours=['green','blue','pink','yellow','brown'];
let foodCoords=[],powerCoords=[];
let powerUpLeft,powerUpTop,powerInterval=1,powerTime=7,powerValue;
let coords={snakeHead:[0,0],snakeBody:[0,0],snakeTail:[0,0],snakeTail1:[0,0],snakeTail2:[0,0],snakeTail3:[0,0],snakeTail4:[0,0],snakeTail5:[0,0]};
let columns,rows,gridSize;
function gridSetup(){
    powerUp.style['background-color']='rgb(7,6,6)';
    gridSize=gridInput.value;
    columns=19,rows=gridSize-1;
    gridbox.style['height']=gridSize*20+'px';
    gridbox.style['width']=gridSize*20+'px';
    gridbox.style['background-color']='rgb(7,6,6)';
    const headCoords=Math.floor(gridSize*10);
    coords.snakeHead[0]=headCoords;
    coords.snakeHead[1]=headCoords;
    coords.snakeBody[0]=headCoords-10;
    coords.snakeBody[1]=headCoords;
    coords.snakeTail[0]=headCoords-20;
    coords.snakeTail[1]=headCoords;
    coords.snakeTail1[0]=headCoords-30;
    coords.snakeTail1[1]=headCoords;
    coords.snakeTail2[0]=headCoords-40;
    coords.snakeTail2[1]=headCoords;
    coords.snakeTail3[0]=headCoords-50;
    coords.snakeTail3[1]=headCoords;
    coords.snakeTail4[0]=headCoords-60;
    coords.snakeTail4[1]=headCoords;
    coords.snakeTail5[0]=headCoords-70;
    coords.snakeTail5[1]=headCoords;
    snakeHead.style.left=coords.snakeHead[0]+'px';
    snakeHead.style.top=coords.snakeHead[1]+'px';
    snakeBody.style.left=coords.snakeBody[0]+'px';
    snakeBody.style.top=coords.snakeBody[1]+'px';
    snakeTail.style.left=coords.snakeTail[0]+'px';
    snakeTail.style.top=coords.snakeTail[1]+'px';
    snakeTail1.style.left=coords.snakeTail1[0]+'px';
    snakeTail1.style.top=coords.snakeTail1[1]+'px';
    snakeTail2.style.left=coords.snakeTail2[0]+'px';
    snakeTail2.style.top=coords.snakeTail2[1]+'px';
    snakeTail3.style.left=coords.snakeTail3[0]+'px';
    snakeTail3.style.top=coords.snakeTail3[1]+'px';
    snakeTail4.style.left=coords.snakeTail4[0]+'px';
    snakeTail4.style.top=coords.snakeTail4[1]+'px';
    snakeTail5.style.left=coords.snakeTail5[0]+'px';
    snakeTail5.style.top=coords.snakeTail5[1]+'px';
    snakeHead.style['background-color']='rgb(120, 1, 1)';
    snakeBody.style['background-color']='red';
    snakeTail.style['background-color']='red';
    snakeTail1.style['background-color']='rgb(7,6,6)';
    snakeTail2.style['background-color']='rgb(7,6,6)';
    snakeTail3.style['background-color']='rgb(7,6,6)';
    snakeTail4.style['background-color']='rgb(7,6,6)';
    snakeTail5.style['background-color']='rgb(7,6,6)';
    //powerUp.style['background-color']='rgb(7,6,6)';
    for(let i=0;i<5;i++){
        let food=document.querySelector(`.${colours[i]}Food`);
        foodLeft=Math.floor(Math.random()*columns)*20;
        foodTop=Math.floor(Math.random()*rows)*20;
        if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
            foodLeft=Math.floor(Math.random()*columns)*20;
            foodTop=Math.floor(Math.random()*rows)*20;
        }
        console.log(foodLeft,foodTop);
        food.style.left=foodLeft+'px';
        food.style.top=foodTop+'px';
        foodCoords.push([foodLeft,foodTop]);
        console.log(food.style.left,food.style.top);
    }
}
let myInterval=1,foodCount=0,timerInterval=1,timeCounter=60,livesCtr=3,moveBy=10,freq=1000,tailCount=0;
let snakeScore=JSON.parse(localStorage.getItem('snakeScore'))||{
    currentScore:0,
    highScore:0};
document.querySelector('.high-score').innerText=`High Score: ${snakeScore.highScore}`;
let timeInterval=400,ulLimit=0,rLimit=400;
function addTimer(){
    clearInterval(timerInterval);
    startOverlay.style.display='none';
    timeCounter-=1;
    if(timeCounter%10==0){
        timeInterval-=40;
    }
    if(timeCounter===40){
        //powerUp.style['background-color']='rgb(7,6,6)';
        createPowerUp();
    }
    if(timeCounter===20){
        //powerUp.style['background-color']='rgb(7,6,6)';
        createPowerUp();
    }
    document.querySelector('.timer').innerText=`Time remaining: ${timeCounter}`;
    timerInterval=setInterval(addTimer,1000);
    if(timeCounter==0){
        livesCtr=0;
        gameOver(livesCtr);
    }
}
function pauseGame(){
    clearInterval(timerInterval);
    clearInterval(myInterval);
    overlay.style.display='block';
}
function resumeGame(){
    addTimer();
    overlay.style.display='none';
}
function moveSnakeR(){
    clearInterval(myInterval);
    let rLimit=gridSize*20-10;
    if(coords.snakeHead[0]<rLimit){
        //y-coords
        coords.snakeTail5[1]=coords.snakeTail4[1];
        coords.snakeTail4[1]=coords.snakeTail3[1];
        coords.snakeTail3[1]=coords.snakeTail2[1];
        coords.snakeTail2[1]=coords.snakeTail1[1];
        coords.snakeTail1[1]=coords.snakeTail[1];
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        snakeTail1.style.top=coords.snakeTail1[1]+'px';
        snakeTail2.style.top=coords.snakeTail2[1]+'px';
        snakeTail3.style.top=coords.snakeTail3[1]+'px';
        snakeTail4.style.top=coords.snakeTail4[1]+'px';
        snakeTail5.style.top=coords.snakeTail5[1]+'px';

        //x-coords
        coords.snakeTail5[0]=coords.snakeTail4[0];
        coords.snakeTail4[0]=coords.snakeTail3[0];
        coords.snakeTail3[0]=coords.snakeTail2[0];
        coords.snakeTail2[0]=coords.snakeTail1[0];
        coords.snakeTail1[0]=coords.snakeTail[0];
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        coords.snakeHead[0]+=moveBy;
        snakeHead.style.left=coords.snakeHead[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        snakeTail1.style.left=coords.snakeTail1[0]+'px';
        snakeTail2.style.left=coords.snakeTail2[0]+'px';
        snakeTail3.style.left=coords.snakeTail3[0]+'px';
        snakeTail4.style.left=coords.snakeTail4[0]+'px';
        snakeTail5.style.left=coords.snakeTail5[0]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top,snakeTail.style.left,snakeTail.style.top);
        myInterval=setInterval(moveSnakeR,timeInterval);

        //eating yourself
        if(coords.snakeTail2[0]===coords.snakeHead[0]&&coords.snakeTail2[1]===coords.snakeHead[1]&&snakeTail2.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail3[0]===coords.snakeHead[0]&&coords.snakeTail3[1]===coords.snakeHead[1]&&snakeTail3.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail4[0]===coords.snakeHead[0]&&coords.snakeTail4[1]===coords.snakeHead[1]&&snakeTail4.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail5[0]===coords.snakeHead[0]&&coords.snakeTail5[1]===coords.snakeHead[1]&&snakeTail5.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            tailCount++;
            document.querySelector(`.snakeTail${tailCount}`).style['background-color']='red';
            document.querySelector(`.snakeTail${tailCount}`).style['z-index']=`28-${tailCount}`;
            foodCoords=[];
            for(let i=0;i<5;i++){
                let food=document.querySelector(`.${colours[i]}Food`);
                foodLeft=Math.floor(Math.random()*columns)*20;
                foodTop=Math.floor(Math.random()*rows)*20;
                if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
                    foodLeft=Math.floor(Math.random()*columns)*20;
                    foodTop=Math.floor(Math.random()*rows)*20;
                }
                console.log(foodLeft,foodTop);
                food.style.left=foodLeft+'px';
                food.style.top=foodTop+'px';
                food.style.color='white';
                foodCoords.push([foodLeft,foodTop]);
                console.log(food.style.left,food.style.top);
            }
            foodCount=0;
        }

        //eating power-up
        if(snakeHead.style.left===powerUp.style.left&&snakeHead.style.top===powerUp.style.top){
            powerUp.style['background-color']='rgb(7,6,6)';
            let rando=Math.random();
            if(rando>0.5){
                powerTime=7;
                if(timeInterval<=200){
                    timeInterval-=100;
                    powerValue='fast100';
                }
                else{
                    timeInterval-=200;
                    powerValue='fast200';
                }
                powerUpTime();
            }
            else{
                powerTime=7;
                timeInterval+=200;
                powerValue='slow';
                powerUpTime();
            }
        }

        //eating-food
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['color']='black';
            food.style['z-index']=0;
            foodCount++;

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        wallSound.play();
        livesCtr--;
        if(livesCtr==0){
            clearInterval(myInterval);
            gameOver(livesCtr);
        }
        else{
            moveSnakeL();
            gameOver(livesCtr);
        }
    }
}
function moveSnakeL(){
    clearInterval(myInterval);
    if(coords.snakeHead[0]>ulLimit){
        //y-coords
        coords.snakeTail5[1]=coords.snakeTail4[1];
        coords.snakeTail4[1]=coords.snakeTail3[1];
        coords.snakeTail3[1]=coords.snakeTail2[1];
        coords.snakeTail2[1]=coords.snakeTail1[1];
        coords.snakeTail1[1]=coords.snakeTail[1];
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        snakeTail1.style.top=coords.snakeTail1[1]+'px';
        snakeTail2.style.top=coords.snakeTail2[1]+'px';
        snakeTail3.style.top=coords.snakeTail3[1]+'px';
        snakeTail4.style.top=coords.snakeTail4[1]+'px';
        snakeTail5.style.top=coords.snakeTail5[1]+'px';

        //x-coords
        coords.snakeTail5[0]=coords.snakeTail4[0];
        coords.snakeTail4[0]=coords.snakeTail3[0];
        coords.snakeTail3[0]=coords.snakeTail2[0];
        coords.snakeTail2[0]=coords.snakeTail1[0];
        coords.snakeTail1[0]=coords.snakeTail[0];
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        coords.snakeHead[0]-=moveBy;
        snakeHead.style.left=coords.snakeHead[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        snakeTail1.style.left=coords.snakeTail1[0]+'px';
        snakeTail2.style.left=coords.snakeTail2[0]+'px';
        snakeTail3.style.left=coords.snakeTail3[0]+'px';
        snakeTail4.style.left=coords.snakeTail4[0]+'px';
        snakeTail5.style.left=coords.snakeTail5[0]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top,snakeTail.style.left,snakeTail.style.top);
        myInterval=setInterval(moveSnakeL,timeInterval);
        
        //eating yourself
        if(coords.snakeTail2[0]===coords.snakeHead[0]&&coords.snakeTail2[1]===coords.snakeHead[1]&&snakeTail2.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail3[0]===coords.snakeHead[0]&&coords.snakeTail3[1]===coords.snakeHead[1]&&snakeTail3.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail4[0]===coords.snakeHead[0]&&coords.snakeTail4[1]===coords.snakeHead[1]&&snakeTail4.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail5[0]===coords.snakeHead[0]&&coords.snakeTail5[1]===coords.snakeHead[1]&&snakeTail5.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }

        //eating power-up
        if(snakeHead.style.left===powerUp.style.left&&snakeHead.style.top===powerUp.style.top){
            powerUp.style['background-color']='rgb(7,6,6)';
            let rando=Math.random();
            if(rando>0.5){
                powerTime=7;
                if(timeInterval<=200){
                    timeInterval-=100;
                    powerValue='fast100';
                }
                else{
                    timeInterval-=200;
                    powerValue='fast200';
                }
                powerUpTime();
            }
            else{
                powerTime=7;
                timeInterval+=200;
                powerValue='slow';
                powerUpTime();
            }
        }

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            tailCount++;
            document.querySelector(`.snakeTail${tailCount}`).style['background-color']='red';
            foodCoords=[];
            for(let i=0;i<5;i++){
                let food=document.querySelector(`.${colours[i]}Food`);
                foodLeft=Math.floor(Math.random()*columns)*20;
                foodTop=Math.floor(Math.random()*rows)*20;
                if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
                    foodLeft=Math.floor(Math.random()*columns)*20;
                    foodTop=Math.floor(Math.random()*rows)*20;
                }
                console.log(foodLeft,foodTop);
                food.style.left=foodLeft+'px';
                food.style.top=foodTop+'px';
                food.style.color='white';
                foodCoords.push([foodLeft,foodTop]);
                console.log(food.style.left,food.style.top);
            }
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['color']='black';
            food.style['z-index']=0;
            foodCount++;

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        wallSound.play();
        livesCtr--;
        if(livesCtr==0){
            clearInterval(myInterval);
            gameOver(livesCtr);
        }
        else{
            moveSnakeR();
            gameOver(livesCtr);
        }
    }
}
function moveSnakeU(){
    clearInterval(myInterval);
    if(coords.snakeHead[1]>ulLimit){
        //x-coords
        coords.snakeTail5[0]=coords.snakeTail4[0];
        coords.snakeTail4[0]=coords.snakeTail3[0];
        coords.snakeTail3[0]=coords.snakeTail2[0];
        coords.snakeTail2[0]=coords.snakeTail1[0];
        coords.snakeTail1[0]=coords.snakeTail[0];
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        snakeTail5.style.left=coords.snakeTail5[0]+'px';
        snakeTail4.style.left=coords.snakeTail4[0]+'px';
        snakeTail3.style.left=coords.snakeTail3[0]+'px';
        snakeTail2.style.left=coords.snakeTail2[0]+'px';
        snakeTail1.style.left=coords.snakeTail1[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';
        
        //y-coords
        coords.snakeTail5[1]=coords.snakeTail4[1];
        coords.snakeTail4[1]=coords.snakeTail3[1];
        coords.snakeTail3[1]=coords.snakeTail2[1];
        coords.snakeTail2[1]=coords.snakeTail1[1];
        coords.snakeTail1[1]=coords.snakeTail[1];
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        coords.snakeHead[1]-=moveBy;
        snakeHead.style.top=coords.snakeHead[1]+'px';
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        snakeTail1.style.top=coords.snakeTail1[1]+'px';
        snakeTail2.style.top=coords.snakeTail2[1]+'px';
        snakeTail3.style.top=coords.snakeTail3[1]+'px';
        snakeTail4.style.top=coords.snakeTail4[1]+'px';
        snakeTail5.style.top=coords.snakeTail5[1]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top,snakeTail.style.left,snakeTail.style.top);
        myInterval=setInterval(moveSnakeU,timeInterval);

        //eating yourself
        if(coords.snakeTail2[0]===coords.snakeHead[0]&&coords.snakeTail2[1]===coords.snakeHead[1]&&snakeTail2.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail3[0]===coords.snakeHead[0]&&coords.snakeTail3[1]===coords.snakeHead[1]&&snakeTail3.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail4[0]===coords.snakeHead[0]&&coords.snakeTail4[1]===coords.snakeHead[1]&&snakeTail4.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail5[0]===coords.snakeHead[0]&&coords.snakeTail5[1]===coords.snakeHead[1]&&snakeTail5.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }

        //eating power-up
        if(snakeHead.style.left===powerUp.style.left&&snakeHead.style.top===powerUp.style.top){
            powerUp.style['background-color']='rgb(7,6,6)';
            let rando=Math.random();
            if(rando>0.5){
                powerTime=7;
                if(timeInterval<=200){
                    timeInterval-=100;
                    powerValue='fast100';
                }
                else{
                    timeInterval-=200;
                    powerValue='fast200';
                }
                powerUpTime();
            }
            else{
                powerTime=7;
                timeInterval+=200;
                powerValue='slow';
                powerUpTime();
            }
        }

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            tailCount++;
            document.querySelector(`.snakeTail${tailCount}`).style['background-color']='red';
            foodCoords=[];
            for(let i=0;i<5;i++){
                let food=document.querySelector(`.${colours[i]}Food`);
                foodLeft=Math.floor(Math.random()*columns)*20;
                foodTop=Math.floor(Math.random()*rows)*20;
                if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
                    foodLeft=Math.floor(Math.random()*columns)*20;
                    foodTop=Math.floor(Math.random()*rows)*20;
                }
                console.log(foodLeft,foodTop);
                food.style.left=foodLeft+'px';
                food.style.top=foodTop+'px';
                food.style.color='white';
                foodCoords.push([foodLeft,foodTop]);
                console.log(food.style.left,food.style.top);
            }
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['color']='black';
            food.style['z-index']=0;
            foodCount++;

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        wallSound.play();
        livesCtr--;
        if(livesCtr==0){
            clearInterval(myInterval);
            gameOver(livesCtr);
        }
        else{
            moveSnakeD();
            gameOver(livesCtr);
        }
    }
}
function moveSnakeD(){
    clearInterval(myInterval);
    let dLimit=gridSize*20-10;
    if(coords.snakeHead[1]<dLimit){
        //x-coords
        coords.snakeTail5[0]=coords.snakeTail4[0];
        coords.snakeTail4[0]=coords.snakeTail3[0];
        coords.snakeTail3[0]=coords.snakeTail2[0];
        coords.snakeTail2[0]=coords.snakeTail1[0];
        coords.snakeTail1[0]=coords.snakeTail[0];
        coords.snakeTail[0]=coords.snakeBody[0];
        coords.snakeBody[0]=coords.snakeHead[0];
        snakeTail5.style.left=coords.snakeTail5[0]+'px';
        snakeTail4.style.left=coords.snakeTail4[0]+'px';
        snakeTail3.style.left=coords.snakeTail3[0]+'px';
        snakeTail2.style.left=coords.snakeTail2[0]+'px';
        snakeTail1.style.left=coords.snakeTail1[0]+'px';
        snakeTail.style.left=coords.snakeTail[0]+'px';
        snakeBody.style.left=coords.snakeBody[0]+'px';

        //y-coords
        coords.snakeTail5[1]=coords.snakeTail4[1];
        coords.snakeTail4[1]=coords.snakeTail3[1];
        coords.snakeTail3[1]=coords.snakeTail2[1];
        coords.snakeTail2[1]=coords.snakeTail1[1];
        coords.snakeTail1[1]=coords.snakeTail[1];
        coords.snakeTail[1]=coords.snakeBody[1];
        coords.snakeBody[1]=coords.snakeHead[1];
        coords.snakeHead[1]+=moveBy;
        snakeHead.style.top=coords.snakeHead[1]+'px';
        snakeBody.style.top=coords.snakeBody[1]+'px';
        snakeTail.style.top=coords.snakeTail[1]+'px';
        snakeTail1.style.top=coords.snakeTail1[1]+'px';
        snakeTail2.style.top=coords.snakeTail2[1]+'px';
        snakeTail3.style.top=coords.snakeTail3[1]+'px';
        snakeTail4.style.top=coords.snakeTail4[1]+'px';
        snakeTail5.style.top=coords.snakeTail5[1]+'px';
        console.log(snakeHead.style.left,snakeHead.style.top,snakeTail.style.left,snakeTail.style.top);
        myInterval=setInterval(moveSnakeD,timeInterval);

        //eating yourself
        if(coords.snakeTail2[0]===coords.snakeHead[0]&&coords.snakeTail2[1]===coords.snakeHead[1]&&snakeTail2.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail3[0]===coords.snakeHead[0]&&coords.snakeTail3[1]===coords.snakeHead[1]&&snakeTail3.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail4[0]===coords.snakeHead[0]&&coords.snakeTail4[1]===coords.snakeHead[1]&&snakeTail4.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }
        if(coords.snakeTail5[0]===coords.snakeHead[0]&&coords.snakeTail5[1]===coords.snakeHead[1]&&snakeTail5.style['background-color']==='red'){
            livesCtr--;
            gameOver(livesCtr);
        }

        //eating power-up
        if(snakeHead.style.left===powerUp.style.left&&snakeHead.style.top===powerUp.style.top){
            powerUp.style['background-color']='rgb(7,6,6)';
            let rando=Math.random();
            if(rando>0.5){
                powerTime=7;
                if(timeInterval<=200){
                    timeInterval-=100;
                    powerValue='fast100';
                }
                else{
                    timeInterval-=200;
                    powerValue='fast200';
                }
                powerUpTime();
            }
            else{
                powerTime=7;
                timeInterval+=200;
                powerValue='slow';
                powerUpTime();
            }
        }

        //food-check
        if(foodCount>4){
            snakeScore.currentScore+=50;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
            tailCount++;
            document.querySelector(`.snakeTail${tailCount}`).style['background-color']='red';
            foodCoords=[];
            for(let i=0;i<5;i++){
                let food=document.querySelector(`.${colours[i]}Food`);
                foodLeft=Math.floor(Math.random()*columns)*20;
                foodTop=Math.floor(Math.random()*rows)*20;
                if(foodLeft===180||foodLeft===190||foodLeft===200||foodTop===200){
                    foodLeft=Math.floor(Math.random()*columns)*20;
                    foodTop=Math.floor(Math.random()*rows)*20;
                }
                console.log(foodLeft,foodTop);
                food.style.left=foodLeft+'px';
                food.style.top=foodTop+'px';
                food.style.color='white';
                foodCoords.push([foodLeft,foodTop]);
                console.log(food.style.left,food.style.top);
            }
            foodCount=0;
        }
        if(snakeHead.style.left===foodCoords[foodCount][0]+'px'&&snakeHead.style.top===foodCoords[foodCount][1]+'px'){
            //updating food
            let food=document.querySelector(`.${colours[foodCount]}Food`);
            food.style['color']='black';
            food.style['z-index']=0;
            foodCount++;

            //updating score
            snakeScore.currentScore+=10;
            document.querySelector('.cur-score').innerText=`Score: ${snakeScore.currentScore}`;
        }
    }
    else{
        wallSound.play();
        livesCtr--;
        if(livesCtr==0){
            clearInterval(myInterval);
            gameOver(livesCtr);
        }
        else{
            moveSnakeU();
            gameOver(livesCtr);
        }
    }
}
function createPowerUp(){
    powerUp.style['background-color']=`${colours[Math.floor(Math.random()*5)]}`;
    powerUpLeft=Math.floor(Math.random()*columns)*20;
    powerUpTop=Math.floor(Math.random()*rows)*20;
    powerUp.style.left=powerUpLeft+'px';
    powerUp.style.top=powerUpTop+'px';
}
function powerUpTime(){
    clearInterval(powerInterval);
    console.log(powerValue);
    console.log(powerTime);
    powerTime-=1;
    if(powerTime===0){
        if(powerValue==='fast100'){
            timeInterval+=100;
            return;
        }
        else if(powerValue==='fast200'){
            timeInterval+=200;
            return;
        }
        else if(powerValue==='slow'){
            timeInterval-=200;
            return;
        }
    }
    powerInterval=setInterval(powerUpTime,1000);
}
function gameOver(livesCtr){
    if(livesCtr===0){
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
    else{
        livesPara.innerText=`Lives: ${livesCtr}`;
    }
}