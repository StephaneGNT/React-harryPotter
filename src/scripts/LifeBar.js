import React, { Component } from 'react';
//import './ProgressBar.css';

class LifeBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      life: this.props.fighter.life,
      house: this.props.fighter.house,
      rotation: this.props.fighter.rotation,
      backgroundColor: this.props.fighter.color,
    }
  }

  static getDerivedStateFromProps(props, state){
    return{
      life:props.fighter.life,
      backgroundColor:props.fighter.color,
    }
  }

  render() {

    let lifeBarContainerStyle={
      transform: `rotateY(${this.state.rotation}deg)`,
      left: this.props.left,
      top: "80px",
      position: "absolute",
      width: "360px",
      height: "15px",
      borderRadius: "4px",
      backgroundColor: "lightgrey",
      padding: "3px",
    }

    let lifeBarStyle={
      backgroundColor: this.state.backgroundColor,
      width: this.state.life+"%",
      transition: "width 400ms ease-in-out",
      height: "100%",
      borderRadius: "4px",
    }
    //console.log("Width : "+lifeBarStyle.width)

    let idLifeBar="lifeBar"+this.state.house;
    
    return (
        <div style={lifeBarContainerStyle}>
            <div id={idLifeBar} style={lifeBarStyle}>
            </div>
        </div>
    );
  }
}

export default LifeBar;
