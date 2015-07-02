(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, board) {
    this.$el = $el;
    this.board = board;
    this.render();
    this.start();
    this.bindKeyHandlers();
  }

  View.prototype.bindKeyHandlers = function () {
    var view = this;
    key('left', function() {
      view.moveDir = 'W';
      //snake.turn('W');
    })
    key('right', function() {
      view.moveDir = 'E';
      // snake.turn('E');
    })
    key('up', function() {
      view.moveDir = 'S';
      // snake.turn('S');
    })
    key('down', function() {
      view.moveDir = 'N';
      // snake.turn('N');
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

  View.prototype.render = function () {
    var $boardEl = this.$el.find('.board');
    $boardEl.empty();
    for (i = 0; i < this.board.dimY; i++){
      for (var j = 0; j < this.board.dimX; j++){
        var $liEl = $("<li></li>");
        this.board.snake.body.forEach(function(bodyPos) {
          if (SnakeGame.Coord.equals([j,i], bodyPos)){
            $liEl.addClass("snake");
          }
        })

        if (SnakeGame.Coord.equals([j,i], this.board.applePos)){
          $liEl.addClass("apple");
        }
        $boardEl.append($liEl);
      }
    }
  }

})();
