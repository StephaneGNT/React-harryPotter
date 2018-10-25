import React, { Component } from 'react';
import Fighter from '../scripts/FightFighter';
import Spell from '../scripts/FightSpell';
import Shield from '../scripts/FightShield';
import Header from '../scripts/Header';
import CombatVictory from '../scripts/FightCombatVictory'
import TournamentVictory from '../pages/TournamentVictory'
import WelcomeMessage from '../scripts/FightWelcomeMessage'
import Bonus from '../scripts/FightBonus.js'

import fighterModel from '../model/fighterModel.js'
import spellModel from '../model/spellModel.js'
import bonusMalusModel from '../model/bonusMalusModel.js'


// General static information

let controlsLeft = {
    attack: "w",
    defend: "q",
    rotate: "a",
    moveUp: "e",
    moveDown: "d",
    moveLeft: "s",
    moveRight: "f",
};

let controlsRight = {
    attack: "!",
    defend: "m",
    rotate: "p",
    moveUp: "ArrowUp",
    moveDown: "ArrowDown",
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight",
};

let fighter1Info = {
    id: "fighter1",
    life: 100,
    layout: {
        facesRight: true,
        top: 350,
        left: 100,
        width: 200,
        height: 150,
    },
    animate: {
        attack: controlsLeft.attack,
        defend: controlsLeft.defend,
        rotate: controlsLeft.rotate,
        moveUp: controlsLeft.moveUp,
        moveDown: controlsLeft.moveDown,
        moveLeft: controlsLeft.moveLeft,
        moveRight: controlsLeft.moveRight,
        speed: 5,
    },
    house: {
        name: "",
        color: "",
        secondColor: "",
    },
    attack: {
        spellCasted: false,
        attackPoints: 100,
        attackPower: 10,
        attackTime: 2000,
        attackCost: 25,
    },
    defense: {
        shieldOn: false,
        shieldNumber: 3,
        shieldTime: 3000,
    },
    opacity: 1,
};

let fighter2Info = {
    id: "fighter2",
    life: 100,
    layout: {
        facesRight: false,
        top: 350,
        left: 1250,
        width: 200,
        height: 150,
    },
    animate: {
        attack: controlsRight.attack,
        defend: controlsRight.defend,
        rotate: controlsRight.rotate,
        moveUp: controlsRight.moveUp,
        moveDown: controlsRight.moveDown,
        moveLeft: controlsRight.moveLeft,
        moveRight: controlsRight.moveRight,
        speed: 5,
    },
    house: {
        name: "",
        color: "",
        secondColor: "",
    },
    attack: {
        spellCasted: false,
        attackPoints: 100,
        attackPower: 10,
        attackTime: 2000,
        attackCost: 25,
    },
    defense: {
        shieldOn: false,
        shieldNumber: 3,
        shieldTime: 3000,
    },
    opacity: 1,
};



let bonusList = ["life", "size", "speed", "attackPower", "attackCost", "attackTime", "shieldTime", "shieldNumber", "invertControls"];

class Fight extends Component {

    constructor(props) {
        super(props)

        this.tournamentVictory = false;
        this.isFighterDead = false;
        this.winner = {};
        this.fightTime = 2;
        this.activeKeys = [];
        this.houses = this.props.fightersHouse;
        this.colors = this.props.fightersColor;
        this.secondColors = this.props.fightersSecondColor;

        this.spellfighter1 = {
            isVisible : false
        }
        this.spellfighter2 = {
            isVisible : false
        }

        this.initiateFighters(1)

        this.playersPoints = {
            "gryffindor": 0,
            "slytherin": 0,
            "ravenclaw": 0,
            "hufflepuff": 0,
        };

        this.bonus = {
            on : false,
        };
        this.bonusTime = 5000;
        this.bonusOn = true;
        this.malusOn = true;

        this.state = {
            turn: 1,
            tournamentVictory: this.tournamentVictory,
            isFighterDead: this.isFighterDead,
            winner: this.winner,
            playersPoints: this.playersPoints,
            fighter1: this.fighter1,
            fighter2: this.fighter2,
            spellfighter1: this.spellfighter1,
            spellfighter2: this.spellfighter2,
            activeKeys: [],
            bonus: this.bonus,
            collision:false,
        };
    }

