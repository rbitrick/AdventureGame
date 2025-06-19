
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
const startingMap = new Map("Front Yard", "a green yard with trees and a driveway", "Sit on old pine tree stump", ["endOfDriveWay", "gateToBackYard", "pineTreeIsland", "pebblesFrontYard"],0,0)
const pineTreeIsland = new Map("Pine Tree Island","a pine tree island with a pine tree stump and pine straw everywhere", "Search holly bush", ["startingMap", "gateToBackYard","endOfDriveWay"],0,0)
const endOfDriveWay = new Map("End of driveway","a concerete driveway with a huge funny smelling bush", "Sniff mailbox post", ["startingMap", "pineTreeIsland","pebblesFrontYard"],0,0)
const pebblesFrontYard = new Map("Neighbors front yard","a smaller tree island with chopped logs, and a white Mustang in a different driveway", "Check out open garage", ["startingMap", "endOfDriveWay"],0,0)
const gateToBackYard = new Map("Gate to backyard","a patch of grass and a chain link fence/gate with a hole just big enough for you to fit through", "Harass Chewie (The neighbors dog)", ["startingMap", "pineTreeIsland","mainBackYard"],0,0)
const mainBackYard = new Map("Main Backyard","a yard of overgrown grass littered with dog poop everywhere!", "Sniff Poop", ["oldShed", "gateToBackYard","backDeck","underDeck"],0,1)
const oldShed = new Map("Old Shed","an old shed the smells like mildew and is filled with old lawn decorations", "Lay down in old dog cage", ["mainBackYard"],0,1)
const backDeck = new Map("Back deck","a nice new deck with a grill, and patio furniture", "Lay in patio chair", ["mainBackYard"],0,1)
const underDeck = new Map("Under Deck","a pile of leaves and construction materials and a mysterious door in to the crawlspace", "Check out crawl space", ["mainBackYard"],0,1)


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
const rat = new Monster("Rat", "Rat", -5);

const allMonsters = [
    fruitSnax,
    cirice,
    dooter,
    dooterPoop,
    rat
]


let player1 = new Player(playerName, 100, 0, 0);


function init(name){
    firstPlay === true;
    currentMap = startingMap;
    updateHealthAndMana(player1, 0, 0, 0)
    explore()
}

function explore(){
    clearPlayerActions();
    if(player1.tades >= 15){ //issue #2 - update logic to find ALL the tades. Not a sufficent amount
        gameOver("win")
        return;
    }

    if(randomEncounterChance(25) && currentMap !== startingMap){
        randomEncounter()
        return;
    }

    if(firstPlay === true){
        alert(`Oh no! Freya got snatched up by mom and is being snuggled!
        Now she can't gather her tades!
        She needs your help ${player1.name}!`) 
        firstPlay = false
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
        alert("You've found all of Freya's Tades! Thank you for your help!")
        window.location.href = `./index.html`;

    } else if (status === "death"){
        alert(`Oh no! You've died! Game over!`)
        window.location.href = `./index.html`;
    }

}

function itemDo(item){
    switch(item){
        case "Front Yard":
            gameText.innerText = `You are now chilling and cleaning your toe beans on the old pine stump`
            break;
        case "End of driveway":
            gameText.innerText = `Smells like wood`
            break;            
        case "Pine Tree Island":
            if(currentMap.actionComplete === 0){
                gameText.innerHTML = "You found 3 of Freya's tades! Good job!"
                currentMap.actionComplete = 1;
                updateHealthAndMana(player1, 0,0,3)
            } else if (currentMap.actionComplete > 0){
                gameText.innerHTML = "You searched the holly bush and didn't find anything"
                break;
            }
            break;
        case "Gate to backyard":
            if(currentMap.actionComplete === 0){
                gameText.innerHTML = "You harrased Chewie and chased him under their back deck, and that damn dog was hiding 4 of Freya's tades under there!"
                currentMap.actionComplete = 1;
                updateHealthAndMana(player1,0,0,4)
                break;
            } else if (currentMap.actionComplete > 0){
                gameText.innerHTML = "You scared Chewie off and he's nowhere to be found now."
                break;                
            }
        case "Main Backyard":
            gameText.innerHTML = "Oh no! This was a fresh one and it's smell has injured you!"
            getAttackedIdiot(dooterPoop)
            break;
        case "Old Shed":
            if(currentMap.actionComplete === 0){
                gameText.innerHTML = "You went to lay down in the dog crate, and felt something lumpy under the blanket. 5 more tades!"
                currentMap.actionComplete = 1;
                updateHealthAndMana(player1,0,0,5)
                break;
            } else if (currentMap.actionComplete > 0){
                gameText.innerHTML = "You take a nice cat nap in the dog crate"
                break;                
            }
        case "Under Deck":
            if(currentMap.actionComplete === 0){
                gameText.innerHTML = "You creep in to the crawl space and OH NO! A rat snipped at you and injured you, but, when the rat ran away, there were 3 tades in her nest!"
                currentMap.actionComplete = 1;
                getAttackedIdiot(rat)
                updateHealthAndMana(player1,0,0,3)
                break;
            } else if (currentMap.actionComplete > 0){
                gameText.innerHTML = "You hear more rats scurring around, better get out of here!"
                break;                
            }      
        //Issue #4 - no garage door action
        case "Neighbors front yard":
            gameText.innerText =
            `
            You sniff around and find a motorcycle and some old baby toys. Nothing interesting here
            `
            break;
        //Issue #3 - no patio chair action
        case "Back deck":
            gameText.innerText = 
            `
            You lay down and have a nice cat nap in the sun on the patio chair.
            `
            break;

    }
}

function getRandomMonster(){
    let num = Math.floor((Math.random()*Math.random()*Math.random())*3)
    return allMonsters[num]
}

function randomEncounterChance(chancePercent){
    return Math.random() < (chancePercent / 100)
}

function randomEncounter(){
        let randomMonster = getRandomMonster();
        gameText.innerText =
        `
        Oh no! You've been ransacked by ${randomMonster.name}! You've been injured!
        ` 
        getAttackedIdiot(randomMonster)
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

function updateHealthAndMana(entity, healthChng, manaChng, tadeChng){
    entity.updateHealth(healthChng);
    entity.updateMana(manaChng);
    entity.updateTades(tadeChng);
    playerInfo.innerText = 
    `${player1.name}'s health: ${player1.health}\n${player1.name}'s mana: ${player1.mana}\n${player1.name}'s tades: ${player1.tades} `
}

function getAttackedIdiot(monster){
    updateHealthAndMana(player1, monster.dmg, 0,0)
    if(player1.health <= 0){
        gameOver("death")
        return;
    }
}

window.startGame = function(){
    let newPlayerName = playerNameInput.value;
    window.location.href = `./game.html?name=${encodeURIComponent(newPlayerName)}`;
}

init();
