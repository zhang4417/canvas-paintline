import select from './select.js'
import api from '../db/api.js'
const saveBtn = document.getElementById('save')
const redoBtn = document.getElementById('redo')
const backBtn = document.getElementById('back')
const clearBtn = document.getElementById('clear')
const canvas = document.getElementById('canvas');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const ctx = canvas.getContext('2d');
ctx.lineCap = "round"
select(ctx)
api.paint(canvas, ctx)
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