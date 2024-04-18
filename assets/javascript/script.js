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
    context.clearRect(0, 0, board.width, board.height)

    //player board
    context.fillStyle = "Gold";
    context.fillRect(player.x, player.y, player.width, player.height);
}
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