import React from 'react';
import '../style/scoreBar.css';

const Score = (props) => {
  const scoreStyle = {
    backgroundColor: props.fighter.color,
  };

  return (
    <div style={scoreStyle} className="score">
      <span>{props.fighter.house} : </span>{props.fighter.points}
    </div>
  );
};

export default Score;
