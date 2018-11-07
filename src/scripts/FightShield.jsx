import React, { Component } from 'react';
import '../style/fightShield.css';

export default class Shield extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { fighter } = this.props;
    const shieldStyle = {
      top: `${fighter.layout.top - 20}px`,
      left: `${fighter.layout.left - 20}px`,
      width: `${1.1 * fighter.layout.width - 20}px`,
      height: `${1.2 * fighter.layout.height - 20}px`,
    };

    return (
      <div style={shieldStyle} className="energyShield" />
    );
  }
}
