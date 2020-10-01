let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.border = '2px solid blue';
let c = canvas.getContext('2d');
let posSnakeX = 360;
let posSnakeY = 360;
let widthSnake = 40;
let heightSnake = 40;
let speedSnakeX =0;
let speedSnakeY =0;
let arrSnake=[];
// let posXFood = Math.floor(Math.random()*800+1);
// let posYFood = Math.floor(Math.random()*800+1);
// let widthFood = 40;
// let heightFood = 40;
// let grd = c.createLinearGradient(0, 0, 800, 0)
// let quantity =3;
let rqID;

function Snake(x, y, width, height, Vx, Vy) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.speedX = Vx;
    this.speedY = Vy;
    this.draw = function () {
        c.beginPath();
        c.fillStyle = 'lightgray';
        c.fillRect(this.positionX, this.positionY, this.width, this.height);
        c.closePath();
    }
    this.setFood = function (food) {
      this.food = food;
    };
    this.turn = function (e) {
        if (e.keyCode ===37) {
            speedSnakeX = -40;
            speedSnakeY =0;
        }
        if (e.keyCode ===39) {
            speedSnakeX = 40;
            speedSnakeY =0;
        }
        if (e.keyCode ===38) {
            speedSnakeX = 0;
            speedSnakeY =-40;
        }
        if (e.keyCode ===40) {
            speedSnakeX = 0;
            speedSnakeY =40;
        }
    }
    this.touchHFrame = function () {
        if (this.positionX + this.width === 840 && this.speedX>0) {
            posSnakeX =-40;
        }
        if (this.positionX === 0 && this.speedX<0) {
            posSnakeX =840;
        }
        if (this.positionY + this.height === 840 && this.speedY>0) {
            posSnakeY =-40;
        }
        if (this.positionY === 0 && this.speedY<0) {
            posSnakeY =840;
        }
    }
}

function Food(x, y, width, height, Vx, Vy) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.draw = function () {
        c.beginPath();
        c.fillStyle = 'lightgray';
        c.fillRect(this.positionX, this.positionY, this.width, this.height);
        c.closePath();
    }
}
let snake = new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX, speedSnakeY);
arrSnake.push(new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX,speedSnakeY));
// let food = new Food(posXFood, posYFood, widthFood, heightFood);
// rqID = setInterval(animate,500);
arrSnake[0].draw();
console.log(arrSnake[0]);
console.log(posSnakeY);

function animate() {
    c.clearRect(0,0,800,800);
    window.addEventListener('keydown',turnCondition)
    for (let i=0; i<arrSnake; i++) {
        arrSnake[i].draw();

    }
    // posSnakeX+=speedSnakeX;
    // posSnakeY+=speedSnakeY;
    // arrSnake.push(new Snake(posSnakeX, posSnakeY, widthSnake, heightSnake, speedSnakeX,speedSnakeY));
    // arrSnake.shift();
    // arrSnake[arrSnake.length-1].touchHFrame();
    // food.draw();
}

// function turnCondition(event) {
//     for(let i=0; i<quantity; i++) {
//         arrSnake[i].turn(event);
//     }
// }


