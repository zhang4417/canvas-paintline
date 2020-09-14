import clear from './clear.js'

const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clear')
const nav = document.getElementById('nav')
const selectColor = document.getElementById('selectColor')
const selectSize = document.getElementById('selectSize')

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

function select(selectedEl) {
    let index = selectedEl.selectedIndex
    return selectedEl.options[index].value
}
const ctx = canvas.getContext('2d');
ctx.fillStyle = select(selectColor)
ctx.strokeStyle = select(selectColor)
ctx.lineWidth = select(selectSize)
ctx.lineCap = "round"

selectColor.onchange = () => {
    let color = select(selectColor)
    ctx.fillStyle = color
    ctx.strokeStyle = color
}
selectSize.onchange = () => {
    let size = select(selectSize)
    ctx.lineWidth = size
}

const top = canvas.getBoundingClientRect().top
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1 - top);
    ctx.lineTo(x2, y2 - top);
    ctx.stroke();
}

let painting = false;
let last


let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = function (e) {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = [x, y]

    }
    canvas.ontouchmove = function (e) {
        // let x = e.touches[0].clientX;
        // let y = e.touches[0].clientY;
        // ctx.beginPath();
        // ctx.arc(x, y, 10, 0, 2 * Math.PI);
        // ctx.fill();

        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        drawLine(last[0], last[1], x, y);
        last = [x, y]
    }
} else {
    canvas.onmousedown = function (e) {
        painting = true;
        last = [e.clientX, e.clientY]
    }
    document.onmousemove = function (e) {
        if (painting === true) {
            // ctx.beginPath();
            // ctx.arc(e.clientX, e.clientY, 10, 0, 2 * Math.PI);
            // ctx.fill();

            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
    }
    document.onmouseup = function () {
        painting = false;
    }
}
clearButton.onclick = function () { clear(ctx) }