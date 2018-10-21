import React, { Component } from 'react';
//import './Spell.css';

class Spell extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let spellStyle={
      position: "absolute",
      top: this.props.spell.top+"px",
      left: this.props.spell.left+"px",
      width: this.props.spell.width+"px",
      height: this.props.spell.height+"px",
      borderRadius: "50%",
      backgroundColor: this.props.spell.color,
    }
    
    return (
      <div className="spell" style={spellStyle}>
      </div>
    );
  }
}

export default Spell;
