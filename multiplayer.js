
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
}

const socket = io("https://infms.xl83.dev", {
    reconnection: true,
})



    socket.on('connect', function() {

    })

    socket.on('reciveChunks', function(data) {
        console.log("got chunks", data)
        recieveInput(data)
    })
    