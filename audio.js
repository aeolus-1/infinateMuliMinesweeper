function createAudioEle(src) {
    let el = new Audio(src)
    return el
}

var audio = {
    flag_place:createAudioEle("music/page_flip.wav"),
    bomb:createAudioEle("music/bomb.wav"),
    music:createAudioEle("music/music.mp3"),
}