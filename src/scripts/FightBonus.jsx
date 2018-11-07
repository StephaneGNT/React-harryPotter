import React, { Component } from 'react';
import '../style/fightBonus.css';

export default class Bonus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bonus } = this.props;

    const bonusStyle = {
      position: 'absolute',
      top: `${bonus.layout.top}px`,
      left: `${bonus.layout.left}px`,
      width: `${bonus.layout.width}px`,
      height: bonus.coeff > 0 ? `${bonus.layout.height}px` : `${bonus.layout.height * 2}px`,
      zIndex: 3,
      transition: 'top 1100ms ease-in-out',
      opacity: bonus.opacity,
    };

    const bonusID = bonus.coeff > 0 ? 'bonus' : 'malus';

    return (
      <div>
        <p>{bonus.isVisible ? bonus.chosenSort : ''}</p>
        <div className="bonus" style={bonusStyle} id={bonusID} />
      </div>
    );
  }
}
