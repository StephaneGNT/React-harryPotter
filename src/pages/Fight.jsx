import React, { Component } from 'react';
import Fighter from '../scripts/FightFighter';
import Spell from '../scripts/FightSpell';
import Shield from '../scripts/FightShield';
import Header from '../scripts/Header';
import CombatVictory from '../scripts/FightCombatVictory';
import TournamentVictory from './TournamentVictory';
import WelcomeMessage from '../scripts/FightWelcomeMessage';
import Bonus from '../scripts/FightBonus';
import Instructions from '../scripts/HomePageInstructions';
import ScoreBar from '../scripts/ScoreBar';

import FighterModel from '../model/fighterModel';
import SpellModel from '../model/spellModel';
import BonusMalusModel from '../model/bonusMalusModel';

import '../style/fight.css';
import Castle from '../image/background/backgroundCastle.jpg';
import CastleBasement from '../image/background/backgroundCastleBasement.jpg';
import CastleFire from '../image/background/backgroundCastleFire.jpg';
import CastleIndoor from '../image/background/backgroundCastleIndoor.jpg';
import CastleNight from '../image/background/backgroundCastleNight.jpg';
import CastleStairs from '../image/background/backgroundCastleStairs.jpg';
import ForestLightning from '../image/background/backgroundForestLightning.jpg';
import QuidditchFight from '../image/background/backgroundQuidditchFight.jpg';
import QuidditchStadium from '../image/background/backgroundQuidditchStadium.jpg';
import Train from '../image/background/backgroundTrain.jpg';

import attackMusic from '../sound/attackSound.wav';
const attackSound = new Audio(attackMusic);

const backgroundImages = [Castle, CastleBasement, CastleFire, CastleIndoor, CastleNight, CastleStairs, ForestLightning, QuidditchFight, QuidditchStadium, Train, Train];

// General static information
const controlsLeft = {
  attack: 'w',
  defend: 'q',
  rotate: 'a',
  moveUp: 'e',
  moveDown: 'd',
  moveLeft: 's',
  moveRight: 'f',
};

const controlsRight = {
  attack: '!',
  defend: 'm',
  rotate: 'p',
  moveUp: 'ArrowUp',
  moveDown: 'ArrowDown',
  moveLeft: 'ArrowLeft',
  moveRight: 'ArrowRight',
};

const bonusList = ['life', 'size', 'speed', 'attackPower', 'attackCost', 'attackTime', 'shieldTime', 'shieldNumber', 'invertControls'];

