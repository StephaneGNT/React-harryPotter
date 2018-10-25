import React, { Component } from 'react';
//import './Spell.css';

class Spell extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    //console.log("render du spell")

    let spellStyle={
      position: "absolute",
      top: this.props.spell.layout.top+"px",
      left: this.props.spell.layout.left+"px",
      width: this.props.spell.layout.width+"px",
      height: this.props.spell.layout.height+"px",
      borderRadius: "50%",
      backgroundColor: this.props.spell.color,
      transition: "left 300ms",
    }

    //console.log(spellStyle)
    
    return (
      <div className="spell" style={spellStyle}>
      </div>
    );
  }
}

export default Spell;
