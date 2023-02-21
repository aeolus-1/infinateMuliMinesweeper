
function recieveInput(chunkString) {
    mainChunks = JSON.parse(chunkString)
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

function requestChunksFromServer() {
    socket.send("requestingChunksDaddy")
}

const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })

    socket.on('returningChunks', function(data) {
        console.log("got chunks", data)
        recieveInput(data)
    })
    