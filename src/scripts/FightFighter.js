import React, { Component } from 'react';
import '../style/fighter.css';

class Fighter extends Component {

  constructor(props) {
    super(props);
    this.rotation = this.props.fighter.layout.facesRight ? 0 : 180;
  }


  render() {

    let fighterStyle = {
      transform: `rotateY(${this.rotation}deg)`,
      position: "absolute",
      top: this.props.fighter.layout.top + "px",
      left: this.props.fighter.layout.left + "px",
      width: this.props.fighter.layout.width + "px",
      height: this.props.fighter.layout.height + "px",
      transition: "top 300ms ease-in-out, left 300ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out",
      opacity:this.props.fighter.opacity,
    };

    let fighterId = "fighter" + this.props.fighter.house.name

    return (
      <div>
        <div className="fighter" style={fighterStyle} id={fighterId}>
        </div>
      </div>
    );
  }
}

export default Fighter;
