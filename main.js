var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
ctx.stroke()

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function Rectangle(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Rectangle.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = "cornflowerBlue";
    ctx.rect(this.x, this.y, 25, 10);
    ctx.fill()
}

Rectangle.prototype.update = function() {
    this.y += this.velY
}

function loop() {
    testRect.draw()
    testRect.update()
    requestAnimationFrame(loop)
}