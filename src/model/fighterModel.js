/*import Spell from './spellModel'

class Fighter {
    constructor(info) {
        this.id = info.id;
        this.spellCasted = false;
        this.facesRight = info.facesRight;
        this.top = 250;
        this.left = info.left;
        this.life = 100;
        this.width = 250;
        this.height = 200;
        this.attack = info.attack;
        this.defense = info.defense;
        this.rotate = info.rotate;
        this.moveUp = info.moveUp;
        this.moveDown = info.moveDown;
        this.moveLeft = info.moveLeft;
        this.moveRight = info.moveRight;
        this.house = info.house;
        this.color = info.color;
        this.secondColor = info.secondColor;
        this.powerSpell = 50;
    }

    castSpell = () => {
        this.castSpell = true;

        let spellInfo={
            left = this.facesRight ? this.left + 260 : this.left - 30,
            top = this.top + 80,
            id = "spell"+this.id,
            direction = this.facesRight ? 10 : -10,
            color = this.color
        }

        let spellFighter = new Spell(spellInfo)

        setInterval = (() => {
            spellFighter.left = spellFighter.left + 10
        },100)

        setTimeout = (() => {
            castSpell = false;
        }, 2000)
    }

    move = (x, y) => {
        this.top = this.top + y;
        this.left = this.left + x;
    }

    rotateFighter = () => {
        this.facesRight = !this.facesRight
    }
}*/