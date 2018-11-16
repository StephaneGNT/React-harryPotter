import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScoreTable from '../scripts/TournamentVictoryScoreTable';
import '../style/tournamentVictory.css';


class TournamentVictory extends Component {
  constructor(props) {
    super(props);
    const { houses } = this.props;
    this.classifiedPlayers = houses;
    this.winnerColor = ['', ''];

    this.state = {
      displayScore: false,
    };
  }

    componentDidMount = () => {
      const { points } = this.props;
      this.classifiedPlayers.sort((a, b) => points[b] - points[a]);
      this.getWinnerColor();
    }

    displayScore = () => {
      const { displayScore } = this.state;
      this.setState({
        displayScore: !displayScore,
      });
    }

    getWinnerColor = () => {
      //const { winnerColor } = this.props;

      switch (this.classifiedPlayers[0]) {
        case 'gryffindor': { this.winnerColor[0] = 'rgb(255, 0, 0)' ; this.winnerColor[1]='rgb(201,31,31)' };break;
        case 'slytherin': {this.winnerColor[0] = 'rgb(75, 220, 80)' ; this.winnerColor[1]='rgb(27,146,31)'}; break;
        case 'hufflepuff': {this.winnerColor[0] = 'rgb(255, 255, 0)' ; this.winnerColor[1]='rgb(215,215,8)'}; break;
        default: {this.winnerColor[0] = 'rgb(0, 0, 255)' ; this.winnerColor[1]='rgb(48,48,131)'}; break;
      }
    }

    returnToHomePage = () => {
      this.props.history.push('/');
      this.props.resetGame();
    }

    render() {
      const titleStyle = {
        width: '100%',
        textAlign: 'right',
        fontSize: '100px',
        color: this.winnerColor[0],
        textShadow: `2px 2px ${this.winnerColor[1]}, -2px -2px ${this.winnerColor[1]}`,
        paddingRight: '12vw',
      };

      const winningStyle = {
        left: '59vw',
        top: '24vh',
      };
      const secondStyle = {
        left: '38vw',
        top: '31vh',
      };
      const thirdStyle = {
        left: '79vw',
        top: '37vh',
      };

      return (
        <div id="tournamentVictoryPage">
          <div>
            <p style={titleStyle}>
              {this.classifiedPlayers[0]}
               wins !!
            </p>
          </div>
          <div>
            <div className="shields" style={winningStyle} id={this.classifiedPlayers[0]} />
            <div className="shields" style={secondStyle} id={this.classifiedPlayers[1]} />
            <div className="shields" style={thirdStyle} id={this.classifiedPlayers[2]} />
          </div>
          <div id="podium" />
          <div id="fireGoblet" />
          <div>
            {
            this.state.displayScore
              ? (
                <ScoreTable
                  classifiedPlayers={this.classifiedPlayers}
                  points={this.props.points}
                  changeDisplay={this.displayScore}
                />
              )
              : <div />
            }
          </div>
          <div className="button">
            <button type="button" onClick={this.displayScore}>Score</button>
            <button type="button" onClick={this.returnToHomePage}>Home</button>
          </div>
        </div>
      );
    }
}

export default withRouter(TournamentVictory);
