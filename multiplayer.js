


function recieveInput(chunkString) {
    var data = JSON.parse(chunkString)
    mainChunks.chunkMaps = data.chunks.chunkMaps
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
    console.log(data)
    socket.emit("makeClick", JSON.stringify(data))
}



const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })

    socket.on('chunkUpdate', function(data) {
        recieveInput(data)
    })
    