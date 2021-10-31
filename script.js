var str = ["Твитты", "Проекта", "Constructor" ,"Script","&#11015" ];

var c = document.getElementById('c');
$(window).resize(function() {
    c.width = $(window).width();
    c.height = $(window).height();
}).resize();

function Dot(x, y) {
    var _this = this;
    this.x = Math.random() * c.width;
    this.y = Math.random() * c.height;
    this.r = Math.random() * 30;
    this.X = x;
    this.Y = y;
    this.R = 2.5;
    this.a = 0;
    this.A = 0.6;
}

function render() {
    requestAnimationFrame(render);

    var ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < dots.length; i++) {
        var dx = Math.abs(dots[i].x - dots[i].X) / 10;
        var dy = Math.abs(dots[i].y - dots[i].Y) / 10;
        var dr = Math.abs(dots[i].r - dots[i].R) / 10;
        var da = Math.abs(dots[i].a - dots[i].A) / 10;
        ctx.beginPath();
        ctx.fillStyle = "rgb(58, 231, 159," + dots[i].a + ")";
        ctx.arc(dots[i].x, dots[i].y, dots[i].r, 0, 2 * Math.PI);
        ctx.fill();

        if (dots[i].x < dots[i].X) dots[i].x += dx;
        else dots[i].x -= dx;
        if (dots[i].y < dots[i].Y) dots[i].y += dy;
        else dots[i].y -= dy;
        if (dots[i].r < dots[i].R) dots[i].r += dr;
        else dots[i].r -= dr;
        if (dots[i].a < dots[i].A) dots[i].a += da;
    }
}

var dots = [];

function run() {
    var s = str.shift();
    str.push(s);
    $('p').html(s);
    dots = [];
    html2canvas(document.getElementById('container'), {
        onrendered: function(canvas) {
            var ctx = c.getContext('2d');
            var ctx2 = canvas.getContext('2d');
            var img = ctx2.getImageData(0, 0, canvas.width, canvas.height);
            var d = img.data;
            var w = Math.floor(canvas.width / 1);
            var h = Math.floor(canvas.height / 1);
            for (var j = 0; j < h; j += 3) {
                for (var i = 0; i < w; i += 2) {
                    var n = (j * w + i) * 4;
                    /*d[n] = 255;
                    d[n+1] = 0;
                    d[n+2] = 0;*/
                    if (d[n] != 0) {
                        var dot = new Dot(i, j);
                        dots.push(dot);
                    }
                }
            }

            ctx.putImageData(img, 0, 0);

            //render();
        }
    });
}

render();

setInterval(run, 2000);
