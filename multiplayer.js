
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