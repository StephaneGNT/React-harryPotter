import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../style/homePage.css';
import Instructions from '../scripts/HomePageInstructions';
import Settings from '../scripts/HomePageSettings';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areSmallButtonVisible: false,
      areInstructionsVisible: false,
      areSettingsVisible: false,
    };
  }

  setTournamentMode(tournamentMode) {
    this.props.setTournamentMode(tournamentMode);
    this.props.history.push('/houses');
  }

  showButton = () => {
    const { areSmallButtonVisible } = this.state;
    this.setState({
      areSmallButtonVisible: !areSmallButtonVisible,
    });
  }

  toggleInstructions = () => {
    const { areInstructionsVisible } = this.state;
    this.setState({
      areInstructionsVisible: !areInstructionsVisible,
    });
  }

  toggleSettings = () => {
    const { areSettingsVisible } = this.state;
    console.log("toggle settings ",this.state.areSettingsVisible)
    this.setState({
      areSettingsVisible: !areSettingsVisible,
    });
  }

  setVolume = (target, bool) => {
    console.log("in home page ", target)
    this.props.setVolume(target, bool);
  }

  render() {
    const { areInstructionsVisible, areSettingsVisible, areSmallButtonVisible } = this.state;

    const instructionStyle = {
      display: areInstructionsVisible ? 'block' : 'none',
    };

    const settingsStyle = {
      display: areSettingsVisible ? 'block' : 'none',
    };

    const smallButtonVisible = {
      display: areSmallButtonVisible ? 'block' : 'none',
    };

    return (
      <div className="container-fluid">
        <h1>Potter Fight</h1>
        <div className="text-center">
          <button type="button" className="bigButton" onClick={() => this.showButton()}>NEW FIGHT</button>
          <button type="button" onClick={() => this.setTournamentMode(false)} className="smallButton" style={smallButtonVisible}>
            1 vs 1
          </button>
          <button type="button" onClick={() => this.setTournamentMode(true)} className="smallButton" style={smallButtonVisible}>
            Tournament
          </button>
          <button type="button" onClick={() => this.setTournamentMode(true)} className="smallButton" style={smallButtonVisible}>
            Battle royale
          </button>
        </div>
        <button type="button" className="bigButton" onClick={() => this.toggleSettings()}>SETTINGS</button>
        <div style={settingsStyle}>
          <Settings
            isMusicOn={this.setVolume}
            isSoundEffectOn={this.setVolume}
            toggleSettings={this.toggleSettings}
          />
        </div>
        <button type="button" className="bigButton" onClick={() => this.toggleInstructions()}>INSTRUCTIONS</button>
        <div style={instructionStyle}>
          <Instructions
            toggleInstructions={this.toggleInstructions}
            homepage
          />
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
