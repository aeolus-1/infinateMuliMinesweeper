function appendMsgToChat(msg, user) {
    chatContainer = document.getElementById("chatContainer")
    let msgBox = createElementFromHTML(`<div>
    <span>[error]</span>
    <span>error, dm reef if you see this</span>
  </div>`)


  // INSERTS IT AS TEXT ONLY!!!!!!!!!!!!!!!!!!!!
  // NO MORE SCRIPT INJECTING!!!!!!!!!!!!!!!!!!!
  msgBox.children[0].textContent = `[${user}]`
  msgBox.children[1].textContent = `${msg}`

  chatContainer.appendChild(msgBox)

  chatContainer.scrollTop = chatContainer.scrollHeight;

}


function submitMsg(msg,user) {
    console.log("emiting new msg - ", `[${user}] ${msg}`)
    
   socket.emit("sendChat", {"user": user, "msg": msg})
    
    
    return 0
}

chatSubmit = document.getElementById("chatSubmit")
chatSubmitButton = document.getElementById("chatSubmitButton")



chatSubmitButton.onclick = ()=>{
    let currentUsername = (document.getElementById("usernameInput").value).substring(0, 5),
        msg = chatSubmit.value

    document.getElementById("chatSubmit").value = ""
    submitMsg(msg, currentUsername)
}
chatSubmit.addEventListener("keyup",(e)=>{
    if (e.key=="Enter"){
        chatSubmitButton.click()
    }
})
