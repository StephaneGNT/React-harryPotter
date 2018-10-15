import React, { Component } from 'react';
//import Avatar from './Avatar'
//import AttackBar from './AttackBar'
//import DefenseBar from './DefenseBar'
import LifeBar from './LifeBar'
//import TeamAvatar from './TeamAvatar'

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

  render() {
    return (
      <div>
        <div>
          <LifeBar 
            fighter={this.state.fighter1}
            left="170px"  
          />
        </div>
        <div>          
          <LifeBar 
            fighter={this.state.fighter2}
            left="1000px"
          />
        </div>
      </div>
    );
  }
}

export default Header;
