import clear from './clear.js'
import paint from './paint.js';
import select from './select.js'
const canvas = document.getElementById('canvas');
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

const ctx = canvas.getContext('2d');
ctx.lineCap = "round"
select(ctx)
paint(canvas, ctx)
clear(ctx)