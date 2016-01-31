// 'use strict';

var TilePuzzle = function() {
  // 'use strict';
  console.log("TilePuzzle arrival!");
  this.PUZZLE_DIFFICULTY = 3; // (ex. 4) Number across
  this.PUZZLE_HOVER_TINT = '#009900';

  this.canvas = null;
  this.stage = null;

  this.img = null;
  this.pieces = null;
  this.puzzleWidth = null;
  this.puzzleHeight = null;
  this.pieceWidth = null;
  this.pieceHeight = null;
  this.currentPiece = null;
  this.currentDropPiece = null;

  this.mouse = null;
};

TilePuzzle.prototype.init = function() {
  console.log("TilePuzzle.prototype.init arrival");

  var that = this;

  this.img = new Image();
  this.img.addEventListener("load", function() {
      console.log("IMAGE LOADED! ");
      that.onImageLoad();
    }, false);
  this.img.src = 'FERobot.jpg';

  console.log("TilePuzzle.prototype.init exit");
};

TilePuzzle.prototype.onImageLoad = function() {
  console.log("TilePuzzle.prototype.onImageLoad arrival;  DIFF = " + this.PUZZLE_DIFFICULTY);
  this.pieceWidth = Math.floor(this.img.width / this.PUZZLE_DIFFICULTY)
  this.pieceHeight = Math.floor(this.img.height / this.PUZZLE_DIFFICULTY)
  this.puzzleWidth = this.pieceWidth * this.PUZZLE_DIFFICULTY;
  this.puzzleHeight = this.pieceHeight * this.PUZZLE_DIFFICULTY;
  this.setCanvas();
  this.initPuzzle();
};

TilePuzzle.prototype.setCanvas = function() {
  console.log("TilePuzzle.prototype.setCanvas arrival");
  this.canvas = document.getElementById('canvas');
  this.stage = this.canvas.getContext('2d');
  this.canvas.width = this.puzzleWidth;
  this.canvas.height = this.puzzleHeight;
  this.canvas.style.border = "1px solid black";
};

TilePuzzle.prototype.initPuzzle = function() {
  console.log("TilePuzzle.prototype.initPuzzle arrival");
  this.pieces = [];
  this.mouse = {x:0,y:0};
  this.currentPiece = null;
  this.currentDropPiece = null;
  this.stage.drawImage(this.img, 0, 0, this.puzzleWidth, this.puzzleHeight, 0, 0, this.puzzleWidth, this.puzzleHeight);
  this.createTitle("Click to Start Puzzle");
  this.buildPieces();
};

TilePuzzle.prototype.createTitle = function(msg){
  console.log("TilePuzzle.prototype.createTitle arrival");
  this.stage.fillStyle = "#000000";
  this.stage.globalAlpha = 0.4;
  this.stage.fillRect(100,this.puzzleHeight - 40,this.puzzleWidth - 200,40);
  this.stage.fillStyle = "#FFFFFF";
  this.stage.globalAlpha = 1;
  this.stage.textAlign = "center";
  this.stage.textBaseline = "middle";
  this.stage.font = "20px Arial";
  this.stage.fillText(msg,this.puzzleWidth / 2,this.puzzleHeight - 20);
};

TilePuzzle.prototype.buildPieces = function() {
  console.log("TilePuzzle.prototype.buildPieces arrival");
  var i;
  var piece;
  var xPos = 0;
  var yPos = 0;
  for(i = 0;i < this.PUZZLE_DIFFICULTY * this.PUZZLE_DIFFICULTY;i++){
    piece = {};
    piece.sx = xPos;
    piece.sy = yPos;
    this.pieces.push(piece);
    xPos += this.pieceWidth;
    if(xPos >= this.puzzleWidth){
        xPos = 0;
        yPos += this.pieceHeight;
    }
  }

  var that = this;
  document.onmousedown = this.shufflePuzzle.bind(that); // Starts the game
};

TilePuzzle.prototype.shufflePuzzle = function() {
  console.log("TilePuzzle.prototype.shufflePuzzle arrival");
  this.pieces = this.shuffleArray(this.pieces);
  this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
  var i;
  var piece;
  var xPos = 0;
  var yPos = 0;
  for(i = 0;i < this.pieces.length;i++){
    piece = this.pieces[i];
    piece.xPos = xPos;
    piece.yPos = yPos;
    // drawImage( sourceImg, sourceX, sourceY, sourceW, sourceH,
    //      canvasX, canvasY, width, height );
    this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, xPos, yPos, this.pieceWidth, this.pieceHeight);
    this.stage.strokeRect(xPos, yPos, this.pieceWidth,this.pieceHeight);
    xPos += this.pieceWidth;
    if(xPos >= this.puzzleWidth){
      xPos = 0;
      yPos += this.pieceHeight;
    }
  }

  var that = this;
  document.onmousedown = this.onPuzzleClick.bind(that); // Listen for click on the puzzle, somewhere.
};

