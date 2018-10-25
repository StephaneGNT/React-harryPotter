import React, { Component } from 'react';

import ProgressBars from './HeaderProgressBars'
import Shield from './HeaderShield'
import HeaderTimer from './HeaderTimer';

import '../style/header.css'

class Header extends Component {

  constructor(props){
    super(props);
    this.state={
      fighter1: this.props.fighter1,
      fighter2: this.props.fighter2,
    }
  }

  static getDerivedStateFromProps(props){
    return{
        fighter1:props.fighter1,
        fighter2:props.fighter2,
    }
  }

  renderShields(numberOfShields){
    const shieldsItem = [];
    for (var i=0; i < numberOfShields; i++) {
      shieldsItem.push(<Shield />);
    }
    return shieldsItem;
  }

  endOfFight=()=>{
    this.props.fighter2.life > this.props.fighter1.life ? this.props.endOfFight(this.props.fighter1.id, this.props.fighter2.id) : this.props.endOfFight(this.props.fighter2.id, this.props.fighter1.id)
  }

  render() {

    let avatarFighter1 = this.props.fighter1.house.name + "ID";
    let avatarFighter2 = this.props.fighter2.house.name + "ID";

    let avatar1Style = {
      position : "absolute",
      top : "10px",
      left : "80px",
      width : "80px",
      height : "100px",
    }

    let avatar2Style = {
      position : "absolute",
      top : "10px",
      left : "1380px",
      width : "80px",
      height : "100px",
    }
      
    return (
      <div>
        <div id={avatarFighter1} style={avatar1Style}></div>
        <div>
          <ProgressBars 
            fighter={this.props.fighter1}
            left={170}  
          />
        </div>
        <div id="shieldsFighter1">
            {
              this.renderShields(this.props.fighter1.defense.shieldNumber)
            } 
        </div>
        <div id={avatarFighter2} style={avatar2Style}></div>
        <div>          
          <ProgressBars 
            fighter={this.props.fighter2}
            left={1000}
          />
        </div>
        <div id="shieldsFighter2">
            {
              this.renderShields(this.props.fighter2.defense.shieldNumber)
            } 
        </div>
        <div>
          <HeaderTimer
            fightTime = {this.props.fightTime}
            endOfFight={this.endOfFight}
          />
        </div>
      </div>
    );
  }
}

export default Header;
