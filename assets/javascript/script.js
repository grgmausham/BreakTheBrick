//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player character
let playerWidth = 80;
let playerHeight = 10;

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width : playerWidth,
    height : playerHeight
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
}