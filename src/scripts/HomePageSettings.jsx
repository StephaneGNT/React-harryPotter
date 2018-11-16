import React from 'react';

import volumeOn from '../image/volumeOn.png';
import volumeOff from '../image/volumeOff.png';

import '../style/homePageSettings.css';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicOn: true,
      isSoundEffectOn: true,
      bonusOn : true,
      malusOn : true,
      malusEnabled: true,
    };
  }

  close = () => {
    this.props.toggleSettings();
  }

  toggle = (inputToToggle) => {
    this.props[inputToToggle](inputToToggle, !this.state[inputToToggle]);
    this.setState({
      [inputToToggle]: !this.state[inputToToggle]
    });
  }

  renderMusic = () => {
    if (this.state.isMusicOn) return (<button type="button" onClick={() => { this.toggle('isMusicOn'); }} ><img src={volumeOn} alt="volume on" /></button>)
    return (<button type="button" onClick={() => { this.toggle('isMusicOn'); }}><img src={volumeOff} alt="volume off" /></button>)
  }

  renderSound = () => {
    if (this.state.isSoundEffectOn) return (<button type="button" onClick={() => { this.toggle('isSoundEffectOn'); }}><img src={volumeOn} alt="sound on" /></button>)
    return (<button type="button" onClick={() => { this.toggle('isSoundEffectOn'); }}><img src={volumeOff} alt="sound off" /></button>)
  }

  renderBonus = () => {
    let message = this.state.bonusOn ? 'ON' : 'OFF';
    return <button onClick={(e) => this.toggleBonus(e)}>{message}</button>
  }

  toggleBonus = () => {
    this.setState({
      bonusOn: !this.state.bonusOn,
      malusOn: false,
      malusEnabled: this.state.bonusOn,
    });
  }

  renderMalus = () => {
    let message = this.state.malusOn ? 'ON' : 'OFF';
    // let disable = this.state.bonusOn ? true;
    return <button disabled={!this.state.bonusOn} onClick={(e) => this.toggleMalus(e)}>{message}</button>
  }

  toggleMalus = () => {
    this.setState({
      malusOn: !this.state.malusOn,
    });
  }

  render() {
    return (
      <div id="settingsTable">
        <p onClick={this.close}>X</p>
        <table>
          <tbody>
            <tr>
              <td width="50%"> Music </td>
              <td width="50%">{this.renderMusic()}</td>
            </tr>
            <tr>
              <td> Sound </td>
              <td>{this.renderSound()}</td>
            </tr>
            <tr>
              <td> Bonus and Malus </td>
              <td>{this.renderBonus()}</td>
            </tr>
            <tr>
              <td> Bonus only </td>
              <td>{this.renderMalus()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
