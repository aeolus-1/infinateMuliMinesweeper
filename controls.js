var mouse = {
    pos:v()
}
document.addEventListener("mousemove", (e)=>{
    mouse.pos.x = (e.offsetX-(window.innerWidth/2))*camera.zoom
    mouse.pos.y = (e.offsetY-(window.innerHeight/2))*camera.zoom
})
document.addEventListener("mousedown", (e)=>{
    mouse.pos.x = (e.offsetX-(window.innerWidth/2))*camera.zoom
    mouse.pos.y = (e.offsetY-(window.innerHeight/2))*camera.zoom

    var screenPos = v(
        (mouse.pos.x-camera.pos.x),
        (mouse.pos.y-camera.pos.y)
    )
    runClick(v(
        Math.floor((screenPos.x)/camera.gridScale),
            Math.floor((screenPos.y)/camera.gridScale),
    ),e.which==3)
    
})
var keys = {};
document.addEventListener("keydown", (e)=>{keys[e.key.toLowerCase()]=true})
document.addEventListener("keyup", (e)=>{keys[e.key.toLowerCase()]=false})

function runControls() {
    var speed = 20*camera.zoom
    if (keys.w) camera.target.y -= -speed
    if (keys.s) camera.target.y += -speed
    if (keys.a) camera.target.x -= -speed
    if (keys.d) camera.target.x += -speed

    function add(num) {camera.zoom = clamp(camera.zoom+num,0.25, 4)}

    if (keys["="]) add(-0.05)
    if (keys["-"]) add(0.05)
}

document.addEventListener("scroll", (e)=>{
})