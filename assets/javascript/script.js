//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player character
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;


let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight,
    velocityX : playerVelocityX
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

function update() {
    requestAnimationFrame(update);
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer(e) {
    if (e.code == "ArrowLeft") {
        player.x -= player.velocityX;
    }
    else if (e.code == "ArrowRight") {
        player.x += player.velocityX
    }
}