// Nice, (but hard to read) shuffle function
// Nicer version here...
// http://active.tutsplus.com/tutorials/actionscript/quick-tip-how-to-randomly-shuffle-an-array-in-as3/
TilePuzzle.prototype.shuffleArray = function(o) {
  console.log("TilePuzzle.prototype.shuffleArray arrival");
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

TilePuzzle.prototype.onPuzzleClick = function(e) {
  console.log("TilePuzzle.prototype.onPuzzleClick arrival");
  if(e.layerX || e.layerX == 0){
    this.mouse.x = e.layerX - this.canvas.offsetLeft;
    this.mouse.y = e.layerY - this.canvas.offsetTop;
  }
  else if(e.offsetX || e.offsetX == 0){
    this.mouse.x = e.offsetX - this.canvas.offsetLeft;
    this.mouse.y = e.offsetY - this.canvas.offsetTop;
  }
  this.currentPiece = this.checkPieceClicked();
  if(this.currentPiece != null){
    this.stage.clearRect(this.currentPiece.xPos,this.currentPiece.yPos,this.pieceWidth,this.pieceHeight);
    this.stage.save();
    this.stage.globalAlpha = .9;
    this.stage.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
    this.stage.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
    this.stage.restore();

    var that = this;
    document.onmousemove = this.updatePuzzle.bind(that);
    document.onmouseup = this.pieceDropped.bind(that);
  }
};

TilePuzzle.prototype.checkPieceClicked = function() {
  console.log("TilePuzzle.prototype.checkPieceClicked arrival");
  var i;
  var piece;
  for(i = 0;i < this.pieces.length;i++){
    piece = this.pieces[i];
    if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
        //PIECE NOT HIT
    }
    else{
      return piece;
    }
  }
  return null;
};

TilePuzzle.prototype.updatePuzzle = function(e) {
  console.log("TilePuzzle.prototype.updatePuzzle arrival");
  this.currentDropPiece = null;
  if(e.layerX || e.layerX == 0){
    this.mouse.x = e.layerX - this.canvas.offsetLeft;
    this.mouse.y = e.layerY - this.canvas.offsetTop;
  }
  else if(e.offsetX || e.offsetX == 0){
    this.mouse.x = e.offsetX - this.canvas.offsetLeft;
    this.mouse.y = e.offsetY - this.canvas.offsetTop;
  }
  this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
  var i;
  var piece;
  for(i = 0;i < this.pieces.length;i++){
    piece = this.pieces[i];
    if(piece == this.currentPiece){
      continue; // Keep the current piece's home slot empty.
    }
    // Draw the currently held piece.
    this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
    this.stage.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
    if(this.currentDropPiece == null){
      if(this.mouse.x < piece.xPos || this.mouse.x > (piece.xPos + this.pieceWidth) || this.mouse.y < piece.yPos || this.mouse.y > (piece.yPos + this.pieceHeight)){
        //NOT OVER
      }
      else{
        this.currentDropPiece = piece;
        this.stage.save();
        this.stage.globalAlpha = .4;
        this.stage.fillStyle = this.PUZZLE_HOVER_TINT;
        this.stage.fillRect(this.currentDropPiece.xPos,this.currentDropPiece.yPos,this.pieceWidth, this.pieceHeight);
        this.stage.restore();
      }
    }
  }
  this.stage.save();
  this.stage.globalAlpha = .6;
  this.stage.drawImage(this.img, this.currentPiece.sx, this.currentPiece.sy, this.pieceWidth, this.pieceHeight, this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth, this.pieceHeight);
  this.stage.restore();
  this.stage.strokeRect( this.mouse.x - (this.pieceWidth / 2), this.mouse.y - (this.pieceHeight / 2), this.pieceWidth,this.pieceHeight);
};

TilePuzzle.prototype.pieceDropped = function(e) {
  console.log("TilePuzzle.prototype.pieceDropped arrival");
  document.onmousemove = null;
  document.onmouseup = null;
  if(this.currentDropPiece != null){
    var tmp = {xPos:this.currentPiece.xPos,yPos:this.currentPiece.yPos};
    this.currentPiece.xPos = this.currentDropPiece.xPos;
    this.currentPiece.yPos = this.currentDropPiece.yPos;
    this.currentDropPiece.xPos = tmp.xPos;
    this.currentDropPiece.yPos = tmp.yPos;
  }
  this.resetPuzzleAndCheckWin();
};

TilePuzzle.prototype.resetPuzzleAndCheckWin = function() {
  console.log("TilePuzzle.prototype.resetPuzzleAndCheckWin arrival");
  this.stage.clearRect(0,0,this.puzzleWidth,this.puzzleHeight);
  var gameWin = true;
  var i;
  var piece;
  for(i = 0;i < this.pieces.length;i++){
    piece = this.pieces[i];
    this.stage.drawImage(this.img, piece.sx, piece.sy, this.pieceWidth, this.pieceHeight, piece.xPos, piece.yPos, this.pieceWidth, this.pieceHeight);
    this.stage.strokeRect(piece.xPos, piece.yPos, this.pieceWidth,this.pieceHeight);
    if(piece.xPos != piece.sx || piece.yPos != piece.sy){
        gameWin = false;
    }
  }

  var that = this;
  if(gameWin){
    setTimeout(this.gameOver.bind(that),500);
  }
};

TilePuzzle.prototype.gameOver = function() {
  console.log("TilePuzzle.prototype.gameOver arrival");
  document.onmousedown = null;
  document.onmousemove = null;
  document.onmouseup = null;
  this.initPuzzle();
};