    componentDidMount = () => {
        this.initiateFighters(this.state.turn);

        document.addEventListener("keydown", this.addKeyPress, false);
        document.addEventListener("keyup", this.removeKeyPress, false);

        // Bonus apparition
        if(this.bonusOn){
            setInterval(()=>{
                if(!this.bonus.on) this.generateBonus()
            },this.bonusTime)
        }

        // GAME PHYSICS
        setInterval(() => {
            // Cast spell
            if (this.fighter1.attack.spellCasted){
                this.spellfighter1 = new spellModel(this.fighter1);
                this.fighterThrowSpell(this.fighter1, this.fighter2, this.spellfighter1);
                this.fighter1.attack.spellCasted = false;
            }
            if (this.fighter2.attack.spellCasted){
                this.spellfighter2 = new spellModel(this.fighter2);
                this.fighterThrowSpell(this.fighter2, this.fighter1, this.spellfighter2);
                this.fighter2.attack.spellCasted = false;
            }

            // Bonus-Malus recuperation
            if (this.bonus.on && this.collides(this.fighter1, this.bonus)){
                this.getBonus(this.fighter1, this.bonus, this.fighter2)
                this.bonus.destroy()
            }
            if (this.bonus.on && this.collides(this.fighter2, this.bonus)){
                this.getBonus(this.fighter2, this.bonus, this.fighter1)
                this.bonus.destroy()
            }
        }, 100)

        // Update states
        setInterval(() => {
            this.setState({
                fighter1: this.fighter1,
                fighter2: this.fighter2,
                playersPoints: this.playersPoints,
                spellfighter1: this.spellfighter1,
                spellfighter2: this.spellfighter2,
                winner: this.winner,
                tournamentVictory: this.tournamentVictory,
                isFighterDead: this.isFighterDead,
                bonus: this.bonus,
            })
        }, 300)
    }

    // KEY LISTENER FOR FIGHTERS ANIMATION
    addKeyPress = (event) => {
        if (this.activeKeys.indexOf(event.key) === -1) {
            this.activeKeys.push(event.key)
        }
        this.animateFighter(this.activeKeys)
    }
    removeKeyPress = (event) => {
        this.activeKeys.splice(this.activeKeys.indexOf(event.key))
        this.animateFighter(this.activeKeys)
    }
    animateFighter = (activeKeys) => {
        this.fighter1.animateFighter(activeKeys);
        this.fighter2.animateFighter(activeKeys);
    }

    // SPELL THROW
    fighterThrowSpell(shooter, target, spell){
        spell.animate(shooter);

        let collisionDetectionIntervall = setInterval(()=>{
            if(this.collides(spell, target)){
                if(!target.defense.shieldOn){
                    target.getImpacted(shooter.attack.attackPower);
                    spell.destroy();
                    clearInterval(collisionDetectionIntervall)
                }
            }
            if(target.life <= 0){
                console.log(target.id+" is dead")
                this.endOfFight(target, shooter)
            }
        },10)    
    }

