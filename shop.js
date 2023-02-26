var accountData = {}

var shopData = {
    flags:{
        1:{
            bought:true,
            name:"Defualt",
            cost:0,
            src:"flag.png",
        },
        2:{
            name:"Purple",
            cost:200,
            src:"./flags/purp.png",
        },
        3:{
            name:"Orange",
            cost:200,
            src:"./flags/orange.png",
        },
        4:{
            name:"Ukraine",
            cost:500,
            src:"./flags/ukraine.png",
        },
    }
},
    ownData = {
        1:true,
    }

function findPlayerData() {
    var playerAccount = accountData[multiplayerId]
    if (playerAccount!=undefined) {
        ownData = playerAccount.ownData||{
            1:true,
        }
    }
}

function runShop() {
    findPlayerData()
    var boxes = document.getElementsByClassName("flagSelectionBox")
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        var selection = parseInt(box.children[0].id),
            owns = ownData[selection]
        
            box.disabled = !owns
            
            
            box.style["pointer-events"] = (!owns)?"none":""
            box.children[0].classList.remove("disabled")
            if (!owns) {
                box.children[0].classList.add("disabled")
                box.children[3].textContent = `${shopData.flags[box.children[0].id].cost} 🪙`
                
            } else {
                box.children[2].textContent = "Bought"
                box.children[3].textContent = ``
            }
    }
}

function buyFlag(e) {
    var selection = e.previousElementSibling.previousElementSibling.id
    if (!accountData[multiplayerId].owns[selection]) {
        socket.emit("buyFlag", JSON.stringify({
            id:multiplayerId,
            buySelection:selection
        }))
        console.log("sent request to buy")
    }
}