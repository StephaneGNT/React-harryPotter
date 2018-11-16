import React from 'react';
import '../style/fightImpact.css';

const Impact = (props) => {
  const { fighter } = props;
  const shieldStyle = {
    top: `${fighter.layout.top - 90}px`,
    left: `${fighter.layout.left - 120}px`,
    width: `${2.2 * fighter.layout.width}px`,
    height: `${2.2 * fighter.layout.height}px`,
  };

  return (
    <div style={shieldStyle} className="fighterImpact" />
  );
};

export default Impact;
