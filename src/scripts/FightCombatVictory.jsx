import React, { Component } from 'react';
import '../style/fightCombatVictory.css';
import { withRouter } from 'react-router-dom';

class CombatVictory extends Component {
  constructor(props) {
    super(props);
    const { turn } = this.props;
    this.state = {
      turn,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      house: props.winner.house.name,
      color: props.winner.house.color,
    };
  }

  restartFight=() => {
    this.props.restartFight();
  }

  nextFight=() => {
    const { turn } = this.state;
    this.setState({
      turn: turn + 1,
    });
    this.props.nextFight(turn);
  }

  returnToHomePage=() => {
    this.props.history.push('/');
    this.props.resetGame()
  }

  render() {
    const { winner } = this.props;

    const victoryScreenStyle = {
      position: 'absolute',
      top: '300px',
      left: winner.id === 'fighter2' ? '250px' : '900px',
      width: '300px',
    };
    
    const victoryMessageStyle = {
      color: winner.house.color,
      textShadow: `1px 0 0 ${winner.house.secondColor}, -1px 0 0 ${winner.house.secondColor}, 0 1px 0 ${winner.house.secondColor}, 0 -1px 0 ${winner.house.secondColor}, 1px 1px ${winner.house.secondColor}, -1px -1px 0 ${winner.house.secondColor}, 1px -1px 0 #000, -1px 1px 0 ${winner.house.secondColor}`,
      fontSize: '50px',
      margin: 'auto',
    }

    return (
      <div style={victoryScreenStyle} id="combatVictory">
        <p style={victoryMessageStyle}>{winner.house.name} wins !</p>
        <div id="buttonRow">
          <div id="firstButton">
            { (
              this.props.tournamentMode ?
                <button type="button" onClick={this.nextFight}>Next fight</button>
                :
                <button type="button" onClick={this.restartFight}>Restart fight</button>
            )}
          </div>
          <div id="secondButton">
            <button type="button" onClick={this.returnToHomePage}> Home page </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CombatVictory);
