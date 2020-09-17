import clear from './clear.js'
import paint from './paint.js';
import select from './select.js'
import db from '../db/database.js'
const saveBtn = document.getElementById('save')
const redoBtn = document.getElementById('redo')
const backBtn = document.getElementById('back')
const canvas = document.getElementById('canvas');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const ctx = canvas.getContext('2d');
ctx.lineCap = "round"
select(ctx)
paint(canvas, ctx)
clear(ctx)
backBtn.onclick = () => {
    db.back(ctx)
}
redoBtn.onclick = () => {
    db.redo(ctx)
}
saveBtn.onclick = () => {
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement('a')
    const img = new Image()
    img.src = dataUrl;
    a.download = 'canvas.png'
    a.href = dataUrl;
    a.click()
}