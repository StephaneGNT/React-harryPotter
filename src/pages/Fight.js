import React, { Component } from 'react';
import Fighter from '../scripts/FightFighter';
import Spell from '../scripts/FightSpell';
import Shield from '../scripts/FightShield';
import Header from '../scripts/Header';
import CombatVictory from '../scripts/FightCombatVictory'
import TournamentVictory from '../pages/TournamentVictory'
import WelcomeMessage from '../scripts/FightWelcomeMessage'

//import fighterModel from '../model/fighterModel.js' 

class Fight extends Component {

    constructor() {
        super()
        this.state = {
            tournamentVictory:false,
            isFighterDead: false,
            turn: 1,
            winner: {},

            playersPoints:{
                "gryffindor":0,
                "slytherin":0,
                "ravenclaw":0,
                "hufflepuff":0,
            },

            fighter1: {
                id: "fighter1",
                spellCasted: false,
                rotation: 0,
                facesRight: true,
                top: 250,
                left: 100,
                life: 100,
                width: 250,
                height: 200,
                attack: "w",      // Attaque: w
                defend: "q",    // Défense: q
                rotate: "a",     // Rotate: a
                moveUp: "e",         // Up: e
                moveDown: "d",      // Down: d
                moveLeft: "s",        // Left: s
                moveRight: "f",       // Right: f
                house:"",
                castSpell: this.castSpell,
                move: this.move,
                rotateFighter: this.rotate,
                takeOutShield: this.takeOutShield,
                color: "",
                secondColor:"",
                style: {},
                attackCharacteristics:{
                    attackPoints: 100,
                    attackPower: 10,
                    attackTime: 2000,
                    attackCost: 25,
                },
                defense:{
                    shieldOn: false,
                    shieldNumber: 3,
                    shieldTime: 3000,
                }
            },
            fighter2: {
                id: "fighter2",
                spellCasted: false,
                rotation: 180,
                facesRight: false,
                top: 250,
                left: 1100,
                life: 100,
                width: 250,
                height: 200,
                attack: "!",                 // Attaque: Ctrl 
                defend: "m",               // Défense: !
                rotate: "p",                // Rotate: :
                moveUp: "ArrowUp",                 // Up: Flèche du haut
                moveDown: "ArrowDown",               // Down: Flèche du bas
                moveLeft: "ArrowLeft",               // Left: Flèche de gauche
                moveRight: "ArrowRight",              // Right: Flèche de droite
                house:"",
                allCharacteristics: this.fighterAndSpellCallback,
                castSpell: this.castSpell,
                move: this.move,
                rotateFighter: this.rotate,
                takeOutShield: this.takeOutShield,
                color: "",
                secondColor:"",
                style: {},
                attackCharacteristics:{
                    attackPoints: 100,
                    attackPower: 10,
                    attackTime: 2000,
                    attackCost: 25,
                },
                defense:{
                    shieldOn: false,
                    shieldNumber: 3,
                    shieldTime: 3000,
                }
            },
            spellfighter1: {
                left: 0,
                top: 0,
                height: 20,
                width: 20,
                id: "",
                direction: 100,
                color: "",
            },
            spellfighter2: {
                left: 0,
                top: 0,
                height: 20,
                width: 20,
                id: "",
                direction: -100,
                color: "",
            },

            
        }
    }

    componentDidMount = () => {       
        this.getCurrentFighters(this.state.turn);
    }

    componentDidUpdate=()=>{
        if(this.state.fighter1.spellCasted){
            setInterval(() => {
                // Collision detection between a spell and a wizard
                if (this.hasCollision(this.state.spellfighter1, this.state.fighter2))
                    this.hasBeenTouched(this.state.fighter2.id, this.state.fighter1.id);
            }, 10)
        }
        if(this.state.fighter2.spellCasted){
            setInterval(() => {
                // Collision detection between a spell and a wizard
                if (this.hasCollision(this.state.spellfighter2, this.state.fighter1))
                    this.hasBeenTouched(this.state.fighter1.id, this.state.fighter2.id);
            }, 10)
        }
    }

    // Fighters selection depending on turn and number of players
    getCurrentFighters = (turn) => {
        //if (turn === undefined) turn=1;

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
        }

