
import { Room } from "./rooms.js"
import { Player } from "./players.js"
import { Monster } from "./monsters.js"
import { Map } from "./maps.js"


const params = new URLSearchParams(window.location.search);
let playerName = params.get("name") || "Unknown Hero"


let firstPlay = true;
const playerNameInput = document.getElementById("playerName")
const gameText = document.getElementById("gameText");
const playerInfo = document.getElementById("playerInfo");
const startingMap = new Map("Front Yard", "a green yard with trees and a driveway", "Sit on old pine tree stump", ["endOfDriveWay", "gateToBackYard", "pineTreeIsland", "pebblesFrontYard"])
const pineTreeIsland = new Map("Pine Tree Island","a pine tree island with a pine tree stump and pine straw everywhere", "Search holly bush", ["startingMap", "gateToBackYard","endOfDriveWay"])
const endOfDriveWay = new Map("End of driveway","a concerete driveway with a huge funny smelling bush", "Sniff mailbox post", ["startingMap", "pineTreeIsland","pebblesFrontYard"])
const pebblesFrontYard = new Map("Neighbors front yard","a smaller tree island with chopped logs, and a white Mustang in a different driveway", "Check out open garage", ["startingMap", "endOfDriveWay"])
const gateToBackYard = new Map("Gate to backyard","a patch of grass and a chain link fence/gate with a hole just big enough for you to fit through", "Harass Chewie (The neighbors dog)", ["startingMap", "pineTreeIsland"])
const mainBackYard = new Map("Main Backyard","a yard of overgrown grass littered with dog poop everywhere!", "Sniff Poop", ["oldShed", "gateToBackYard","backDeck","underDeck"])
const oldShed = new Map("Old Shed","an old shed the smells like mildew and is filled with old lawn decorations", "Lay down in old dog cage", ["mainBackYard"])
const backDeck = new Map("Back deck","a nice new deck with a grill, and patio furniture", "Lay in patio chair", ["mainBackYard"])
const underDeck = new Map("Under Deck","a pile of leaves and construction materials and a mysterious door in to the crawlspace", "Check out crawl space", ["mainBackYard"])


const allMaps = {
    startingMap,
    pineTreeIsland,
    endOfDriveWay,
    pebblesFrontYard,
    gateToBackYard,
    mainBackYard,
    oldShed,
    backDeck,
    underDeck
};

let currentMap;
const fruitSnax = new Monster("Früt Snax", "Cat", -1);
const cirice = new Monster("Cirice", "Cat", -5);
const dooter = new Monster("Casey Dooter", "Dog", -10);
const dooterPoop = new Monster("Dog Poop", "Dog", -15);

let player1 = new Player(playerName, 100, 0, 0);


window.playerDoSomething = function(playerName){

    gameText.innerText = 
    `
    You stepped forward and were attacked by a ${zombie1.name}!
    `
    getAttackedIdiot(zombie1)
    return;
}

function init(name){
    firstPlay === true;
    currentMap = startingMap;
    updateHealthAndMana(player1, 0, 0, 0)
    explore()
}

function explore(){
    clearPlayerActions();
    if(player1.tades >= 10){
        gameOver(win)
        return;
    }
    
    if(firstPlay === true){
        alert(`Oh no! Freya got snatched up by mom and is being snuggled!
        Now she can't gather her tades!
        She needs your help ${player1.name}!`) 
        firstPlay = false;
        explore()
        return;
    }

    gameText.innerText = 
    `Current Location: ${currentMap.name} 
    You see ${currentMap.description}.
    Where would you like to go or what would you like to do?
    `

    for(let exitName of currentMap.exits){
        const destination = allMaps[exitName];
        let btn = document.createElement("button");
        btn.textContent = `${destination.name}`
        btn.className = "playerButtons";
        btn.onclick = () =>{
            currentMap = destination
            explore()
        }
        document.getElementById("playerActions").appendChild(btn)
    }
    const btn = document.createElement("button");
    btn.textContent = `${currentMap.item}`;
    btn.className = "playerButtons";
    btn.onclick = () =>{
        itemDo(currentMap.name)
    }
    document.getElementById("playerActions").appendChild(btn)
}

function gameOver(status){
    if(status === "win"){
        gameText.innerText = 
        `
        You've found all of Freya's Tades! Thank you for your help! 
        `
    }

}

function itemDo(item){
    switch(item){
        case "Front Yard":
            gameText.innerText = `You are now chilling and cleaning your toe beans on the old pine stump`
            break;
        case "Pine Tree Island":
            gameText.innerHTML = "You found 3 of Freya's tades! Good job!"
            updateHealthAndMana(player1, 0,0,3)
            break;
        case "Gate to backyard":
            gameText.innerHTML = "You harrased Chewie and chased him under their back deck, and that damn dog was hiding 4 of Freya's tades under there!"
            updateHealthAndMana(player1,0,0,4)
            break;

    }
}

function getRandomNumber(){
    let num = Math.random()

}

function clearPlayerActions(){
    document.getElementById("playerActions").innerHTML = "";
}

function updateHealthAndMana(entity, healthChng, manaChng, tadeChng){
    entity.updateHealth(healthChng);
    entity.updateMana(manaChng);
    entity.updateTades(tadeChng);
    playerInfo.innerText = 
    `${player1.name}'s health: ${player1.health}\n${player1.name}'s mana: ${player1.mana}\n${player1.name}'s tades: ${player1.tades} `
}

function getAttackedIdiot(monster){
    updateHealthAndMana(player1, monster.dmg, 0)
}

window.startGame = function(){
    let newPlayerName = playerNameInput.value;
    window.location.href = `./game.html?name=${encodeURIComponent(newPlayerName)}`;
}

init();
