var camera = {
    pos:v(),
    zoom:1,
}

function renderLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(10)
}
function drawGrid(size) {
    let grid = size/2

    var dim = v(
        window.innerWidth/globalScale,
        window.innerHeight/globalScale
    )


    let mod = v(
        (Math.floor((camera.pos.x*zoom)/grid)*grid),
        (Math.floor((camera.pos.y*zoom)/grid)*grid)
        )


    var bu = 8

    for (let i = -bu; i < ((dim.x) / grid)+bu; i++) {
        ctx.beginPath()
        ctx.moveTo((i * grid) + mod.x, mod.y-(bu*grid))

        ctx.lineTo(i * grid + mod.x, (dim.y) + mod.y + (bu*grid))

        ctx.closePath()

        ctx.stroke()
    }
    
    for (let i = -bu; i < ((dim.y) / grid)+bu; i++) {
        ctx.beginPath()
        ctx.moveTo(mod.x-(bu*grid), i * grid + mod.y)

        ctx.lineTo((dim.x+(bu*grid)) + mod.x, i * grid + mod.y)

        ctx.closePath()

        ctx.stroke()
    }
}
