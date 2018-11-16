import React from 'react';
import '../style/fightShield.css';

const Shield = (props) => {
  const { fighter } = props;
  const shieldStyle = {
    top: `${fighter.layout.top - 20}px`,
    left: `${fighter.layout.left - 20}px`,
    width: `${1.1 * fighter.layout.width - 20}px`,
    height: `${1.2 * fighter.layout.height - 20}px`,
  };

  return (
    <div style={shieldStyle} className="energyShield" />
  );
};

export default Shield;
