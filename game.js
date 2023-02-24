var camera = {
    pos:v(),
    target:v(),
    zoom:1,
    targetZoom:1,
    gridScale:50,
}

var mainChunks = new Chunks({
    width:100,
    height:100,
})

var mobile = false

function renderLoop() {
    canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(camera.gridScale)

    
    runShop()

   

    camera.pos = v(
        camera.pos.x+((camera.target.x-camera.pos.x)*0.2),
        camera.pos.y+((camera.target.y-camera.pos.y)*0.2),
    )
    camera.zoom = camera.zoom + ((camera.targetZoom-camera.zoom)*0.3)

    runControls()
}
var avalibleTiles = {},
    viewPortTiles = {
        min:v(),
        max:v(),
    }
function drawGrid(size) {
    let grid = size

    var dim = v(
        window.innerWidth*camera.zoom,
        window.innerHeight*camera.zoom
    )

    function findTile(x,y) {
        var aTile = avalibleTiles[`${x},${y}`]
        if (aTile==undefined) {
            return false
        } else {
            return aTile
        }
    }


    
        
    ctx.save()
    ctx.translate(window.innerWidth/2,window.innerHeight/2)
    ctx.scale(1/camera.zoom,1/camera.zoom)
    //ctx.translate(-window.innerWidth*0.5*camera.zoom,-window.innerHeight*0.5*camera.zoom)
    
    ctx.translate(camera.pos.x,camera.pos.y)
    
    var tilePoses = []

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
            
            var tile= findTile(pos.x,pos.y)
            if (tile) drawSquare(screenPos,tile, cellSize)
            tilePoses.push(v(pos.x,pos.y))
            if (tile) {

            ctx.beginPath()

            ctx.moveTo(screenPos.x,screenPos.y+cellSize)
            ctx.lineTo(screenPos.x,screenPos.y)
            ctx.lineTo(screenPos.x+cellSize,screenPos.y)

            ctx.strokeStyle = "#000"
            ctx.stroke()

            ctx.closePath()
            }
            
        }
    }
    drawQueue()

    viewPortTiles = {
        min:v(Infinity,Infinity),
        max:v(-Infinity,-Infinity),
    }

    for (let i = 0; i < tilePoses.length; i++) {
        const pos = tilePoses[i];
        viewPortTiles.min.x = Math.min(pos.x, viewPortTiles.min.x)
        viewPortTiles.max.x = Math.max(pos.x, viewPortTiles.max.x)
        viewPortTiles.min.y = Math.min(pos.y, viewPortTiles.min.y)
        viewPortTiles.max.y = Math.max(pos.y, viewPortTiles.max.y)
    }


    
    ctx.restore()
    
}
var renderQueue = []
function drawQueue() {
    for (let i = 0; i < renderQueue.length; i++) {
        const render = renderQueue[i];
        ctx.fillStyle = "#000"
        ctx.font = `bold ${20}px Calibri`
        ctx.fillText(render.text,render.pos.x,render.pos.y)
    }
    renderQueue = []
}
function drawSquare(pos,tile,size) {

    var tile = tile

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
        var screenPos = v(
            (mouse.pos.x-camera.pos.x),
            (mouse.pos.y-camera.pos.y)
        ),
        gridPos = v(
            Math.floor((screenPos.x)/camera.gridScale),
                Math.floor((screenPos.y)/camera.gridScale),
        )
        if (gridPos.x==Math.floor(tile.pos.x*5)&&gridPos.y==Math.floor(tile.pos.y*5)&&tile.flaggedBy!=undefined) {
            renderQueue.push({
                text:tile.flaggedBy,
                pos:v(
                    screenPos.x,
                    screenPos.y
                )
            })
        }
        
    }
}

function runClick(tilePos, flag=false, tick=4) {
    console.log(touch.lastTime)
    if (touch.lastTime>200&&mobile)flag = true
    
//    if (window.location.protocol != "file:") {
    outputClick({
        pos:tilePos,
        flag:flag,
        name:getName()
    })

    console.log(tilePos)
    var count = countNeighbours(tilePos)


    var tile = mainChunks.requestTile(tilePos.x,tilePos.y)
    if (!tile.uncovered) {
        if (flag) {
            tile.flagged = !tile.flagged
            tile.flaggedBy = getName()
        } else if (!tile.flagged) {
            tile.uncovered = true
            tile.count = count
            if (tile.mine && !flag)alert("you are stupid lol")
        }
        
    } else tile.flagged = false
    

    

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


function runLeaderboard(board) {
    var div = document.getElementById("leaders")
    div.innerHTML = ""
    function appendText(text,h=false) {
        div.appendChild(createElementFromHTML(`<div class="${(h)?"highlighted ":""}leaderboardSlot">${text}</div>`))
    }
    for (let i = 0; i < board.length; i++) {
        var user = board[i]
        appendText(`${(i+1)}. ${user.name} (${user.score})`,user.name == getName())
    }
}