        this.setState({
            fighter1: {
                ...this.state.fighter1,
                life:100,
                house:this.props.fightersHouse[i],
                color:this.props.fightersColor[i],
                secondColor:this.props.fightersSecondColor[i],
                style:{
                    opacity:1
                },
            },
            fighter2: {
                ...this.state.fighter2,
                life:100,
                house:this.props.fightersHouse[j],
                color:this.props.fightersColor[j],
                secondColor:this.props.fightersSecondColor[j],
                style:{
                    opacity:1
                },
            },
            spellfighter1: {
                ...this.state.spellfighter1,
                id: "spell"+this.props.fightersHouse[i],
                color:this.props.fightersColor[i],
            },
            spellfighter2: {
                ...this.state.spellfighter2,
                id: "spell"+this.props.fightersHouse[j],
                color:this.props.fightersColor[j],
            },
            turn:turn,
        })
    }

    // Cast spell function
    castSpell = (fighterID, facesRight) => {
        let spellID = "spell" + fighterID
        let x = facesRight ? 260 : -30;

        // Spell apparition
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                spellCasted: true,
                attackCharacteristics:{
                    ...this.state[fighterID].attackCharacteristics,
                    attackPoints: this.state[fighterID].attackCharacteristics.attackPoints-this.state[fighterID].attackCharacteristics.attackCost
                }
            },
            [spellID]: {
                ...this.state[spellID],
                left: this.state[fighterID].left + x, // Initital horiz. position
                top: this.state[fighterID].top + 80,  // Initital vert. position
                direction: x / Math.abs(x)            // Initital direction
            }
        })
        // Spell movement
        let spellIntervall = setInterval(() => {
            this.setState({
                [spellID]: {
                    ...this.state[spellID],
                    left: this.state[spellID].left + 10*this.state[spellID].direction,
                }
            })
        }, 10)
        // Destruction of spell
        setTimeout(
            function() {
                clearInterval(spellIntervall);
                this.setState({
                    [fighterID]: {
                        ...this.state[fighterID],
                        spellCasted: false,
                    }
                });
            }
            .bind(this),
            2000
        );

        /*let i=this.state[fighterID].attackCharacteristics.attackPoints
        for (i; i <= 100; ++i) {
            console.log(i);
            (function(n) {
                setTimeout(function(){
                    n++;
                }, 1000);
                //return n;
            }(i));
        }*/

        // ATTEMPT 1 : same animation @decrease and increase
        setTimeout(()=>{
            this.setState({
                [fighterID]:{
                    ...this.state[fighterID],
                    attackCharacteristics:{
                        ...this.state[fighterID].attackCharacteristics,
                        attackPoints:this.state[fighterID].attackCharacteristics.attackPoints+this.state[fighterID].attackCharacteristics.attackCost
                    }
                }
            })
        },this.state[fighterID].attackCharacteristics.attackTime)

        // ATTEMPT 2 : while loop with local variable & setTimeOut => localAttackPoints does not increase, infinite loop
        /*let localAttackPoints=this.state[fighterID].attackCharacteristics.attackPoints;
        while(localAttackPoints <= 100){
            setTimeout(()=>{
                localAttackPoints=localAttackPoints+1
            },1000)
            console.log("localAttackPoints = "+localAttackPoints)
        }*/
        
        // ATTEMPT 3 : while loop with local variable & setTimeOut in outter function => same as ATTEMPT 2
        /*let localAttackPoints=this.state[fighterID].attackCharacteristics.attackPoints;
        while(localAttackPoints <= 100){
            this.increase(localAttackPoints)
            console.log(localAttackPoints)
        }*/

        // EXERCICE THÉORIQUE : setTimeOut non pris en compte
        //let i=this.state[fighterID].attackCharacteristics.attackPoints
        /*for (let i=0; i <= 30; ++i) {
            console.log(i);
            (function(n) {
                setTimeout(function(){
                    n++;
                }, 1000);
                //return n;
            }(i));
        }*/
    }
        
    

    increase = (localAttackPoints) => {
        setTimeout(()=>{
            localAttackPoints=localAttackPoints+1
        },1000)
    }

    // Wizard movement function
    move = (fighterID, x, y) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                top: this.state[fighterID].top + x,
                left: this.state[fighterID].left + y,
            }
        })
    }

    // Wizard rotation function
    rotate = (fighterID) => {
        this.setState({
            [fighterID]: {
                ...this.state[fighterID],
                rotation: this.state[fighterID].rotation - 180,
                facesRight: !this.state[fighterID].facesRight,
            }
        })
    }

    // Wizard shield function
    takeOutShield = (fighterID) => {
        this.setState({
            [fighterID]:{
                ...this.state[fighterID],
                defense:{
                    ...this.state[fighterID].defense,
                    shieldOn: true,
                    shieldNumber: this.state[fighterID].defense.shieldNumber-1,
                },
            }
        })
        setTimeout(
            function() {
                this.setState({
                    [fighterID]:{
                        ...this.state[fighterID],
                        defense:{
                            ...this.state[fighterID].defense,
                            shieldOn: false,
                        },
                    }
                })
            }
            .bind(this),
            this.state[fighterID].defense.shieldTime
        );
    }

    // Collision detection function
    hasCollision(object1, object2) {
        if (object1.top < object2.top + object2.width &&
            object1.top + object1.width > object2.top &&
            object1.left < object2.left + object2.height &&
            object1.height + object1.left > object2.left) {
            return true
        }
        else {
            return false
        };
    };

    // Consequences of a fighter being hitten
    hasBeenTouched = (touchedFighterID, shooterFighterID) => {
        let spellShooter = "spell" + shooterFighterID;
        this.setState({
            [touchedFighterID]: {
                ...this.state[touchedFighterID],
                life: this.state[touchedFighterID].life - this.state[shooterFighterID].attackCharacteristics.attackPower,
            },
            [shooterFighterID]: {
                ...this.state[shooterFighterID],
                spellCasted: false,
            },
            [spellShooter]: {
                ...this.state[spellShooter],
                top: 0,
                left: 0,
            }
        })

        if (this.state[touchedFighterID].life === 0) {
            this.setState({
                isFighterDead: true,
            });
            this.deathOfAFighter(touchedFighterID, shooterFighterID)
        }
    }

    // End of a fight (death of a fighter or end of timer)
    deathOfAFighter = (deadFighterID, aliveFighterID) => {
        let winningHouse=this.state[aliveFighterID].house
        let losingHouse=this.state[deadFighterID].house
        this.setState({
            [deadFighterID]: {
                ...this.state[deadFighterID],
                style: {
                    opacity: 0
                }
            },
            winner: {
                ...this.state[aliveFighterID]
            },
            playersPoints:{
                ...this.state.playersPoints,
                [winningHouse]:this.state.playersPoints[winningHouse]+this.state[aliveFighterID].life,
                [losingHouse]:this.state.playersPoints[losingHouse]+this.state[deadFighterID].life,
            },
            isFighterDead: true,
        })
        
        if((this.props.fightersHouse.length === 3 && this.state.turn === 3) || (this.props.fightersHouse.length === 4 && this.state.turn===6)){
            this.setState({
                tournamentVictory:true
            })
        }
    }
    
    restartFight=()=>{
        this.setState({
            fighter1:{
                ...this.state.fighter1,
                life:100,
                spellCasted:false,
                style:{
                    opacity:1
                },
                top: 250,
                left: 100,
                facesRight: true,
                rotation: 0,
            },
            fighter2:{
                ...this.state.fighter2,
                life:100,
                spellCasted:false,
                style:{
                    opacity:1
                },
                top: 250,
                left: 1100,
                facesRight: false,
                rotation: 180,
            },
            isFighterDead: false,
        })
    }

    nextFight=(turn)=>{
        this.getCurrentFighters(turn);
        this.setState({
            isFighterDead:false,
        })
    }

    render() {

        let fighter1Info={
            color: this.state.fighter1.color,
            secondColor: this.state.fighter1.secondColor,
            house: this.state.fighter1.house,
        }

        let fighter2Info={
            color: this.state.fighter2.color,
            secondColor: this.state.fighter2.secondColor,
            house: this.state.fighter2.house,
        }

        return (
            <div> 
            {
                this.state.tournamentVictory ?
                    <TournamentVictory
                        points={this.state.playersPoints}
                        houses={this.props.fightersHouse}
                    />
                :
                <div>    
                    <div>
                        <Header
                            fighter1={this.state.fighter1}
                            fighter2={this.state.fighter2}
                        />
                    </div>
                    <div>
                        <WelcomeMessage
                            fighter1Info={fighter1Info}
                            fighter2Info={fighter2Info}
                        />
                    </div>
                    <div style={this.state.fighter1.style}>
                        <Fighter                // Player#1
                            fighter={this.state.fighter1}
                        />
                    </div>
                    <div>{
                        this.state.fighter1.spellCasted ?
                            <Spell
                                spell={this.state.spellfighter1}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.fighter1.defense.shieldOn ?
                            <Shield
                                fighter={this.state.fighter1}
                            />
                            :
                            <div></div>
                    }</div>
                    <div style={this.state.fighter2.style}>
                        <Fighter                // Player#2
                            fighter={this.state.fighter2}
                        />
                    </div>
                    <div>{
                        this.state.fighter2.spellCasted ?
                            <Spell
                                spell={this.state.spellfighter2}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.fighter2.defense.shieldOn ?
                            <Shield
                                fighter={this.state.fighter2}
                            />
                            :
                            <div></div>
                    }</div>
                    <div>{
                        this.state.isFighterDead ?
                            <CombatVictory
                                winner={this.state.winner}
                                getCurrentFighters={this.getCurrentFighters}
                                turn={this.state.turn}
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
