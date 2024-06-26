
var rollingPing = []
function getPing() {
    let p = 0
    rollingPing.forEach((e)=>{p+=e})
    return p/rollingPing.length
}

function recieveInput(chunkString) {
    var data = JSON.parse(chunkString)

    if (data.timestamp) {
        rollingPing.push((new Date()).getTime()-data.timestamp)
        if (rollingPing.length>5) {
            rollingPing.shift()
        }
    }

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

    if (accountData[multiplayerId]) {
        window.ownData = accountData[multiplayerId].owns
    }
    
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

var positionOfLastViewport = v(),
    zoomOfLastViewport = 1

function getViewport() {
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
    return {
        x:chunkBounds.min.x-buffer,
        y:chunkBounds.min.y-buffer,
        width:dim.x+(3*buffer),
        height:dim.y+(2*buffer),
    }
}
function makeChunkRequest() {
    let vp = getViewport()
    positionOfLastViewport = camera.pos
    zoomOfLastViewport = camera.zoom
    socket.emit("requestingChunks", JSON.stringify({viewport:vp}))
}



const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })
    socket.on('appendChat', function(data) {
        data = JSON.parse(data)
        appendMsgToChat(data.msg, data.user)
    })
    
    socket.on('returningChunks', function(data) {
        recieveInput(data)
        
        if (getPing()) {
            document.getElementById("pingMeter").style.display = ""
            document.getElementById("pingMeter").textContent = getPing() 
        } else {
            document.getElementById("pingMeter").style.display = "none"
        }
        
    })
    socket.on('serverChange', function(data) {
        makeChunkRequest()
    })
    socket.on('recieveItem', function(data) {
        recieveItem(JSON.parse(data))
    })


      socket.on('recChat', function(data) {
      appendMsgToChat(data.msg, data.user)
    })

    socket.on("openedLootbox", function(data) {
        data = JSON.parse(data)
        console.log(data)
        if (typeof data.item == "string") {
            alert("You got 30 coins")

        } else {
            console.log(data)
            recieveItem(data.item)
            let currentUsername = (document.getElementById("usernameInput").value).substring(0, 5)
            submitMsg(`User ${currentUsername} pulled a "${data.item.name}" flag`,"SERVER")
        }
    })
    
