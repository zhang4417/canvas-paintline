import db from '../db/database.js'
function drawLine(ctx, x1, y1, x2, y2, top) {//画线
    ctx.beginPath();
    ctx.moveTo(x1, y1 - top);
    ctx.lineTo(x2, y2 - top);
    ctx.stroke();
}

let painting = false;
let last

export default function (container, ctx) {
    const top = container.getBoundingClientRect().top
    let isTouchDevice = 'ontouchstart' in document.documentElement;
    if (isTouchDevice) {//判断是否为触屏
        container.ontouchstart = function (e) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            last = [x, y]
        }
        container.ontouchmove = function (e) {
            // let x = e.touches[0].clientX;
            // let y = e.touches[0].clientY;
            // ctx.beginPath();
            // ctx.arc(x, y, 10, 0, 2 * Math.PI);
            // ctx.fill();

            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            drawLine(ctx, last[0], last[1], x, y, top);
            last = [x, y]
        }
    } else {
        container.onmousedown = function (e) {
            painting = true;
            last = [e.clientX, e.clientY]
        }
        document.onmousemove = function (e) {
            if (painting === true) {
                // ctx.beginPath();
                // ctx.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
                // ctx.fill();

                drawLine(ctx, last[0], last[1], e.clientX, e.clientY, top)
                last = [e.clientX, e.clientY]
            }
        }
        container.onmouseup = function () {
            painting = false;
            db.pushPaint(container)
        }
    }
}