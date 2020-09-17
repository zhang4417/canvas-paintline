import api from '../db/api.js'
const saveBtn = document.getElementById('save')
const redoBtn = document.getElementById('redo')
const backBtn = document.getElementById('back')
const clearBtn = document.getElementById('clear')
const colorSelect = document.getElementById('selectColor')
const sizeSelect = document.getElementById('selectSize')
const canvas = document.getElementById('canvas');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;
const top = canvas.getBoundingClientRect().top
const ctx = canvas.getContext('2d');
ctx.fillStyle = api.selectedOpt(colorSelect)
ctx.strokeStyle = api.selectedOpt(colorSelect)
ctx.lineWidth = api.selectedOpt(sizeSelect)
ctx.lineCap = "round"
api.paint(canvas, ctx, top)
colorSelect.onchange = () => {
    api.selectColor(colorSelect, ctx)
}
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