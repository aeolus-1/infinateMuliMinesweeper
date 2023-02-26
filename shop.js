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
            box.classList.remove("disabled")
            if (!owns) box.classList.add("disabled")
    }
}