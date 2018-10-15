import React, { Component } from 'react';
import './Fighter.css';

class Fighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spellCasted: false,
      rotation: this.props.fighter.rotation,
      facesRight: this.props.fighter.facesRight,
      top: this.props.fighter.top,
      left: this.props.fighter.left,
      width: this.props.fighter.width,
      height: this.props.fighter.height,
      speed: 5,
      activeKeys: []
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.addKeyPress, false);
    document.addEventListener("keyup", this.removeKeyPress, false);
  }

  addKeyPress = (event) => {
    let activeKeys = this.state.activeKeys;
    if (activeKeys.indexOf(event.key) === -1) {
      activeKeys.push(event.key)
    }
    this.animateFighter(activeKeys)
    this.setState({
      activeKeys
    })
  }

  removeKeyPress = (event) => {
    let activeKeys = this.state.activeKeys;
    activeKeys.splice(activeKeys.indexOf(event.key))
    this.animateFighter(activeKeys)
    this.setState({
      activeKeys
    })
  }

  animateFighter = (activeKeys) => {
    if (activeKeys.indexOf(this.props.fighter.attack) !== -1) {
      this.props.fighter.castSpell(this.props.fighter.id, this.props.fighter.facesRight);
    }
    if (activeKeys.indexOf(this.props.fighter.defend) !== -1) {
      this.props.fighter.defense(this.props.fighter.id, this.props.fighter.facesRight);
    }
    if (activeKeys.indexOf(this.props.fighter.rotate) !== -1) {
      this.props.fighter.rotateFighter(this.props.fighter.id, this.props.fighter.facesRight);
    }
    if (activeKeys.indexOf(this.props.fighter.moveUp) !== -1) {
      this.props.fighter.move(this.props.fighter.id, -this.state.speed, 0);
    }
    if (activeKeys.indexOf(this.props.fighter.moveDown) !== -1) {
      this.props.fighter.move(this.props.fighter.id, this.state.speed, 0);
    }
    if (activeKeys.indexOf(this.props.fighter.moveLeft) !== -1) {
      this.props.fighter.move(this.props.fighter.id, 0, -this.state.speed);
    }
    if (activeKeys.indexOf(this.props.fighter.moveRight) !== -1) {
      this.props.fighter.move(this.props.fighter.id, 0, this.state.speed);
    }
    this.setState({
      spellCasted: this.props.fighter.spellCasted,
      top: this.props.fighter.top,
      left: this.props.fighter.left,
      rotation: this.props.fighter.rotation
    })
  }

  render() {
    let fighterStyle = {
      transform: `rotateY(${this.state.rotation}deg)`,
      position: "absolute",
      top: this.state.top + "px",
      left: this.state.left + "px",
      width: this.state.width + "px",
      height: this.state.height + "px",
    };

    let fighterId = "fighter" + this.props.fighter.house

    return (
      <div>
        <div className="fighter" style={fighterStyle} id={fighterId}>
        </div>
      </div>
    );
  }
}

export default Fighter;
