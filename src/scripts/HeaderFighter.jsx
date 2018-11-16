import React, { Component } from 'react';
import '../style/headerFighter.css';
import ProgressBars from './HeaderProgressBars';
import Shield from './HeaderShield';

class HeaderFighter extends Component {
  constructor(props) {
    super(props);
  }

  renderShields = (numberOfShields) => {
    const shieldsItem = [];
    for (let i = 0; i < numberOfShields; i++) {
      shieldsItem.push(<Shield />);
    }
    return shieldsItem;
  }

  render() {
    const avatarFighter = `${this.props.fighter.house.name}ID`;

    const avatarStyle = {
      position: 'absolute',
      top: '10px',
      left: this.props.fighter.id === 'fighter1' ? '80px' : '1380px',
      width: '80px',
      height: '100px',
    };

    const left = this.props.fighter.id === 'fighter1' ? 170 : 1000;

    return (
      <div>
        <div id={avatarFighter} style={avatarStyle} />
        <div>
          <ProgressBars
            fighter={this.props.fighter}
            left={left}
          />
        </div>
        <div id={`shields${this.props.fighter.id}`}>
          {
            this.renderShields(this.props.fighter.defense.shieldNumber)
          }
        </div>
      </div>
    );
  }
}

export default HeaderFighter;
