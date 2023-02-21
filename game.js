var camera = {
    pos:v(),
    target:v(),
    zoom:1,
    gridScale:50,
}

var mainChunks = new Chunks({
    width:100,
    height:100,
})

function renderLoop() {
    canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(camera.gridScale)

   

    camera.pos = v(
        camera.pos.x+((camera.target.x-camera.pos.x)*0.1),
        camera.pos.y+((camera.target.y-camera.pos.y)*0.1),
    )

    runControls()
}
function drawGrid(size) {
    let grid = size

    var dim = v(
        window.innerWidth*camera.zoom,
        window.innerHeight*camera.zoom
    )


    
        
    ctx.save()
    ctx.translate(window.innerWidth/2,window.innerHeight/2)
    ctx.scale(1/camera.zoom,1/camera.zoom)
    //ctx.translate(-window.innerWidth*0.5*camera.zoom,-window.innerHeight*0.5*camera.zoom)
    
    ctx.translate(camera.pos.x,camera.pos.y)
    


    var gridSize = v(
        Math.floor((window.innerWidth*camera.zoom)/size)+4,
        Math.floor((window.innerHeight*camera.zoom)/size)+4
    ),
        cellSize = size,
        modScreen = v(
            (Math.floor((
                ((camera.pos.x)*1)-(0)
                )/cellSize)*cellSize),
            (Math.floor((
                ((camera.pos.y)*1)-(0)
                )/cellSize)*cellSize)
            ),
        mod = v(
            modScreen.x/cellSize,
            modScreen.y/cellSize,
        )
            var buffer = 2
    for (let x = -buffer+Math.floor(-gridSize.x*0.5); x < (gridSize.x*0.5)+buffer; x++) {
        for (let y = -buffer+Math.floor(-gridSize.y*0.5); y < (gridSize.y*0.5)+buffer; y++) {
            var pos = v(
                x-mod.x,
                y-mod.y,
            ),
            screenPos =v(pos.x*cellSize,pos.y*cellSize)
                
            drawSquare(screenPos, pos.x, pos.y, cellSize)
            ctx.beginPath()

            ctx.moveTo(screenPos.x,screenPos.y+cellSize)
            ctx.lineTo(screenPos.x,screenPos.y)
            ctx.lineTo(screenPos.x+cellSize,screenPos.y)

            ctx.strokeStyle = "#000"
            ctx.stroke()

            ctx.closePath()
            
        }
    }

    
    ctx.restore()
    
}
function drawSquare(pos,x,y,size) {
    var tile = mainChunks.requestTile(x,y)

    ctx.fillStyle = tile.uncovered?"#bbb":"#fff"
    ctx.fillRect(pos.x, pos.y, size,size)
    
    if (tile.uncovered && !tile.mine) {
        var color = ["","blue","green","red","purple","black","gray","maroon","turquoise"][tile.count]
        ctx.fillStyle = color

        var fontSize = 40
        ctx.font = `bold ${fontSize}px Calibri`
        ctx.textBaseline = "middle"
        var text = tile.count,//tile.count==0?"":tile.count,
            width = ctx.measureText(text).width
        
        ctx.fillText(tile.count,pos.x+(size/2)+(-width/2),pos.y+(size/2))
    }
    if (tile.uncovered && tile.mine) {
        var flagImg = document.getElementById("bombImg")
        ctx.drawImage(flagImg, pos.x,pos.y, size,size)
    }
    if (tile.flagged) {
        var flagImg = document.getElementById("flagImg")
        ctx.drawImage(flagImg, pos.x,pos.y, size,size)
    }
}
function runClick(tilePos, flag=false, tick=4) {
//    if (window.location.protocol != "file:") {
    outputClick({
        pos:tilePos,
        flag:flag,
    })

    
    var count = countNeighbours(tilePos)

    var tile = mainChunks.requestTile(tilePos.x,tilePos.y)
    if (flag) {
        tile.flagged = !tile.flagged
    } else {
        tile.uncovered = true
        tile.count = count
        
    }

}
function getNeighbours(tilePos) {
    
    var neighbours = [
        v(1,1),v(0,1),v(-1,1),
        v(1,0),v(-1,0),
        v(1,-1),v(0,-1),v(-1,-1),
    ]
    for (let i = 0; i < neighbours.length; i++) {
        const nei = neighbours[i];
        let pos = v(
            tilePos.x+nei.x,
            tilePos.y+nei.y
        )
        neighbours[i] = pos
    }
    return neighbours
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
        let pos = v(
            tilePos.x+nei.x,
            tilePos.y+nei.y
        )
        neighbours[i] = mainChunks.requestTile(pos.x,pos.y)
        count += neighbours[i].mine?1:0
    }
    return count

}
