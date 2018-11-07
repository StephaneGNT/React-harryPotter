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
    };
  }

  

  close = ()=>{
    this.props.toggleSettings();
  }

  toggle = (inputToToggle) => {
    console.log("in settings ", inputToToggle)
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
              <td></td>
            </tr>
            <tr>
              <td> Bonus only </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div id="settingsIndications">
          <span>You need to reload between attacks ; watch for your attack bar !</span><br />
        </div>
      </div>
    );
  }
}
