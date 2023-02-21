var camera = {
    pos:v(),
    zoom:1,
    gridScale:50,
}

var mainChunks = new Chunks({
    width:100,
    height:100,
})

function renderLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(camera.gridScale)
}
function drawGrid(size) {
    let grid = size

    var dim = v(
        window.innerWidth/camera.zoom,
        window.innerHeight/camera.zoom
    )


    let mod = v(
        (Math.floor((camera.pos.x*camera.zoom)/grid)*grid),
        (Math.floor((camera.pos.y*camera.zoom)/grid)*grid)
        )


    var bu = 8
    for (let i = -bu; i < ((dim.x) / grid)+bu; i++) {
        for (let j= -bu; j < ((dim.y) / grid)+bu; j++) {
            drawSquare(
                v(
                    i * grid + mod.x,
                    j * grid + mod.y,

                ),
                i,
                j,
                size
            )
        }
    }
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
function drawSquare(pos,x,y,size) {
    var tile = mainChunks.requestTile(x,y)
    //console.log(tile.mine)
    ctx.fillStyle = tile.uncovered?tile.mine?"#444":"#ccc":tile.flagged?"#f00":"#fff"
    ctx.fillRect(pos.x, pos.y, size,size)
    ctx.fillStyle = "#f00"
    ctx.fillText(tile.count,pos.x+(size/2),pos.y+(size/2))
}
function runClick(tile, flag=false) {
    console.log(tile)
    var count = countNeighbours(tile)

    var tile = mainChunks.requestTile(tile.x,tile.y)
    if (flag) {
        tile.flagged = !tile.flagged
    } else {
        tile.uncovered = true
        tile.count = count
    }
    
}
function countNeighbours(tilePos) {
    var tile = mainChunks.requestTile(tilePos.x,tilePos.y),
        neighbours = [
            v(1,1),v(0,1),v(-1,1),
            v(1,0),v(-1,0),
            v(1,-1),v(0,-1),v(-1,-1),
        ]
        var count = 0
    for (let i = 0; i < neighbours.length; i++) {
        const nei = neighbours[i];
        console.log(nei)
        let pos = v(
            tilePos.x+nei.x,
            tilePos.y+nei.y
        )
        neighbours[i] = mainChunks.requestTile(pos.x,pos.y)
        count += neighbours[i].mine?1:0
    }
    return count

}