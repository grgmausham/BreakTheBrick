//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;


window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight
    board.width = boardWidth
    //for drawing on the board
    context = board.getContext("2d");
}