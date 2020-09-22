class DB {
    constructor() {
        this.painting = false
        this.rect = false
        this.start = null
        this.step = 0
        this.paintArray = []
        this.isLine = true
        this.isRect = false
        this.Arc = false
        this.isStroke = true
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
        let value = selectElement.options[index].value
        return value
    }
    selectSize(selectElement, ctx) {
        let size = this.selectedOpt(selectElement)
        ctx.lineWidth = size
    }
    pickColor(container, ctx) {
        const myPicker = new JSColor(container)
        myPicker.option({
            crossSize: 5
        })
        myPicker.onChange = () => {
            ctx.fillStyle = myPicker.toRGBAString()
            ctx.strokeStyle = myPicker.toRGBAString()
        }
    }
    drawLine(ctx, x1, y1, x2, y2, top) {
        ctx.beginPath();
        ctx.moveTo(x1, y1 - top);
        ctx.lineTo(x2, y2 - top);
        ctx.stroke();
    }
    paint(container, ctx, top) {
        const isTouchDevice = 'ontouchstart' in document.documentElement;
        let { painting, start: start, drawLine, pushPaint, isLine, isRect, isArc } = this
        let _this = this
        if (isTouchDevice) {//判断是否为触屏
            let last = []
            container.ontouchstart = function (e) {
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                start = [x, y]
            }
            container.ontouchmove = function (e) {
                painting = true
                let x = e.touches[0].clientX;
                let y = e.touches[0].clientY;
                last = [x, y]
                if (isLine) {
                    drawLine(ctx, start[0], start[1], x, y, top);
                    start = [x, y]
                }

            }
            container.ontouchend = function (e) {
                if (isLine) { }
                if (start && painting && isRect) {
                    _this.drawRect(ctx, start[0], start[1], last[0], last[1], top)
                }
                if (start && painting && isArc) {
                    let dep = Math.sqrt(Math.pow((last[0] - start[0]), 2) + Math.pow((last[1] - start[1]), 2));
                    _this.drawArc(ctx, start[0], start[1], dep, top)
                }
                pushPaint.call(_this, container)
                painting = false
                start = null
            }
        } else {
            container.onmousedown = function (e) {
                start = [e.clientX, e.clientY]
                if (isLine) {
                    painting = true;
                }
                if (isRect) { }
                if (isArc) { }
            }
            document.onmousemove = function (e) {
                if (isLine) {
                    if (painting === true) {
                        drawLine(ctx, start[0], start[1], e.clientX, e.clientY, top)
                        start = [e.clientX, e.clientY]
                    }
                }
                if (isRect) { }
                if (isArc) { }

            }
            document.onmouseup = function (e) {
                let x = e.clientX
                let y = e.clientY
                if (isLine) {
                    painting = false;
                }
                if (start && isRect) {
                    _this.drawRect(ctx, start[0], start[1], x, y, top)
                }
                if (start && isArc) {
                    let dep = Math.sqrt(Math.pow((x - start[0]), 2) + Math.pow((y - start[1]), 2));
                    _this.drawArc(ctx, start[0], start[1], dep, top)
                }
                pushPaint.call(_this, container)
                start = null
            }
        }
    }
    drawRect(ctx, x, y, x2, y2, top) {
        ctx.beginPath();
        if (this.isStroke) {
            ctx.strokeRect(x, y - top, x2 - x, y2 - y)
        } else {
            ctx.fillRect(x, y - top, x2 - x, y2 - y);
        }
    }
    drawArc(ctx, x, y, r, top) {
        ctx.beginPath()
        ctx.arc(x, y - top, r, 0, 2 * Math.PI)
        if (this.isStroke) {
            ctx.stroke()
        } else {
            ctx.fill();
        }
    }
    switchRect() {
        this.isArc = false
        this.isRect = true
        this.isLine = false
    }
    switchArc() {
        this.isRect = false
        this.isArc = true
        this.isLine = false
    }
    switchLine() {
        this.isLine = true
        this.isArc = false
        this.isRect = false
    }
    stroke() {
        return this.isStroke = !this.isStroke
    }
    // paintRect(container, ctx, top) {
    //     let _this = this
    //     let { last, pushPaint, rect } = this
    //     this.rect = !rect
    //     if (this.rect === true) {
    //         container.onmousedown = function (e) {
    //             last = [e.clientX, e.clientY]
    //         }
    //         document.onmouseup = function (e) {
    //             let x = e.clientX
    //             let y = e.clientY
    //             this.drawRect(ctx, last[0], last[1], x, y, top)
    //             pushPaint.call(_this, container)
    //         }
    //     } else {
    //         this.paint(container, ctx, top)
    //     }

    // }
    stopPro(el, event) {
        if ('on' + event in document.documentElement) {
            if (el instanceof Array) {
                for (let i of el) {
                    i.addEventListener(event, (e) => { e.stopPropagation() })
                }
            } else {
                el.addEventListener(event, (e) => { e.stopPropagation() })
            }
        }
    }
}
export default new DB()