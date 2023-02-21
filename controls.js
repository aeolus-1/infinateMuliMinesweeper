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
        (mouse.pos.x+camera.pos.x)/camera.zoom,
        (mouse.pos.y+camera.pos.y)/camera.zoom
    )
    runClick(v(
        Math.floor(screenPos.x/camera.gridScale),
            Math.floor(screenPos.y/camera.gridScale),
    ),e.which==3)
    
})