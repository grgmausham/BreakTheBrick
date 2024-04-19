//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player character
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 25;//board speed


let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
}
//breaker,ball
let balWidth = 10;
let ballHeight = 10;
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

//Bricks or Blocks
let blockArray = []
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;//limits the total blocks per lvl
let blockMaxRows = 10;
let  blockCount = 0;

let blockX = 15;
let blockY = 45;

//score
let score = 0;

//game over
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    //for drawing on the board
    context = board.getContext("2d");

    //player character
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //blocks when game loads
    createBlocks();
}
//game loop
function update() {
    requestAnimationFrame(update);
    //game over
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height)

    //player board
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);

    // creats ball in board
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    
    //collision of ball in player board
     if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;
    
    }

    //bounce the ball when comes in conatct with borders
    if(ball.y <= 0) {
        ball.velocityY *= -1;//if the ball touches top of game board
    }
    else if (ball.x <= 0 || (ball.x + ball.width) >= boardWidth) {
        ball.velocityX *= -1;//if ball touches either side left or right side of game board
    }
    else if (ball.y + ball.height >= boardHeight) {
        context.font = "25px sans-serif";
        context.fillText("Game Over: Press 'Space' To Restart", 50, 400);
        gameOver = true;
    }


    //blocks
    context.fillStyle = "White";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1;
                score += 1;
                blockCount -= 1;
                
            }
            else if (leftCollision(ball, block) || rightCollision(ball,block)) {
                block.break = true;
                ball.velocityX *= -1;
                score += 1;
                blockCount -= 1;
               
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
    // next levels
    if (blockCount == o) {
        blockRows = Math.min(blockRows + 1 , blockMaxRows);
        createBlocks();
    }

    //score
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}
//prevents players from exiting the board border
function outofBorder(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

// moves the player board on keypress
function movePlayer(e) {
    //Reset the game when player losses and press 'Space' button
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
        }
    }


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

//blocks 
function createBlocks() {
    blockArray = [];
    //columns count
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10,
                y : blockY + r*blockHeight + r*10,
                width : blockHeight,
                height : blockHeight, 
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

//Reset game
function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width : playerWidth,
        height : playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width : balWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }
    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}