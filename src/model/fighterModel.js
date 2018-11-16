import defenseMusic from '../sound/defenseSound.mp3';
// import wizardShot from '..image/wizardShot.png'
const defenseSound = new Audio(defenseMusic);

class FighterModel {
  constructor(id, facesRight, left, controls, houseName, houseColor, houseSecondColor) {
    this.id = id;
    this.life = 100;
    this.layout = {
      facesRight,
      top: 350,
      left,
      width: 200,
      height: 150,
    };
    this.animate = {
      attack: controls.attack,
      defend: controls.defend,
      rotate: controls.rotate,
      moveUp: controls.moveUp,
      moveDown: controls.moveDown,
      moveLeft: controls.moveLeft,
      moveRight: controls.moveRight,
      speed: 20,
    };
    this.house = {
      name: houseName,
      color: houseColor,
      secondColor: houseSecondColor,
    };
    this.attack = {
      spellCasted: false,
      attackPoints: 100,
      attackPower: 10,
      attackTime: 2000,
      attackCost: 25,
      gotShot: false,
    };
    this.defense = {
      shieldOn: false,
      shieldNumber: 3,
      shieldTime: 3000,
    };
    this.opacity = 1;
    this.bonusTime = 20000;
  }

  // Fighter key identification
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
    this.attack.spellCasted = true;
    this.attack.attackPoints = this.attack.attackPoints - this.attack.attackCost;

    // Attack reload :
    const reloadIntervall = setInterval(() => {
      if (this.attack.attackPoints + this.attack.attackCost / 10 <= 100) {
        this.attack.attackPoints = this.attack.attackPoints + this.attack.attackCost / 10;
      }
      if (this.attack.attackPoints >= 100) clearInterval(reloadIntervall);
    }, this.attack.attackTime / 10);
  }

  move = (x, y) => {
    this.layout.top = this.layout.top + y;
    this.layout.left = this.layout.left + x;
  }

  rotate = () => {
    this.layout.facesRight = !this.layout.facesRight;
  }

  defend = () => {
    defenseSound.play();
    defenseSound.volume = 1;

    this.defense.shieldOn = true;
    this.defense.shieldNumber = this.defense.shieldNumber - 1;

    setTimeout(() => {
      this.defense.shieldOn = false;
    }, this.defense.shieldTime);
  }

  getImpacted = (shotPower) => {
    // console.log(this.gotShot)
    this.life = this.life - shotPower;
    this.gotShot = true;
    setTimeout(()=>{
      this.gotShot = false;
    }, 200)
  }


  // BONUS / MALUS EFFECTS

  impactLife = (lifePoints) => {
    if (this.life + lifePoints > 100) this.life = 100;
    else if (this.life + lifePoints < 0) this.life = 0;
    else this.life = this.life + lifePoints;
  }

  impactSize = (sizeChange) => {
    this.layout.width = this.layout.width * sizeChange;
    this.layout.height = this.layout.height * sizeChange;
    setTimeout(() => {
      this.layout.width = this.layout.width / sizeChange;
      this.layout.height = this.layout.height / sizeChange;
    }, this.bonusTime / 2);
  }

  impactSpeed = (speedChange) => {
    this.animate.speed = this.animate.speed * speedChange;
    setTimeout(() => {
      this.animate.speed = this.animate.speed / speedChange;
    }, this.bonusTime / 2);
  }

  impactAttackPower = (attackPowerChange) => {
    this.attack.attackPower = this.attack.attackPower * attackPowerChange;
    setTimeout(() => {
      this.attack.attackPower = this.attack.attackPower / attackPowerChange;
    }, this.bonusTime / 2);
  }

  impactAttackCost = (attackCostChange) => {
    this.attack.attackCost = this.attack.attackCost * attackCostChange;
    setTimeout(() => {
      this.attack.attackCost = this.attack.attackCost / attackCostChange;
    }, this.bonusTime / 2);
  }

  impactAttackTime = (attackTimeChange) => {
    this.attack.attackTime = this.attack.attackTime * attackTimeChange;
    setTimeout(() => {
      this.attack.attackTime = this.attack.attackTime / attackTimeChange;
    }, this.bonusTime / 2);
  }

  impactDefenseTime = (defenseTimeChange) => {
    this.defense.shieldTime = this.defense.shieldTime * defenseTimeChange;
  }

  impactShieldNumber = (numberOfShields) => {
    this.defense.shieldNumber = this.defense.shieldNumber + numberOfShields;
  }

  invertControls = () => {
    this.invertControls();
    setTimeout(() => {
      this.invertControls();
    }, this.bonusTime / 2);
  }

  invertControls = () => {
    let x = this.animate.moveUp;
    this.animate.moveUp = this.animate.moveDown;
    this.animate.moveDown = x;
    x = this.animate.moveLeft;
    this.animate.moveLeft = this.animate.moveRight;
    this.animate.moveRight = x;
  }
}

export default FighterModel;
