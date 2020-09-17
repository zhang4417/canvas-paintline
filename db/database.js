// function db(arr) {
//     let step = 0
//     let paintArray = []
//     return function () {
//         step += 1
//         paintArray.push(arr.toDataURL())
//     }
// }
let db = {
    step: 0,
    paintArray: [],
    pushPaint(container) {
        if (this.step < this.paintArray.length) { this.step = this.paintArray.length }
        this.step += 1
        this.paintArray.push(container.toDataURL())
    },
    clear(ctx) {
        ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
    },
    back(ctx) {
        if (this.step > 0) {
            this.step -= 1
            this.clear(ctx)
            const newImage = new Image()
            newImage.src = this.paintArray[this.step - 1]
            newImage.onload = () => ctx.drawImage(newImage, 0, 0)
        }
    },
    redo(ctx) {
        if (this.step < this.paintArray.length) {
            this.step += 1
            this.clear(ctx)
            const newImage = new Image()
            newImage.src = this.paintArray[this.step - 1]
            newImage.onload = () => ctx.drawImage(newImage, 0, 0)
        }
    }
}
export default db