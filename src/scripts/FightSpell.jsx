import React from 'react';

const Spell = (props) => {
  const { spell } = props;
  const spellStyle = {
    position: 'absolute',
    top: `${spell.layout.top}px`,
    left: `${spell.layout.left}px`,
    width: `${spell.layout.width}px`,
    height: `${spell.layout.height}px`,
    borderRadius: '50%',
    backgroundColor: spell.color,
    transition: 'left 300ms',
  };

  return (
    <div className="spell" style={spellStyle} />
  );
}

export default Spell;
