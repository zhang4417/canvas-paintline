class DB {
    constructor() {
        this.painting = false
        this.rect = false
        this.last = null
        this.step = 0
        this.paintArray = []
        this.start = []
    }
    pushPaint(container) {
        if (this.step < this.paintArray.length) { this.step = this.paintArray.length }
        this.step += 1
        this.paintArray.push(container.toDataURL())
    }
    clear(ctx) {
        ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
    }
    back(ctx) {
        if (this.step > 0) {
            this.step -= 1
            this.clear(ctx)
            const newImage = new Image()
            newImage.src = this.paintArray[this.step - 1]
            newImage.onload = () => ctx.drawImage(newImage, 0, 0)
        }
    }
    redo(ctx) {
        if (this.step < this.paintArray.length) {
            this.step += 1
            this.clear(ctx)
            const newImage = new Image()
            newImage.src = this.paintArray[this.step - 1]
            newImage.onload = () => ctx.drawImage(newImage, 0, 0)
        }
    }
    save(container) {
        const dataUrl = container.toDataURL("image/png");
        const a = document.createElement('a')
        const img = new Image()
        img.src = dataUrl;
        a.download = 'canvas.png'
        a.href = dataUrl;
        a.click()
    }
    selectedOpt(selectElement) {
        let index = selectElement.selectedIndex
        return selectElement.options[index].value
    }
    selectColor(selectElement, ctx) {
        let color = this.selectedOpt(selectElement)
        ctx.fillStyle = color
        ctx.strokeStyle = color
    }
    selectSize(selectElement, ctx) {
        let size = this.selectedOpt(selectElement)
        ctx.lineWidth = size
    }
    drawLine(ctx, x1, y1, x2, y2, top) {
        ctx.beginPath();
        ctx.moveTo(x1, y1 - top);
        ctx.lineTo(x2, y2 - top);
        ctx.stroke();
    }
    paint(container, ctx, top) {
        const isTouchDevice = 'ontouchstart' in document.documentElement;
        let { painting, last, drawLine, pushPaint } = this
        let _this = this
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
            container.ontouchend = function () {
                pushPaint.call(_this, container)
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
            document.onmouseup = function () {
                painting = false;
                pushPaint.call(_this, container)
            }
        }
    }

    paintRect(container, ctx, top) {
        let _this = this
        let { last, start, pushPaint, rect } = this
        this.rect = !rect
        if (this.rect === true) {
            container.onmousedown = function (e) {
                start = [e.clientX, e.clientY - top]
            }
            document.onmouseup = function (e) {
                last = [e.clientX, e.clientY - top]
                ctx.beginPath();
                ctx.fillRect(start[0], start[1], last[0] - start[0], last[1] - start[1]);
                ctx.fill();
                pushPaint.call(_this, container)
            }
        } else {
            this.paint(container, ctx, top)
        }

    }
    stopPro(el, event) {
        if (el instanceof Array) {
            for (let i of el) {
                i.addEventListener(event, (e) => { e.stopPropagation() })
            }
        } else {
            el.addEventListener(event, (e) => { e.stopPropagation() })
        }
    }
}
export default new DB()