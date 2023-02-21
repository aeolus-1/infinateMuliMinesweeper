
function recieveInput(chunkString) {
    var newChunks = JSON.parse(chunkString)
    mainChunks.chunkMaps = newChunks.chunkMaps
}
function outputClick(data) {
    data = {
        pos:v(),
        flag:false,
        ...data,
    }
    console.log(data)
    socket.send("makeClick", JSON.stringify(data))
}



const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })

    socket.on('chunkUpdate', function(data) {
        recieveInput(data)
    })
    