import React, { Component } from 'react';
import '../style/fighter.css';

class Fighter extends Component {
  constructor(props) {
    super(props);
    const { fighter } = this.props;
    this.rotation = fighter.layout.facesRight ? 0 : 180;
  }


  render() {
    const { fighter } = this.props;

    const fighterStyle = {
      transform: `rotateY(${this.rotation}deg)`,
      position: 'absolute',
      top: `${fighter.layout.top}px`,
      left: `${fighter.layout.left}px`,
      width: `${fighter.layout.width}px`,
      height: `${fighter.layout.height}px`,
      transition: 'top 300ms ease-in-out, left 300ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out',
      opacity: fighter.opacity,
    };

    const fighterId = `fighter${fighter.house.name}`;

    return (
      <div>
        <div className="fighter" style={fighterStyle} id={fighterId} />
      </div>
    );
  }
}

export default Fighter;
