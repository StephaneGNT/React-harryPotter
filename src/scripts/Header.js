import React, { Component } from 'react';
//import Avatar from './Avatar'
//import AttackBar from './AttackBar'
//import DefenseBar from './DefenseBar'
import ProgressBars from './HeaderProgressBars'
//import TeamAvatar from './TeamAvatar'
import Shield from './HeaderShield'
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

  render() {
      
    return (
      <div>
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
      </div>
    );
  }
}

export default Header;
