const selectColor = document.getElementById('selectColor')
const selectSize = document.getElementById('selectSize')

function selectedOpt(selectedEl) {
    let index = selectedEl.selectedIndex
    return selectedEl.options[index].value
}
export default function (ctx) {
    ctx.fillStyle = selectedOpt(selectColor)
    ctx.strokeStyle = selectedOpt(selectColor)
    ctx.lineWidth = selectedOpt(selectSize)

    selectColor.onchange = () => {
        let color = selectedOpt(selectColor)
        ctx.fillStyle = color
        ctx.strokeStyle = color
    }
    selectSize.onchange = () => {
        let size = selectedOpt(selectSize)
        ctx.lineWidth = size
    }
}