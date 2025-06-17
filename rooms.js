export class Room {
    constructor(description, item, exits){
        this.description = description;
        this.item = item;
        this.exits = exits
    }


    describe() {
        return `${this.description}\n You see: ${this.item}\n{this.exits.join(", ")};`
    }


}