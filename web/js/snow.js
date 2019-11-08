function Star(x, y, s /*radius*/ , p /*num points*/ ) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.p = p;
  this.img = document.createElement('canvas');
   
  var context = this.img.getContext('2d'),
    len = this.s / 1.45;
  this.img.height = this.img.width = this.s * 2;
  context.translate(this.s, this.s);
  context.rotate((Math.PI * 1 / 10));
  context.beginPath();
  for (var i = 0; i < p; i++) {
    context.lineTo(0, s);
    context.rotate((Math.PI * 2 / (p * 2)));
    context.lineTo(0, -s);
    context.rotate((Math.PI * 2 / (p * 2)));
  }
  context.closePath();
  context.shadowBlur = this.s / 3;
  context.shadowColor = 'rgba(255,255,255,.9)';
  context.fillStyle = 'rgba(255,255,255,.45)';
  context.fill();
}
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var canvas, context, height, width, stars;
setTimeout(init, 10);

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  height = canvas.height = document.body.offsetHeight;
  width = canvas.width = document.body.offsetWidth;
  stars = [];

  for (var i = 0; i < 150; i++) {
    var x = Math.random() * width,
      y = Math.random() * height,
      s = Math.random() * 5 + 5,
      p = Math.random() * 8 + 8;
    var s = new Star(x, y, s, p);
    s.vx = Math.random() * 2 - 1;
    s.vy = Math.random() * 2 + 1;
    s.r = Math.random() * 360;
    stars.push(s);
  }

  update();
  render();
}


function update() {
  for (var i = 0, l = stars.length; i < l; i++) {
    stars[i].r += stars[i].vx / 10;
    stars[i].x += stars[i].vx;
    stars[i].y += stars[i].vy;
    if (stars[i].y > height) {
      stars[i].y = -stars[i].s;
      stars[i].vx = Math.random() * 2 - 1;
      stars[i].vy = Math.random() * 2 + 1;
    }
  }
  setTimeout(update, 1000 / 30);
}

function render() {
  context.clearRect(0, 0, width, height);
  for (var i = 0, l = stars.length; i < l; i++) {
    context.save();
    context.translate(stars[i].x, stars[i].y);
    context.rotate(stars[i].r);
    context.drawImage(stars[i].img, 0, 0);
    context.restore();
  }
  requestAnimationFrame(render);
}