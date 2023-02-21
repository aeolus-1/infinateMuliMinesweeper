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
        Math.floor((mouse.pos.x-camera.pos.x)/camera.gridScale),
            Math.floor((mouse.pos.y-camera.pos.y)/camera.gridScale),
    ),e.which==3)
    
})
var keys = {};
document.addEventListener("keydown", (e)=>{keys[e.key.toLowerCase()]=true})
document.addEventListener("keyup", (e)=>{keys[e.key.toLowerCase()]=false})

function runControls() {
    var speed = 10
    if (keys.w) camera.target.y -= -speed
    if (keys.s) camera.target.y += -speed
    if (keys.a) camera.target.x -= -speed
    if (keys.d) camera.target.x += -speed
}