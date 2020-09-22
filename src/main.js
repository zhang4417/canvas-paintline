console.log(1)
import api from '../db/api.js'
const saveBtn = document.getElementById('save')
const redoBtn = document.getElementById('redo')
const backBtn = document.getElementById('back')
const clearBtn = document.getElementById('clear')
const colorSelect = document.getElementById('selectColor')
const sizeSelect = document.getElementById('selectSize')
const rectBtn = document.getElementById('rect')
const arcBtn = document.querySelector('#arc')
const strokeBtn = document.querySelector('#stroke')
const colorInput = document.querySelector('#pickColor')
const canvas = document.getElementById('canvas');

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;
const top = canvas.getBoundingClientRect().top
const ctx = canvas.getContext('2d');
ctx.lineWidth = api.selectedOpt(sizeSelect)
ctx.lineCap = "round"
api.pickColor(colorInput, ctx)
api.paint(canvas, ctx, top)

sizeSelect.onchange = () => {
    api.selectSize(sizeSelect, ctx)
}
backBtn.onclick = () => {
    api.back(ctx)
}
redoBtn.onclick = () => {
    api.redo(ctx)
}
saveBtn.onclick = () => {
    api.save(canvas)
}
clearBtn.onclick = () => {
    api.clear(ctx)
}
rectBtn.onclick = () => {
    api.switchRect()
    api.paint(canvas, ctx, top)
}
arcBtn.onclick = () => {
    api.switchArc()
    api.paint(canvas, ctx, top)
}
strokeBtn.onclick = () => {
    let fillOrStroke = api.stroke()
    if (fillOrStroke === false) {
        strokeBtn.textContent = 'stroke'
    } else {
        strokeBtn.textContent = 'fill'
    }
    api.paint()
}
const elementArray = [saveBtn, clearBtn, backBtn, redoBtn, colorInput, sizeSelect, rectBtn, arcBtn, strokeBtn]
api.stopPro(elementArray, 'mouseup')
document.addEventListener("touchmove", function (e) { e.preventDefault() }, { passive: false });





