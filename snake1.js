let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.border = '2px solid blue';
canvas.style.backgroundColor = 'cyan';
let c = canvas.getContext('2d');
let posSnakeX = 360;
let posSnakeY = 360;
let widthSnake = 40;
let heightSnake = 40;
let speedSnakeX =0;
let speedSnakeY =0;
let arrSnake=[];
let time = 300;
let posXFood = Math.floor(Math.random()*((760-40)+1) +40);
while(1) {
    if (posXFood % 40 ===0) {
        break;
    }
    posXFood = Math.floor(Math.random()*((760-40)+1) +40);
}
let posYFood = Math.floor(Math.random()*((760-40)+1) +40);
while(1) {
    if (posYFood % 40 ===0) {
        break;
    }
    posYFood = Math.floor(Math.random()*((760-40)+1) +40);
}
let widthFood = 40;
let heightFood = 40;
let countScore = 0;

let scoreStorage = [];
let playersStorage = [];
if (localStorage.scoreStorage) {
    scoreStorage = localStorage.getItem('scoreStorage').split(',');
} else {
    localStorage.scoreStorageNew='';
}
if (localStorage.playersStorage) {
    playersStorage = localStorage.getItem('playersStorage').split(',');
} else {
    localStorage.playersStorageNew='';
}
let storage = arrange(scoreStorage,playersStorage);
console.log(storage);
let scoreStorage1 = storage[0];
let playersStorage1 = storage[1];
let player;
let data='';
let grd = c.createLinearGradient(0, 0, 800, 0);
grd.addColorStop(0, 'red');
grd.addColorStop(0.2, 'orange');
grd.addColorStop(0.4, 'yellow');
grd.addColorStop(0.6, 'green');
grd.addColorStop(0.75, 'blue');
grd.addColorStop(0.9, 'indigo');
grd.addColorStop(1, 'black');
let myInterval;

function Snake(x, y, width, height,Vx,Vy) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.speedX = Vx;
    this.speedY = Vy;
    this.draw = function () {
        c.beginPath();
        c.fillStyle = grd;
        c.fillRect(this.positionX, this.positionY, this.width, this.height);
        c.strokeStyle = 'brown';
        c.strokeRect(this.positionX, this.positionY, this.width, this.height);
        c.closePath();
    };
    this.drawHead = function () {
        c.beginPath();
        c.arc(this.positionX+this.width/2, this.positionY + this.height/2, this.width/2, 0, Math.PI*2)
        // c.fillStyle = 'purple';
        // c.fillRect(this.positionX, this.positionY, this.width, this.height);
        // c.strokeStyle = 'yellow';
        // c.strokeRect(this.positionX, this.positionY, this.width, this.height);
        c.closePath();
        c.fillStyle = 'purple';
        c.fill();
    };
    this.turn = function (e) {
        if (e.keyCode ===37 && speedSnakeX===0) {
            speedSnakeX = -40;
            speedSnakeY =0;
        }
        if (e.keyCode ===39 && speedSnakeX===0) {
            speedSnakeX = 40;
            speedSnakeY =0;
        }
        if (e.keyCode ===38 && speedSnakeY===0) {
            speedSnakeX = 0;
            speedSnakeY =-40;
        }
        if (e.keyCode ===40 && speedSnakeY===0) {
            speedSnakeX = 0;
            speedSnakeY =40;
        }
    };
    this.move = function () {
        if (this.positionX >= 800 && this.speedX >=0) {
            posSnakeX =0;
        } else if (this.positionX <= 0 && this.speedX<0) {
            posSnakeX =760;
        } else if(this.positionY >= 800 && this.speedY>0) {
            posSnakeY =0;
        } else if (this.positionY <= 0 && this.speedY<0) {
            posSnakeY =760;
        } else {
            posSnakeX+=speedSnakeX;
            posSnakeY+=speedSnakeY;
        }
    }
    // this.touchHFrame = function () {
    //     if (this.positionX >= 800 && this.speedX>0) {
    //         // posSnakeX =0;
    //         this.positionX = 0;
    //     }
    //     if (this.positionX <= -40 && this.speedX<0) {
    //         // posSnakeX =800;
    //         this.positionX = 800;
    //     }
    //     if (this.positionY >= 800 && this.speedY>0) {
    //         // posSnakeY =0;
    //         this.positionY = 0;
    //     }
    //     if (this.positionY <= -40 && this.speedY<0) {
    //         // posSnakeY =800;
    //         this.positionY = 800;
    //     }
    // };
    this.checkLose = function () {
        for(let i=0; i<arrSnake.length-1; i++) {
            if ((arrSnake[arrSnake.length-1].positionX === arrSnake[i].positionX) &&
                (arrSnake[arrSnake.length-1].positionY === arrSnake[i].positionY)) {
                clearInterval(myInterval);
                if (countScore > scoreStorage1[4] || !scoreStorage1[4]) {
                    newRecord.play();
                    whoIsBest();
                } else {
                    gameOver.draw();
                    overSound.play();
                }
            }
        }
    }
}

