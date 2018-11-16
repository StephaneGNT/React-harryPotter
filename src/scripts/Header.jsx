import React, { Component } from 'react';

import HeaderFighter from './HeaderFighter';
import HeaderTimer from './HeaderTimer';

class Header extends Component {
  endOfFight=() => {
    const { fighter1, fighter2, endOfFight } = this.props;
    fighter2.life > fighter1.life ? endOfFight(fighter1.id, fighter2.id) : endOfFight(fighter2.id, fighter1.id)
  }

  render() {
    const { isFighterDead, showInstructions, fightTime } = this.props;

    return (
      <div>
        <HeaderFighter fighter={this.props.fighter1} />
        <HeaderFighter fighter={this.props.fighter2} />

        <HeaderTimer
          fightTime={fightTime}
          isFighterDead={isFighterDead}
          showInstructions={showInstructions}
          endOfFight={this.endOfFight}
        />
      </div>
    );
  }
}

export default Header;
