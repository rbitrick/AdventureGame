export class Player{
    constructor(name, health, mana, tades){
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.tades = tades
    }

    getHealth(){
        return this.health;
    }

    updateHealth(healthChng){
        this.health = this.health + healthChng

    }

    updateMana(manaChng){
        this.mana = this.mana + manaChng
    }
}