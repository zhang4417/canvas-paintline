const clearButton = document.getElementById('clear')
export default function (ctx) {
    clearButton.onclick = () => {
        ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
    }
}