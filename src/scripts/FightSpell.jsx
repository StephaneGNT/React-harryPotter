import React, { Component } from 'react';

export default class Spell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { spell } = this.props;
    const spellStyle = {
      position: 'absolute',
      top: `${spell.layout.top}px`,
      left: `${spell.layout.left}px`,
      width: `${spell.layout.width}px`,
      height: `${spell.layout.height}px`,
      borderRadius: '50%',
      backgroundColor: this.props.spell.color,
      transition: 'left 300ms',
    };

    return (
      <div className="spell" style={spellStyle} />
    );
  }
}
