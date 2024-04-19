//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player character
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 20;//board speed


let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
}
//breaker,ball
let balWidth = 15;
let ballHeight = 15;
//ball initial velocity when screen loads
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : balWidth,
    height: ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    //for drawing on the board
    context = board.getContext("2d");

    //player character
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
}
//game loop
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height)

    //player board
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);

    // creats ball in board
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height)


    //bounce the ball when comes in conatct with borders
    if(ball.y <= 0) {
        ball.velocityY *= -1;//if the ball touches top of game board
    }
    else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        ball.velocityX *= -1;//if ball touches either side left or right side of game board
    }
    else if (ball.y + ball.height >= boardHeight) {
     //game over
    }

    //collision of ball in player board
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    
    }
}
//prevents players from exiting the board border
function outofBorder(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

// moves the player board on keypress
function movePlayer(e) {
    if (e.code == "ArrowLeft") {
        let nextPlayerX = player.x - player.velocityX;
        if (!outofBorder(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        //player.x += player.velocityX
        let nextPlayerX = player.x + player.velocityX;
        if (!outofBorder(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    }
}

//collision between player board and ball
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// detects which side of player board ball collides
function topCollision(ball, block) {
    return detectCollision(ball, block) && (ball.y + ball.height >= block.y);
}

function bottomCollision(ball, block) {
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) {
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) {
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}