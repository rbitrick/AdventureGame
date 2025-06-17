
import { Room } from "./rooms.js"
import { Player } from "./players.js"
import { Monster } from "./monsters.js"
import { Map } from "./maps.js"


const params = new URLSearchParams(window.location.search);
let playerName = params.get("name") || "Unknown Hero"

const playerNameInput = document.getElementById("playerName")
const gameText = document.getElementById("gameText");
const playerInfo = document.getElementById("playerInfo");
const startingMap = new Map("Front Yard", "a green yard with trees and a driveway", "an old pine tree stump", ["endOfDriveWay", "gateToBackyard", "pineTreeIsland", "pebblesFrontYard"])
const pineTreeIsland = new Map("Pine Tree Island","a pine tree island with a pine tree stump and pine straw everywhere", "a holly bush", ["startingMap", "gateToBackYard","endOfDriveWay"])
const endOfDriveWay = new Map("End of driveway","a concerete driveway with a huge funny smelling bush", "a mailbox", ["startingMap", "pineTreeIsland","pebblesFrontYard"])
const pebblesFrontYard = new Map("Neighbors front yard","a smaller tree island with chopped logs, and a white Mustang in a different driveway", "an open garage", ["startingMap", "endOfDriveway"])
const gateToBackyard = new Map("Gate to backyard","a patch of grass and a chain link fence/gate with a hole just big enough for you to fit through", "a pile of dog poop behind the gate", ["startingMap", "pineTreeIsland"])

const allMaps = {
    startingMap,
    pineTreeIsland,
    endOfDriveWay,
    pebblesFrontYard,
    gateToBackyard
};

let currentMap;
const fruitSnax = new Monster("Früt Snax", "Cat", -1);
const cirice = new Monster("Cirice", "Cat", -5);
const dooter = new Monster("Casey Dooter", "Dog", -10);
const dooterPoop = new Monster("Dog Poop", "Dog", -15);

let player1 = new Player(playerName, 100, 100, 0);


window.playerDoSomething = function(playerName){

    gameText.innerText = 
    `
    You stepped forward and were attacked by a ${zombie1.name}!
    `
    getAttackedIdiot(zombie1)
    return;
}

function init(name){
    currentMap = startingMap;
    updateHealthAndMana(player1, 0, 0)
    explore()
}

function explore(){
    clearPlayerActions();
    
    gameText.innerText = 
    `Welcome to "Freya's Tades", ${player1.name}!.\n
    Current Location: ${currentMap.name} 
    You see ${currentMap.description}.
    You see ${currentMap.item}.\n
    What would you like to do?
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
}

function clearPlayerActions(){
    document.getElementById("playerActions").innerHTML = "";
}

function updateHealthAndMana(entity, healthChng, manaChng){
    entity.updateHealth(healthChng);
    entity.updateMana(manaChng);
    playerInfo.innerText = 
    `${player1.name}'s health: ${player1.health}\n${player1.name}'s mana: ${player1.mana}`
}

function getAttackedIdiot(monster){
    updateHealthAndMana(player1, monster.dmg, 0)
}

window.startGame = function(){
    let newPlayerName = playerNameInput.value;
    window.location.href = `./game.html?name=${encodeURIComponent(newPlayerName)}`;
}

init();
