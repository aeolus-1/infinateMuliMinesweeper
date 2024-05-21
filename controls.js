var mouse = {
    pos:v()
}
canvas.addEventListener("mousemove", (e)=>{
    mouse.pos.x = (e.offsetX-(window.innerWidth/2))*camera.zoom
    mouse.pos.y = (e.offsetY-(window.innerHeight/2))*camera.zoom
})
canvas.addEventListener("mousedown", (e)=>{
    mouse.pos.x = (e.offsetX-(window.innerWidth/2))*camera.zoom
    mouse.pos.y = (e.offsetY-(window.innerHeight/2))*camera.zoom

    var screenPos = v(
        (mouse.pos.x-camera.pos.x),
        (mouse.pos.y-camera.pos.y)
    )
    if (!mobile) {
        runClick(v(
            Math.floor((screenPos.x)/camera.gridScale),
                Math.floor((screenPos.y)/camera.gridScale),
        ),e.which==3||e.shiftKey)
    }
    
})
var touch = {
    pos:undefined,
    timer:0,
    lastTime:10000,
    
}
canvas.addEventListener("touchstart", (e)=>{
    mobile = true
    
    touch.timer = (new Date()).getTime()
    
    var pos = v(e.touches[0].screenX, e.touches[0].screenY)
    newPos = v(
        (pos.x-(window.innerWidth/2))*camera.zoom,
    (pos.y-(window.innerHeight/2))*camera.zoom)
    if (touch.pos == undefined) touch.pos = {...newPos}
    console.log(touch.pos)

})
document.addEventListener("touchmove", (e)=>{
    var pos = v(e.touches[0].screenX, e.touches[0].screenY)
    newPos = v(
        (pos.x-(window.innerWidth/2))*camera.zoom,
    (pos.y-(window.innerHeight/2))*camera.zoom)
    if (touch.pos == undefined) touch.pos = {...newPos}

    var diff = v(
        newPos.x-touch.pos.x,
        newPos.y-touch.pos.y
    )
    console.log(diff)
    camera.target.x += diff.x
    camera.target.y += diff.y

    touch.pos = {...newPos}

})
document.addEventListener("touchend", (e)=>{
    touch.lastTime = ((new Date()).getTime())-touch.timer
    
    var screenPos = v(
        (touch.pos.x-camera.pos.x),
        (touch.pos.y-camera.pos.y)
    )
    console.log()

    if (mobile) {
        runClick(v(
            Math.floor((screenPos.x)/camera.gridScale),
                Math.floor((screenPos.y)/camera.gridScale),
        ))
    }
    touch.pos = undefined



    
})

var keys = {};
document.addEventListener("keydown", (e)=>{keys[e.key.toLowerCase()]=true})
document.addEventListener("keyup", (e)=>{keys[e.key.toLowerCase()]=false})

function runControls() {
    var speed = 20*camera.zoom
    if (keys.w||key.ArrowUp) camera.target.y -= -speed
    if (keys.s||key.ArrowDown) camera.target.y += -speed
    if (keys.a||key.ArrowLeft) camera.target.x -= -speed
    if (keys.d||key.ArrowRight) camera.target.x += -speed

    function add(num) {camera.targetZoom = clamp(camera.targetZoom+num,0.25, 2)}

    if (keys["="]) add(-0.05)
    if (keys["-"]) add(0.05)
}

document.addEventListener("scroll", (e)=>{
})