function Food(x, y, width, height) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.draw = function () {
        c.beginPath();
        c.fillStyle = 'red';
        c.fillRect(this.positionX, this.positionY, this.width, this.height);
        c.closePath();
    }
    this.checkPosition = function () {
        for (let i=0; i<arrSnake.length; i++) {
            while (this.positionX === arrSnake[i].positionX && this.positionY === arrSnake[i].positionY) {
                this.positionX = Math.floor(Math.random()*((760-40)+1) +40);
                while(1) {
                    if (this.positionX % 40 ===0) {
                        break;
                    }
                    this.positionX = Math.floor(Math.random()*((760-40)+1) +40);
                }
                this.positionY = Math.floor(Math.random()*((760-40)+1) +40);
                while(1) {
                    if (this.positionY % 40 ===0) {
                        break;
                    }
                    this.positionY = Math.floor(Math.random()*((760-40)+1) +40);
                }
            }
        }
    }
    this.eatFood = function () {
        if ((arrSnake[arrSnake.length-1].positionX  === this.positionX &&
            arrSnake[arrSnake.length-1].positionY  === this.positionY)) {
            arrSnake.push(new Snake(this.positionX, this.positionY, this.width, this.height, speedSnakeX, speedSnakeY))
            this.positionX = Math.floor(Math.random()*((760-40)+1) +40);
            while(1) {
                if (this.positionX % 40 ===0) {
                    break;
                }
                this.positionX = Math.floor(Math.random()*((760-40)+1) +40);
            }

            this.positionY = Math.floor(Math.random()*((760-40)+1) +40);
            while(1) {
                if (this.positionY % 40 ===0) {
                    break;
                }
                this.positionY = Math.floor(Math.random()*((760-40)+1) +40);
            }
            this.checkPosition();
            eatSound.play();
            countScore++;
            switch (countScore) {
                case 1:
                    clearInterval(myInterval);
                    myInterval = setInterval(animate,200);
                    break;
                case 5:
                    clearInterval(myInterval);
                    myInterval = setInterval(animate,100);
                    break;
                case 10:
                    clearInterval(myInterval);
                    myInterval = setInterval(animate,75);
                    break;
                case 20:
                    clearInterval(myInterval);
                    myInterval = setInterval(animate,50);
                    break;
            }
        }
    };
}
function Score(text, x, y) {
    this.text = text;
    this.positionX = x;
    this.positionY = y;
    this.draw = function() {
        this.score = 'Score: ' + countScore;
        c.strokeStyle = 'orange';
        c.strokeText(this.score, this.positionX, this.positionY);
        c.font= '30px Arial';
        c.textAlign='center';
    }
}
function GameOver(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.draw = function() {
        this.text = 'GAMEOVER';
        c.font= '100px Arial';
        c.fillStyle = 'red';
        c.fillText(this.text, this.positionX, this.positionY);
        c.textAlign='center';
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    // this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.autoPlay = function () {
        this.sound.setAttribute("autoplay", "autoplay");
    };
    this.display=function () {
        this.sound.setAttribute("controls", "none");
    }
    this.loop = function () {
        this.sound.setAttribute("loop", "loop");
    }
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.load();
    }
}
    arrSnake.push(new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX, speedSnakeY));
    let food = new Food(posXFood, posYFood, widthFood, heightFood);
    let score = new Score('Score: ' + countScore, 380, 30);
    let gameOver = new GameOver(400,400);
    myInterval = setInterval(animate,time);
    printLeaderBoard();
    let eatSound = new sound('Sound/ball.wav');
    let overSound = new sound('Sound/gameover.mp3');
    let startGame = new sound('Sound/Startgame.wav');
    let newRecord = new sound('Sound/Top5.wav');

