


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


    accountData = data.leaderboard
    //runLeaderboard(data.leaderboard)
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
    var chunkBounds = {
        min:v(
            Math.floor(viewPortTiles.min.x/mainChunks.options.columns),
            Math.floor(viewPortTiles.min.y/mainChunks.options.rows)
        ),
        max:v(
            Math.ceil(viewPortTiles.max.x/mainChunks.options.columns),
            Math.ceil(viewPortTiles.max.y/mainChunks.options.rows)
        ),
    }
    var dim = v(
        chunkBounds.max.x-chunkBounds.min.x,
        chunkBounds.max.y-chunkBounds.min.y,
    ),
        buffer = 4
    socket.emit("requestingChunks", JSON.stringify({
        x:chunkBounds.min.x-buffer,
        y:chunkBounds.min.y-buffer,
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
    