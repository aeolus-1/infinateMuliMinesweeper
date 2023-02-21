var mouse = {
    pos:v()
}
document.addEventListener("mousemove", (e)=>{
    mouse.pos.x = e.offsetX
    mouse.pos.y = e.offsetY
})
document.addEventListener("mousedown", (e)=>{
    mouse.pos.x = e.offsetX
    mouse.pos.y = e.offsetY

    var screenPos = v(
        (mouse.pos.x-camera.pos.x)*camera.zoom,
        (mouse.pos.y-camera.pos.y)*camera.zoom
    )
    runClick(v(
        Math.floor(screenPos.x/camera.gridScale),
            Math.floor(screenPos.y/camera.gridScale),
    ),e.which==3)
    
})
var keys = {}
document.addEventListener("keydown", (e)=>{keys[e.key.toLowerCase()]=true})
document.addEventListener("keyup", (e)=>{keys[e.key.toLowerCase()]=false})

function runControls() {
    if (keys.w) camera.target.y -= -5
    if (keys.s) camera.target.y += -5
    if (keys.a) camera.target.x -= -5
    if (keys.d) camera.target.x += -5
}