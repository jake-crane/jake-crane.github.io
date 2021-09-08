///<reference path="Brick.ts" />
///<reference path="Paddle.ts" />
var Game = (function () {
    function Game() {
        var _this = this;
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.ballRadius = 10;
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.paddle = new Paddle(75, 10);
        this.rightPressed = false;
        this.leftPressed = false;
        this.score = 0;
        this.lives = 3;
        this.brickRowCount = 5;
        this.brickColumnCount = 3;
        this.bricks = [];
        /*private drag = (e: DragEvent) => {
            var len = e..length;
            if (len < 2)
                return;
            var currentX = e.originalEvent.touches[len - 1].pageX;
            var prevX = e.originalEvent.touches[len - 2].pageX;
            if (currentX > prevX)
                this.rightPressed = true;
            else if (currentX < prevX)
                this.leftPressed = true;
        }
    
        private mouseup = (e: MouseEvent) => {
            this.leftPressed = false;
            this.rightPressed = false;
        }*/
        this.touchMove = function (e /*: TouchEvent*/) {
            alert('touchMove');
            e.preventDefault();
            var len = e.originalEvent.touches.length;
            if (len < 2)
                return;
            var currentX = e.originalEvent.touches[len - 1].pageX;
            var prevX = e.originalEvent.touches[len - 2].pageX;
            if (currentX > prevX)
                _this.rightPressed = true;
            else if (currentX < prevX)
                _this.leftPressed = true;
        };
        this.touchStop = function (e) {
            alert('touchMove');
            e.preventDefault();
            _this.leftPressed = false;
            _this.rightPressed = false;
        };
        this.keyPressHandler = function (e) {
            if (e.keyCode == 27) {
            }
        };
        this.keyDownHandler = function (e) {
            if (e.keyCode == 39) {
                _this.rightPressed = true;
            }
            else if (e.keyCode == 37) {
                _this.leftPressed = true;
            }
        };
        this.keyUpHandler = function (e) {
            if (e.keyCode == 39) {
                _this.rightPressed = false;
            }
            else if (e.keyCode == 37) {
                _this.leftPressed = false;
            }
        };
        this.draw = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.drawBricks();
            _this.drawBall();
            _this.drawPaddle();
            _this.drawScore();
            _this.drawLives();
            _this.collisionDetection();
            if (_this.x + _this.dx > _this.canvas.width - _this.ballRadius || _this.x + _this.dx < _this.ballRadius) {
                _this.dx = -_this.dx;
            }
            if (_this.y + _this.dy < _this.ballRadius) {
                _this.dy = -_this.dy;
            }
            else if (_this.y + _this.dy > _this.canvas.height - _this.ballRadius) {
                if (_this.x > _this.paddle.getX() && _this.x < _this.paddle.getX() + _this.paddle.getWidth()) {
                    _this.dy = -_this.dy;
                }
                else {
                    _this.lives--;
                    if (!_this.lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        _this.x = _this.canvas.width / 2;
                        _this.y = _this.canvas.height - 30;
                        _this.dx = 3;
                        _this.dy = -3;
                        _this.paddle.setX((_this.canvas.width - _this.paddle.getWidth()) / 2);
                    }
                }
            }
            if (_this.rightPressed && _this.paddle.getX() < _this.canvas.width - _this.paddle.getWidth()) {
                _this.paddle.setX(_this.paddle.getX() + 7);
            }
            else if (_this.leftPressed && _this.paddle.getX() > 0) {
                _this.paddle.setX(_this.paddle.getX() - 7);
            }
            _this.x += _this.dx;
            _this.y += _this.dy;
            requestAnimationFrame(_this.draw);
        };
        this.paddle.setX((this.canvas.width - this.paddle.getWidth()) / 2); // move out of constructor?
        for (var i = 0; i < this.brickColumnCount; i++) {
            this.bricks[i] = [];
            for (var j = 0; j < this.brickRowCount; j++) {
                this.bricks[i][j] = new Brick();
            }
        }
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("keypress", this.keyPressHandler, false);
        document.addEventListener("touchMove", this.touchMove, false);
        document.addEventListener("touchStop", this.touchMove, false);
        document.ontouchstart = function (e) {
            e.preventDefault();
        };
        document.body.addEventListener("touchMove", function (e) { e.preventDefault(); }, false);
        //document.addEventListener("ondrag", this.drag, false);
        //document.addEventListener("onmouseup", this.mouseup, false);
    }
    Game.prototype.collisionDetection = function () {
        for (var i = 0; i < this.brickColumnCount; i++) {
            for (var j = 0; j < this.brickRowCount; j++) {
                var b = this.bricks[i][j];
                if (b.getHealth() > 0) {
                    if (this.x > b.getX()
                        && this.x < b.getX() + Brick.width
                        && this.y > b.getY()
                        && this.y < b.getY() + Brick.height) {
                        this.dy = -this.dy;
                        b.setHealth(0);
                        this.score++;
                        if (this.score == this.brickRowCount * this.brickColumnCount) {
                            alert("YOU WIN!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    };
    Game.prototype.drawBall = function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fill();
        this.ctx.closePath();
    };
    Game.prototype.drawPaddle = function () {
        this.ctx.beginPath();
        this.ctx.rect(this.paddle.getX(), this.canvas.height - this.paddle.getHeight(), this.paddle.getWidth(), this.paddle.getHeight());
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();
    };
    Game.prototype.drawBricks = function () {
        for (var i = 0; i < this.brickColumnCount; i++) {
            for (var j = 0; j < this.brickRowCount; j++) {
                if (this.bricks[i][j].getHealth() > 0) {
                    var brickX = (j * (Brick.width + Brick.padding)) + Brick.offsetLeft;
                    var brickY = (i * (Brick.height + Brick.padding)) + Brick.offsetTop;
                    this.bricks[i][j].setX(brickX);
                    this.bricks[i][j].setY(brickY);
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, Brick.width, Brick.height);
                    this.ctx.fillStyle = "red";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    };
    Game.prototype.drawScore = function () {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: " + this.score, 8, 20);
    };
    Game.prototype.drawLives = function () {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map