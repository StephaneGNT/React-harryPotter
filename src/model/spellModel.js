class Spell {
    constructor(info) {
        this.left = 0;
        this.top = 0;
        this.height = 20;
        this.width = 20;
        this.id = info.id;
        this.direction = info.direction;
        this.color = info.color;
    }
}