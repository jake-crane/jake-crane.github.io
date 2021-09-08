var Paddle = (function () {
    function Paddle(width, height, canvasWidth) {
        this.width = width;
        this.height = height;
        this.x = (canvasWidth - this.getWidth()) / 2;
    }
    Paddle.prototype.getWidth = function () {
        return this.width;
    };
    Paddle.prototype.getHeight = function () {
        return this.height;
    };
    Paddle.prototype.getX = function () {
        return this.x;
    };
    Paddle.prototype.setX = function (x) {
        this.x = x;
    };
    return Paddle;
})();
//# sourceMappingURL=Paddle.js.map