function animate() {
    c.clearRect(0,0,800,800);
    for (let i=0; i<arrSnake.length; i++) {
        if (i === arrSnake.length-1) {
            arrSnake[i].drawHead();
        } else {
            arrSnake[i].draw();
        }
    }
    document.addEventListener('keydown',turnSnake)
    arrSnake[arrSnake.length-1].move();
    // posSnakeX+=speedSnakeX;
    // posSnakeY+=speedSnakeY;
    arrSnake.push(new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX, speedSnakeY));
    arrSnake.shift();
    // arrSnake[arrSnake.length-1].touchHFrame();
    arrSnake[arrSnake.length-1].checkLose();
    food.draw();
    food.eatFood();
    score.draw();
    console.log(arrSnake);
}

function turnSnake(event) {
    // startGame.stop();
    for(let i=0; i<arrSnake.length; i++) {
        arrSnake[i].turn(event);
    }
}
function backgroundSound() {
    startGame.play();
    startGame.loop();
    startGame.display();
}
function reset() {
    // startGame.loop();
    // startGame.play();
    // startGame.display();
    clearInterval(myInterval);
    arrSnake=[];
    countScore=0;
    posSnakeX = 360;
    posSnakeY = 360;
    speedSnakeX =0;
    speedSnakeY =0;
    arrSnake=[];
    time = 300;
    arrSnake.push(new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX, speedSnakeY));
    food.positionX = Math.floor(Math.random()*((760-40)+1) +40);
    while(1) {
        if (food.positionX % 40 ===0) {
            break;
        }
        food.positionX = Math.floor(Math.random()*((760-40)+1) +40);
    }
    food.positionY = Math.floor(Math.random()*((760-40)+1) +40);
    while(1) {
        if (food.positionY % 40 ===0) {
            break;
        }
        food.positionY = Math.floor(Math.random()*((760-40)+1) +40);
    }
    myInterval = setInterval(animate,time);
}

function whoIsBest() {
    player = prompt('Enter your name');
    if (player === '') {
        player='Noname';
    }
    scoreStorage.push(countScore);
    playersStorage.push(player);
    if(scoreStorage.length>5) {
        scoreStorage.pop();
        playersStorage.pop();
    }
    storage = arrange(scoreStorage,playersStorage);
    scoreStorage1 = storage[0];
    playersStorage1 = storage[1];
    if(typeof (Storage) !== 'undefined') {
        localStorage.setItem('scoreStorage',String(scoreStorage1));
        localStorage.setItem('playersStorage',String(playersStorage1));
    }
    printLeaderBoard();
}

function arrange(arr1,arr2) {
    let arr = [arr1,arr2];
    let Max;
    let middle;
    let middleChar;
    for(let i=0; i<arr1.length; i++) {
        Max = Number(arr1[i]);
        for (let j = i; j < arr1.length; j++) {
            if (Number(arr1[j]) > Max) {
                Max = Number(arr1[j]);
            }
        }
        middle = Number(arr1[i]);
        middleChar = arr2[i];
        for (let k = i; k < arr1.length; k++) {
            if (Number(arr1[k]) === Max) {
                arr1[i] = arr1[k];
                arr1[k] = middle;
                arr2[i] = arr2[k];
                arr2[k] = middleChar;
                break;
            }
        }
    }
    return arr;
}

function printLeaderBoard () {
    data+= '<ol>';
    for (let i=0; i<5; i++) {
        if (scoreStorage1[i]) {
            data+= '<li>' + playersStorage1[i] +': '
                + '&emsp;' + scoreStorage1[i] + '</li>';
        }
    }
    data+= '</ol>'
    document.getElementById('scoreboard').innerHTML=data;
    data='';
}




