import React, { Component } from 'react';
import '../style/headerProgressBars.css';

class ProgressBars extends Component {

  constructor(props) {
    super(props);
    this.rotation = this.props.fighter.layout.facesRight ? 0 : 180
  }

  /*static getDerivedStateFromProps(props, state){
    return{
      life:props.fighter.life,
      backgroundColor:props.fighter.color,
    }
  }*/

  /*shouldComponentUpdate(nextProps, nextState){
    return(nextProps === this.props && nextState === this.state)
  }*/

  render() {

    let lifeBarContainerStyle={
      transform: `rotateY(${this.rotation}deg)`,
      left: this.props.left + "px",
    }

    let lifeBarStyle={
      backgroundColor: this.props.fighter.house.color,
      width: this.props.fighter.life + "%",
    }

    let attackBarContainerStyle={
      transform: `rotateY(${this.rotation}deg)`,
      left: this.props.fighter.layout.facesRight ? this.props.left + "px" : this.props.left + 120 + "px",
    }

    let attackBarStyle={
      backgroundColor: this.props.fighter.house.secondColor,
      width: this.props.fighter.attack.attackPoints+"%",
      //transition: `width ${this.props.fighter.attack.attackTime}ms ease-in-out`,
    }
    
    return (
      <div>
        <div style={lifeBarContainerStyle} id="lifeBarContainer">
            <div style={lifeBarStyle} className="progressBar"></div>
        </div>
        <div style={attackBarContainerStyle} id="attackBarContainer" >
          <div style={attackBarStyle} className="progressBar"></div>
        </div>
      </div>
    );
  }
}

export default ProgressBars;