    // Fighters selection depending on turn and number of players
    initiateFighters = (turn) => {
        let i = 0;
        let j = 1;

        switch (this.props.fightersHouse.length) {
            case 3:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 1; j = 2 }; break;
                    case 3: { i = 0; j = 2 }; break;
                };
                break;
            case 4:
                switch (turn) {
                    case 1: { i = 0; j = 1 }; break;
                    case 2: { i = 2; j = 3 }; break;
                    case 3: { i = 0; j = 2 }; break;
                    case 4: { i = 1; j = 3 }; break;
                    case 5: { i = 0; j = 3 }; break;
                    case 6: { i = 1; j = 2 }; break;
                };
                break;
            default: { i = 0; j = 1 }; break;
        };

        fighter1Info = {
            ...fighter1Info,
            house: {
                name: this.props.fightersHouse[i],
                color: this.props.fightersColor[i],
                secondColor: this.props.fightersSecondColor[i],
            },
        }
        this.fighter1 = new fighterModel(fighter1Info)

        fighter2Info = {
            ...fighter2Info,
            house: {
                name: this.props.fightersHouse[j],
                color: this.props.fightersColor[j],
                secondColor: this.props.fightersSecondColor[j],
            },
        }
        this.fighter2 = new fighterModel(fighter2Info)

        this.turn = turn;
    }

    generateBonus = () => {
        let bonusInfo = {
            coeff : this.malusOn ? (Math.random() < 0.5 ? -1 : 1) : 1,
            //chosenSort : bonusList[Math.floor(Math.random()*bonusList.length)]
            chosenSort : bonusList[8]
        }
        this.bonus = new bonusMalusModel(bonusInfo)
        this.bonus.appear()    
    }
    // Render bonus / malus
    renderBonus = () => {
        if (this.bonus.on) {
            return <Bonus
                bonus={this.bonus}
            />
        }
        return
    }

    // End of a fight (death of a fighter or end of timer)
    endOfFight = (loser, winner) => {
        this.isFighterDead = true;

        let winningHouse = winner.house.name;
        let losingHouse = loser.house.name;
        loser.opacity = 0;
        this.winner = winner;
        
        this.playersPoints = {
            ...this.playersPoints,
            [winningHouse]: this.playersPoints[winningHouse] + winner.life,
            [losingHouse]: this.playersPoints[losingHouse] + loser.life,
        };
        
        if ((this.props.fightersHouse.length === 3 && this.turn === 3) || (this.props.fightersHouse.length === 4 && this.turn === 6)) {
            this.tournamentVictory = true
        }
    }

    getBonus = (fighter, bonus, otherFighter) => {
        let bonusMultiply = bonus.coeff > 0 ? 5 : 0.2;
        switch (bonus.chosenSort) {
            case ("life"): fighter.impactLife(bonus.coeff * 10); break;
            case ("size"): fighter.impactSize(1/bonusMultiply); break;
            case ("speed"): fighter.impactSpeed(Math.pow(bonusMultiply, 2)); break;
            case ("attackPower"): fighter.impactAttackPower(bonusMultiply); break;
            case ("attackCost"): fighter.impactAttackCost(1 / bonusMultiply); break;
            case ("attackTime"): fighter.impactAttackTime(1 / bonusMultiply); break;
            case ("shieldTime"): fighter.impactDefenseTime(bonus.coeff*1000); break;
            case ("shieldNumber"): fighter.impactShieldNumber(bonus.coeff); break;
            case ("invertControls"): 
                {
                    if(bonus.coeff === -1) fighter.invertControls(); 
                    else otherFighter.invertControls()
                }; break;
        }
    }

    // Collision detection function
    collides(object1, object2) {
        if (object1.layout.top < object2.layout.top + object2.layout.width &&
            object1.layout.top + object1.layout.width > object2.layout.top &&
            object1.layout.left < object2.layout.left + object2.layout.height &&
            object1.layout.height + object1.layout.left > object2.layout.left) {
                console.log("Collisioooooooooooooooo")
                return true
        }
        else {
            return false
        };
    };

    restartFight = () => {
        this.initiateFighters(1);
        this.isFighterDead = false;
    }
    nextFight = (turn) => {
        this.initiateFighters(turn);
        this.isFighterDead = false
    }



    render() {

        let fighter1Info = {
            color: this.fighter1.house.color,
            secondColor: this.fighter1.house.secondColor,
            house: this.fighter1.house.name,
        }

        let fighter2Info = {
            color: this.fighter2.house.color,
            secondColor: this.fighter2.house.secondColor,
            house: this.fighter2.house.name,
        }

        return (
            <div>
                {
                    this.state.tournamentVictory ?
                        <TournamentVictory
                            points={this.playersPoints}
                            houses={this.props.fightersHouse}
                        />
                        :
                        <div>
                            <div>
                                <Header
                                    fighter1={this.fighter1}
                                    fighter2={this.fighter2}
                                    fightTime={this.fightTime}
                                    endOfFight={this.endOfFight}
                                />
                            </div>
                            <div>
                                <WelcomeMessage
                                    fighter1Info={fighter1Info}
                                    fighter2Info={fighter2Info}
                                />
                            </div>
                            <div>
                                <Fighter                // Player#1
                                    fighter={this.fighter1}
                                />
                            </div>
                            <div>{
                                this.spellfighter1.isVisible ?
                                    <Spell
                                        spell={this.spellfighter1}
                                    />
                                    :
                                    <div></div>
                            }</div>
                            <div>{
                                this.fighter1.defense.shieldOn ?
                                    <Shield
                                        fighter={this.fighter1}
                                    />
                                    :
                                    <div></div>
                            }</div>
                            <div>
                                <Fighter                // Player#2
                                    fighter={this.fighter2}
                                />
                            </div>
                            <div>{
                                this.spellfighter2.isVisible ?
                                    <Spell
                                        spell={this.spellfighter2}
                                    />
                                    :
                                    <div></div>
                            }</div>
                            <div>{
                                this.fighter2.defense.shieldOn ?
                                    <Shield
                                        fighter={this.fighter2}
                                    />
                                    :
                                    <div></div>
                            }</div>
                            {this.renderBonus()}
                            <div>{
                                this.isFighterDead ?
                                    <CombatVictory
                                        winner={this.winner}
                                        getCurrentFighters={this.getCurrentFighters}
                                        turn={this.turn}
                                        tournamentMode={this.props.tournamentMode}
                                        restartFight={this.restartFight}
                                        nextFight={this.nextFight}
                                    />
                                    :
                                    <div></div>
                            }</div>
                        </div>
                }</div>
        );
    }

}

export default Fight;
