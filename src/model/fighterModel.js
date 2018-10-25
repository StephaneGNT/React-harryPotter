class fighterModel {
    
    constructor(info) {
        this.id = info.id;
        this.life = info.life;
        this.layout = {
            facesRight : info.layout.facesRight,
            top : info.layout.top,
            left : info.layout.left,
            width : info.layout.width,
            height : info.layout.height,
        }
        this.animate = {
            attack : info.animate.attack,
            defend : info.animate.defend,
            rotate : info.animate.rotate,
            moveUp : info.animate.moveUp,
            moveDown : info.animate.moveDown,
            moveLeft : info.animate.moveLeft,
            moveRight : info.animate.moveRight,
            speed : info.animate.speed,
        };
        this.house = {
            name : info.house.name,
            color : info.house.color,
            secondColor : info.house.secondColor,
        };
        this.attack = {
            spellCasted : info.attack.spellCasted,
            attackPoints : info.attack.attackPoints,
            attackPower : info.attack.attackPower,
            attackTime : info.attack.attackTime,
            attackCost : info.attack.attackCost,
        };
        this.defense = {
            shieldOn : info.defense.shieldOn,
            shieldNumber : info.defense.shieldNumber,
            shieldTime : info.defense.shieldTime,
        };
        this.opacity = info.opacity;
        this.bonusTime = 20000;
    }

    // Fighter key detection
    animateFighter = (activeKeys) => {
        if (activeKeys.indexOf(this.animate.attack) !== -1 && this.attack.attackPoints >= this.attack.attackCost) {
            this.castSpell();
        }
        if (activeKeys.indexOf(this.animate.defend) !== -1 && this.defense.shieldNumber > 0) {
            this.defend();
        }
        if (activeKeys.indexOf(this.animate.rotate) !== -1) {
            this.rotate();
        }
        if (activeKeys.indexOf(this.animate.moveUp) !== -1 && this.layout.top > 80) {
            this.move(0, -this.animate.speed);
        }
        if (activeKeys.indexOf(this.animate.moveDown) !== -1 && this.layout.top + this.layout.height + this.animate.speed < window.innerHeight) {
            this.move(0, this.animate.speed);
        }
        if (activeKeys.indexOf(this.animate.moveLeft) !== -1 && this.layout.left > 0) {
            this.move(-this.animate.speed, 0);
        }
        if (activeKeys.indexOf(this.animate.moveRight) !== -1 && this.layout.left + this.layout.width + this.animate.speed < window.innerWidth) {
            this.move(this.animate.speed, 0);
        }
    }

    // FIGHTER ANIMATIONS

    castSpell = () => {
        console.log(this.id+" shoots")
        this.attack.spellCasted = true;
        this.attack.attackPoints=this.attack.attackPoints-this.attack.attackCost;

        // Attack reload :
        let reloadIntervall = setInterval(() => {
            if(this.attack.attackPoints+this.attack.attackCost/10<=100){
                this.attack.attackPoints=this.attack.attackPoints+this.attack.attackCost/10
            }
            if(this.attack.attackPoints>=100) clearInterval(reloadIntervall)
        }, this.attack.attackTime/10)   
    }

    move = (x, y) => {
        this.layout.top = this.layout.top + y;
        this.layout.left = this.layout.left + x;
    }

    rotate = () => {
        this.layout.facesRight = !this.layout.facesRight
    }

    defend = () => {
        this.defense.shieldOn = true;
        this.defense.shieldNumber = this.defense.shieldNumber - 1;

        setTimeout(()=>{
            this.defense.shieldOn = false;
        },this.defense.shieldTime);
    }

    getImpacted = (shotPower) => {
        this.life = this.life - shotPower
    }


    // BONUS / MALUS EFFECTS

    impactLife = (lifePoints) => {
        if(this.life + lifePoints > 100) 100;
        else if(this.life + lifePoints < 0) 0;
        else this.life = this.life + lifePoints;
    }

    impactSize = (sizeChange) => {
        this.layout.width = this.layout.width * sizeChange;
        this.layout.height = this.layout.height * sizeChange;
        setTimeout(() => {
            this.layout.width = this.layout.width / sizeChange;
            this.layout.height = this.layout.height / sizeChange;
        },this.bonusTime/2)
    }

    impactSpeed = (speedChange) => {
        this.animate.speed = this.animate.speed * speedChange
        setTimeout(() => {
            this.animate.speed = this.animate.speed / speedChange
        },this.bonusTime/2)
    }

    impactAttackPower = (attackPowerChange) => {
        this.attack.attackPower = this.attack.attackPower * attackPowerChange
        setTimeout(() => {
            this.attack.attackPower = this.attack.attackPower / attackPowerChange
        },this.bonusTime/2)
    }

    impactAttackCost = (attackCostChange) => {
        console.log("attackCost impacted")
        this.attack.attackCost = this.attack.attackCost * attackCostChange
        setTimeout(() => {
            this.attack.attackCost = this.attack.attackCost / attackCostChange
        },this.bonusTime/2)
    }

    impactAttackTime = (attackTimeChange) => {
        console.log("attackTime impacted")
        // this.modify(this.attack.attackTime,attackTimeChange)
        this.attack.attackTime = this.attack.attackTime * attackTimeChange
        setTimeout(() => {
            this.attack.attackTime = this.attack.attackTime / attackTimeChange
        },this.bonusTime/2)
    }

    impactDefenseTime = (defenseTimeChange) => {
        console.log("defenseTime impacted")
        // this.modify(this.defense.defenseTime,defenseTimeChange)
        this.defense.shieldTime = this.defense.shieldTime * defenseTimeChange
    }

    impactShieldNumber = (numberOfShields) => {
        console.log("numberOfShields impacted")
        this.defense.shieldNumber = this.defense.shieldNumber + numberOfShields
    }

    invertControls = () => {
        console.log("Controls impacted")
        this.invertControls();
        setTimeout(() => {
            this.invertControls();
        },this.bonusTime/2)
    }

    invertControls = () => {
        let x = this.animate.moveUp ;
        this.animate.moveUp = this.animate.moveDown ;
        this.animate.moveDown = x ;
        x = this.animate.moveLeft ;
        this.animate.moveLeft = this.animate.moveRight ;
        this.animate.moveRight = x ;
    }

    modify = (value, change) => {
        value = value * change;

        setTimeout(() => {
            value = value / change;
        },this.bonusTime)
    }
}

export default fighterModel