


function recieveInput(chunkString) {
    var data = JSON.parse(chunkString)
    var chunks = data.chunks
    avalibleTiles = {}

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        var grid = chunk.grid
        for (let i = 0; i < grid.length; i++) {
            const rows = grid[i];
            for (let j = 0; j < rows.length; j++) {
                const tile = rows[j];
                avalibleTiles[`${Math.round(tile.pos.x*5)},${Math.round(tile.pos.y*5)}`] = tile
            }
        }
    }


    
    runLeaderboard(data.leaderboard)
}
function outputClick(data) {
    data = {
        pos:v(),
        flag:false,
        id:multiplayerId,
        name:"unamed",
        ...data,
    }
    socket.emit("makeClick", JSON.stringify(data))
}

function makeChunkRequest() {
    var dim = v(
        viewPortTiles.max.x-viewPortTiles.min.x,
        viewPortTiles.max.y-viewPortTiles.min.y,
    ),
        buffer = 5
    socket.emit("requestingChunks", JSON.stringify({
        x:viewPortTiles.min.x-buffer,
        y:viewPortTiles.min.y-buffer,
        width:dim.x+buffer,
        height:dim.y+buffer,
    }))
}

setInterval(() => {
    makeChunkRequest()
}, 1000/4);

const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })
    
    socket.on('returningChunks', function(data) {
        recieveInput(data)
    })
    