class Fight extends Component {
  constructor(props) {
    super(props);

    const { fightersHouse, fightersColor, fightersSecondColor } = this.props;

    this.tournamentVictory = false;
    this.isFighterDead = false;
    this.winner = {};
    this.fightTime = 2;
    this.activeKeys = [];
    this.houses = fightersHouse;
    this.colors = fightersColor;
    this.secondColors = fightersSecondColor;
    this.backgroundImage = backgroundImages[Math.floor(Math.random() * (backgroundImages.length - 1))];
    this.showInstructions = false;
    this.i = 0;
    this.j = 0;

    this.spellfighter1 = {
      isVisible: false,
    };
    this.spellfighter2 = {
      isVisible: false,
    };

    this.initiateFighters(1);

    this.playersPoints = {
      gryffindor: 0,
      slytherin: 0,
      ravenclaw: 0,
      hufflepuff: 0,
    };

    this.bonus = {
      on: false,
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

  componentDidMount() {
    const { turn } = this.state;
    this.initiateFighters(turn);

    document.addEventListener('keydown', this.addKeyPress, false);
    document.addEventListener('keyup', this.removeKeyPress, false);

    // Bonus apparition
    if (this.bonusOn) {
      setInterval(() => {
        if (!this.bonus.on) this.generateBonus()
      }, this.bonusTime);
    }

    setInterval(() => {
      if (this.fighter1.attack.spellCasted) {
        this.spellfighter1 = new SpellModel(this.fighter1);
        this.fighterThrowSpell(this.fighter1, this.fighter2, this.spellfighter1);
        this.fighter1.attack.spellCasted = false;
      }
      if (this.fighter2.attack.spellCasted) {
        this.spellfighter2 = new SpellModel(this.fighter2);
        this.fighterThrowSpell(this.fighter2, this.fighter1, this.spellfighter2);
        this.fighter2.attack.spellCasted = false;
      }

      // Bonus-Malus recuperation
      if (this.bonus.on && this.collides(this.fighter1, this.bonus)) {
        this.getBonus(this.fighter1, this.bonus, this.fighter2);
        this.bonus.destroy();
      }
      if (this.bonus.on && this.collides(this.fighter2, this.bonus)) {
        this.getBonus(this.fighter2, this.bonus, this.fighter1);
        this.bonus.destroy();
      }
    }, 100);

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
      });
    }, 200);
  }

  addKeyPress = (event) => {
    if (event.key === ' ') this.toggleFightInstructions();
    else if (this.activeKeys.indexOf(event.key) === -1) {
      this.activeKeys.push(event.key);
    }
    this.animateFighter(this.activeKeys);
  }

  removeKeyPress = (event) => {
    this.activeKeys.splice(this.activeKeys.indexOf(event.key));
    this.animateFighter(this.activeKeys);
  }

  animateFighter = (activeKeys) => {
    if (!this.showInstructions && !this.isFighterDead) {
      this.fighter1.animateFighter(activeKeys);
      this.fighter2.animateFighter(activeKeys);
    }
  }

  fighterThrowSpell=(shooter, target, spell) => {
    spell.animate(shooter);
    
    attackSound.play();
    attackSound.volume = 1;

    const collisionDetectionIntervall = setInterval(() => {
      if (this.collides(spell, target)) {
        if (!target.defense.shieldOn) {
          target.getImpacted(shooter.attack.attackPower);
          spell.destroy();
          clearInterval(collisionDetectionIntervall);
        }
      }
      if (target.life <= 0) {
        this.endOfFight(target, shooter);
      }
    }, 10);
  }

  initiateFighters = (turn) => {
    const { fightersHouse, fightersColor, fightersSecondColor } = this.props;

    switch (fightersHouse.length) {
      case 3:
        switch (turn) {
          case 1: { this.i = 0; this.j = 1 }; break;
          case 2: { this.i = 1; this.j = 2 }; break;
          default: { this.i = 0; this.j = 2 }; break;
        }
        break;
      case 4:
        switch (turn) {
          case 1: { this.i = 0; this.j = 1 }; break;
          case 2: { this.i = 2; this.j = 3 }; break;
          case 3: { this.i = 0; this.j = 2 }; break;
          case 4: { this.i = 1; this.j = 3 }; break;
          case 5: { this.i = 0; this.j = 3 }; break;
          default: { this.i = 1; this.j = 2 }; break;
        }
        break;
      default: { this.i = 0; this.j = 1 }; break;
    }

    this.fighter1 = new FighterModel('fighter1', true, 100, controlsLeft, fightersHouse[this.i], fightersColor[this.i], fightersSecondColor[this.i]);
    this.fighter2 = new FighterModel('fighter2', false, 1100, controlsRight, fightersHouse[this.j], fightersColor[this.j], fightersSecondColor[this.j]);

    this.turn = turn;
    this.isFighterDead = false;
    this.fightTime = 2;
  }

  generateBonus = () => {
    if (!this.showInstructions) {
      const bonusInfo = {
        coeff: this.malusOn ? (Math.random() < 0.5 ? -1 : 1) : 1,
        chosenSort: bonusList[Math.floor(Math.random() * bonusList.length)],
      };
      this.bonus = new BonusMalusModel(bonusInfo);
      this.bonus.appear();
    }
  }

  endOfFight = (loser, winner) => {
    const { fightersHouse } = this.props;

    this.isFighterDead = true;

    const winningHouse = winner.house.name;
    const losingHouse = loser.house.name;
    loser.opacity = 0;
    this.winner = winner;

    this.playersPoints = {
      ...this.playersPoints,
      [winningHouse]: this.playersPoints[winningHouse] + winner.life,
      [losingHouse]: this.playersPoints[losingHouse] + loser.life,
    };

    if ((fightersHouse.length === 3 && this.turn === 3) || (fightersHouse.length === 4 && this.turn === 6)) {
      this.tournamentVictory = true;
    }
  }

  getBonus = (fighter, bonus, otherFighter) => {
    const bonusMultiply = bonus.coeff > 0 ? 5 : 0.2;
    switch (bonus.chosenSort) {
      case ('life'): fighter.impactLife(bonus.coeff * 10); break;
      case ('size'): fighter.impactSize(1 / bonusMultiply); break;
      case ('speed'): fighter.impactSpeed(bonusMultiply ** 2); break;
      case ('attackPower'): fighter.impactAttackPower(bonusMultiply); break;
      case ('attackCost'): fighter.impactAttackCost(1 / bonusMultiply); break;
      case ('attackTime'): fighter.impactAttackTime(1 / bonusMultiply); break;
      case ('shieldTime'): fighter.impactDefenseTime(bonus.coeff * 1000); break;
      case ('shieldNumber'): fighter.impactShieldNumber(bonus.coeff); break;
      default:
        {
          if (bonus.coeff === -1) fighter.invertControls(); 
          else otherFighter.invertControls()
        }; break;
    }
  }

  restartFight = () => {
    this.initiateFighters(1);
    this.isFighterDead = false;
  }

  nextFight = (turn) => {
    this.initiateFighters(turn);
    this.isFighterDead = false;
  }

  resetGame = () => {
    this.props.resetGame();
  }

  renderHeader=() => (
    <Header
      fighter1={this.fighter1}
      fighter2={this.fighter2}
      fightTime={this.fightTime}
      isFighterDead={this.isFighterDead}
      endOfFight={this.endOfFight}
      showInstructions={this.showInstructions}
    />
  );

  renderWelcomeMessage=() => {
    const { fightersHouse, fightersColor, fightersSecondColor } = this.props;

    return (
      <WelcomeMessage
        fighter1Info={{
          color: fightersColor[this.i],
          secondColor: fightersSecondColor[this.i],
          house: fightersHouse[this.i],
        }}
        fighter2Info={{
          color: fightersColor[this.j],
          secondColor: fightersSecondColor[this.j],
          house: fightersHouse[this.j],
        }}
      />
    );
  }

  renderFighter = fighter => (
    <Fighter
      fighter={fighter}
    />);

  renderSpell = (spell) => {
    if (spell.isVisible) {
      return (
        <Spell spell={spell} />
      );
    }
    return;
  }

  renderShield = (fighter) => {
    if (fighter && fighter.defense.shieldOn) {
      return (
        <Shield fighter={fighter} />
      );
    }
    return;
  }

  renderPoints = () => {
    const { tournamentMode } = this.props;
    if (tournamentMode) {
      return (
        <ScoreBar
          points={this.playersPoints}
          fightersHouse={this.houses}
          fightersColor={this.colors}
          fightersSecondColor={this.secondColors}
        />
      );
    }
    return;
  }

  renderBonus = () => {
    if (this.bonus.on) {
      return (
        <Bonus
          bonus={this.bonus}
        />
      );
    }
    return
  }

  renderCombatVictory = () => {
    const { tournamentMode } = this.props;
    if (this.isFighterDead) {
      return (
        <CombatVictory
          winner={this.winner}
          getCurrentFighters={this.getCurrentFighters}
          turn={this.turn}
          tournamentMode={tournamentMode}
          restartFight={this.restartFight}
          nextFight={this.nextFight}
          resetGame={this.resetGame}
        />
      );
    }
    return;
  }

  renderInstructions = () => {
    if (this.showInstructions) {
      return <Instructions toggleInstructions={this.toggleFightInstructions} />;
    }
    return;
  }

  toggleFightInstructions = () => {
    this.showInstructions = !this.showInstructions;
  }

  collides = (element1, element2) => {
    let message = '';
    if (element1.layout.top < element2.layout.top + element2.layout.width
      && element1.layout.top + element1.layout.width > element2.layout.top
      && element1.layout.left < element2.layout.left + element2.layout.height
      && element1.layout.height + element1.layout.left > element2.layout.left) {
      message = true;
    } else {
      message = false;
    }
    return message;
  };

  render() {
    const fightZoneStyle = {
      backgroundImage: `url(${this.backgroundImage})`,
    };

    const { fightersHouse, fightersColor, fightersSecondColor } = this.props;
    const { tournamentVictory } = this.state;

    return (
      <div id="fight">
        {
          tournamentVictory
            ? (
              <TournamentVictory
                points={this.playersPoints}
                houses={fightersHouse}
                color={fightersColor}
                secondColor={fightersSecondColor}
                resetGame={this.resetGame}
              />
            )
            : (
              <div id="fightZone" style={fightZoneStyle}>
                {this.renderHeader()}
                {this.renderWelcomeMessage()}
                {this.renderFighter(this.fighter1)}
                {this.renderSpell(this.spellfighter1)}
                {this.renderShield(this.fighter1)}
                {this.renderFighter(this.fighter2)}
                {this.renderSpell(this.spellfighter2)}
                {this.renderShield(this.fighter2)}
                {this.renderPoints()}
                {this.renderBonus()}
                {this.renderCombatVictory()}
                {this.renderInstructions()}
              </div>
            )
        }
      </div>
    );
  }
}

export default Fight;
