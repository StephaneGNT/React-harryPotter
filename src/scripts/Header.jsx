import React, { Component } from 'react';

import ProgressBars from './HeaderProgressBars';
import Shield from './HeaderShield';
import HeaderTimer from './HeaderTimer';

import '../style/header.css';

class Header extends Component {
  static getDerivedStateFromProps(props) {
    return {
      fighter1: props.fighter1,
      fighter2: props.fighter2,
    };
  }

  endOfFight=() => {
    console.log("end of fight")
    const { fighter1, fighter2, endOfFight } = this.props;
    fighter2.life > fighter1.life ? endOfFight(fighter1.id, fighter2.id) : endOfFight(fighter2.id, fighter1.id)
  }

  renderShields = (numberOfShields) => {
    const shieldsItem = [];
    for (let i = 0; i < numberOfShields; i++) {
      shieldsItem.push(<Shield />);
    }
    return shieldsItem;
  }

  render() {
    const {
      fighter1, fighter2, fightTime, isFighterDead, showInstructions
    } = this.props;
    const avatarFighter1 = `${fighter1.house.name}ID`;
    const avatarFighter2 = `${fighter2.house.name}ID`;

    const avatar1Style = {
      position: 'absolute',
      top: '10px',
      left: '80px',
      width: '80px',
      height: '100px',
    };

    const avatar2Style = {
      position: 'absolute',
      top: '10px',
      left: '1380px',
      width: '80px',
      height: '100px',
    };

    return (
      <div style={{ backgroundColor: 'red' }}>
        <div id={avatarFighter1} style={avatar1Style} />
        <div>
          <ProgressBars
            fighter={fighter1}
            left={170}
          />
        </div>
        <div id="shieldsFighter1">
          {
            this.renderShields(fighter1.defense.shieldNumber)
          }
        </div>
        <div id={avatarFighter2} style={avatar2Style} />
        <div>
          <ProgressBars
            fighter={fighter2}
            left={1000}
          />
        </div>
        <div id="shieldsFighter2">
          {
            this.renderShields(fighter2.defense.shieldNumber)
          }
        </div>
        <div>
          <HeaderTimer
            fightTime={fightTime}
            isFighterDead={isFighterDead}
            showInstructions={showInstructions}
            endOfFight={this.endOfFight}
          />
        </div>
      </div>
    );
  }
}

export default Header;
