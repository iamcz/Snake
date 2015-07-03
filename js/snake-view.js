(function () {
  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.setupBoard();
    this.start();
    this.bindKeyHandlers();
  }

  View.prototype.bindKeyHandlers = function () {
    var view = this;
    key('left', function() {
      view.moveDir = 'W';
    })
    key('right', function() {
      view.moveDir = 'E';
    })
    key('up', function() {
      view.moveDir = 'S';
    })
    key('down', function() {
      view.moveDir = 'N';
    })
  }

  View.prototype.start = function() {
    var board = this.board;

    setInterval(function (){
      board.snake.turn(this.moveDir)
      if (board.snake.dir !== undefined) {
        board.step();
        if (board.lose()) {
          board.snake.dir = undefined;
          this.moveDir = undefined;
          alert("You Lose!");
        } else {
          this.render();
        }
      }
    }.bind(this), 100);
  }

  View.prototype.renderPosWithClass = function(pos, classAttr) {
    if (pos[0] === null) { return; }
    var idx = pos[0] + this.board.dimY * pos[1];
    this.$boardEls.eq(idx).addClass(classAttr);
  }

  View.prototype.render = function () {
    var idx, bodyPart, boardElements = this.$el.find(".board li");
    boardElements.removeClass("snake apple snake-head N S E W");
    
    var snake = this.board.snake
    this.renderPosWithClass(snake.head(), "snake-head " + snake.dir)

    snake.tail().forEach( function(tailPos) {
      this.renderPosWithClass(tailPos, "snake")
    }.bind(this))
    
    this.renderPosWithClass(this.board.applePos, "apple")
  }
  
  View.prototype.setupBoard = function () {
    var $liEl, $boardEl = this.$el.find('.board');

    for (i = 0; i < this.board.dimY; i++){
      for (var j = 0; j < this.board.dimX; j++){
        $liEl = $("<li></li>");
        $boardEl.append($liEl);
      }
    }

    this.$boardEls = this.$el.find(".board li");
    this.render()
  }

})();
