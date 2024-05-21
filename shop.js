var accountData = {}

var shopData = {
    flags:{
        1:{
            bought:true,
            name:"Defualt",
            rarity:"common",
            cost:0,
            src:"flag.png",
        },
        2:{
            name:"Purple",
            rarity:"common",
            cost:35,
            src:"./flags/purp.png",
        },
        3:{
            name:"Orange",
            rarity:"common",
            cost:35,
            src:"./flags/orange.png",
        },
        4:{
            name:"Chad",
            rarity:"common",
            cost:50,
            src:"./flags/flagChag.png",
        },
        5:{
            name:"Netherlands",
            rarity:"common",
            cost:50,
            src:"./flags/flagNetherlands.png",
        },
        6:{
            name:"Hick's Hexagons",
            rarity:"common",
            cost:60,
            src:"./flags/flagHicks.png",
        },
        7:{
            name:"Nerd",
            rarity:"common",
            cost:80,
            src:"./flags/flagNerd.png",
        },
        8:{
            name:"Garlic",
            rarity:"common",
            cost:100,
            src:"./flags/flagGarlic.png",
        },
        9:{
            name:"RainWorld",
            rarity:"common",
            cost:100,
            src:"./flags/flagRain.png",
        },
        10:{
            name:"Coc",
            rarity:"rare",
            cost:250,
            src:"./flags/flagCoc.png",
        },
        11:{
            name:"Men",
            rarity:"rare",
            cost:250,
            src:"./flags/flagMen.png",
        },
        12:{
            name:"Bleh Cat 1",
            rarity:"rare",
            cost:1000,
            src:"./flags/flagBleh.png",
        },
        13:{
            name:"Bleh Cat 2",
            rarity:"rare",
            cost:1000,
            src:"./flags/flagBleh1.png",
        },
        14:{
            name:"Bleh Cat 3",
            rarity:"rare",
            cost:1000,
            src:"./flags/flagBleh1.png",
        },

    }
},
    ownData = {
        1:true,
    }

function findPlayerData() {
    var playerAccount = accountData[multiplayerId]
    if (playerAccount!=undefined) {
        ownData = playerAccount.owns||{
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
            owns = window.ownData[selection]
        
            box.disabled = !owns

            
            
            
            box.style["pointer-events"] = (!owns)?"none":""
            box.children[0].classList.remove("disabled")
            if (!owns) {
                box.children[0].classList.add("disabled")
                console.log(box.children[0].id)
                box.children[3].textContent = `${shopData.flags[box.children[0].id].cost} 🪙`
                
            } else {
                box.style["pointer-events"] = (shopData.flags[selection].rarity=="rare")?"none":""

                box.children[2].textContent = (shopData.flags[selection].rarity=="rare")?"Found in lootboxes":"Bought"
                box.children[3].textContent = ``
            }
    }
}

function buyFlag(e) {
    var selection = e.previousElementSibling.previousElementSibling.id
    console.log(selection)
    if (!accountData[multiplayerId].owns[selection]) {
        console.log("yay")
        socket.emit("buyFlag", JSON.stringify({
            id:multiplayerId,
            buySelection:selection
        }))
        console.log("sent request to buy")
    }
}

function recieveItem(d) {
    alert("The loot box contained a "+d.name)
}


