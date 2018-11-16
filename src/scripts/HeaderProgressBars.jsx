import React, { Component } from 'react';
import '../style/headerProgressBars.css';

class ProgressBars extends Component {
  constructor(props) {
    super(props);
    this.rotation = this.props.fighter.id === 'fighter1' ? 0 : 180;
    this.left = this.props.fighter.layout.facesRight ? 0 : 120;
    // console.log("passage dans le constructor")
    // this.rotation = 0;
  }

  render() {
    const lifeBarContainerStyle = {
      transform: `rotateY(${this.rotation}deg)`,
      left: `${this.props.left}px`,
    };

    const lifeBarStyle = {
      backgroundColor: this.props.fighter.house.color,
      width: `${this.props.fighter.life}%`,
    };

    const attackBarContainerStyle = {
      transform: `rotateY(${this.rotation}deg)`,
      left: `${this.props.left + this.left}px`,
    };

    const attackBarStyle = {
      backgroundColor: this.props.fighter.house.secondColor,
      width: `${this.props.fighter.attack.attackPoints}%`,
    };

    return (
      <div>
        <div style={lifeBarContainerStyle} id="lifeBarContainer">
          <div style={lifeBarStyle} className="progressBar" />
        </div>
        <div style={attackBarContainerStyle} id="attackBarContainer">
          <div style={attackBarStyle} className="progressBar" />
        </div>
      </div>
    );
  }
}

export default ProgressBars;
