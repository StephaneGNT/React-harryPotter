import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import HousesChoice from './pages/HousesChoice';
// import ArenaChoice from './scripts/ArenaChoice';
import Fight from './pages/Fight';

import './App.css';

import music from './sound/backgroundMusic.mp3';

class App extends Component {
  constructor() {
    super();

    this.state = {
      houseSelect: {
        returnHouse: this.listFighters,
        tournamentMode: false,
        fightersHouse: [],
        fightersColor: [],
        fightersSecondColor: [],
        numberOfPlayers: 2,
      },
      musicVolume: 1,
      soundEffectVolume: 1,
    };

    this.backgroundMusic = new Audio(music);
    this.backgroundMusic.play();
    this.backgroundMusic.volume = this.state.musicVolume;
  }

  listFighters = (fighterID) => {
    // const tempHouses = [];
    // const tempColor = [];
    // const tempSecondColor = [];
    let fighterColor = '';
    let fighterSecondColor = '';
    switch (fighterID) {
      case 'gryffindor': { fighterColor = "rgb(255, 0, 0)" ; fighterSecondColor = "rgb(201,31,31)" }; break;
      case 'slytherin': { fighterColor = "rgb(75, 220, 80)" ; fighterSecondColor = "rgb(27,146,31)" }; break;
      case 'hufflepuff': { fighterColor = "rgb(255, 255, 0)" ; fighterSecondColor = "rgb(215,215,8)" }; break;
      default: { fighterColor = "rgb(0, 0, 255)" ; fighterSecondColor = "rgb(48,48,131)" }; break;
    }
    // tempHouses.push(fighterID);
    // tempColor.push(fighterColor);
    // tempSecondColor.push(fighterSecondColor);

    this.setState({
      fightersHouse: this.state.houseSelect.fightersHouse.push(fighterID),
      fightersHouse: [...this.state.houseSelect.fightersHouse],
      fightersColor: this.state.houseSelect.fightersColor.push(fighterColor),
      fightersSecondColor: this.state.houseSelect.fightersSecondColor.push(fighterSecondColor),
    });
  }

  setTournamentMode=(bool) => {
    this.setState({
      houseSelect: {
        ...this.state.houseSelect,
        tournamentMode:bool,
      },
    });
  }

  componentDidUpdate=() => {
    this.backgroundMusic.volume = this.state.musicVolume;
    this.soundsVolume = this.state.soundEffectVolume;
  }

  resetGame = () => {
    this.setState({
      houseSelect: {
        returnHouse: this.listFighters,
        tournamentMode: false,
        fightersHouse: [],
        fightersColor: [],
        fightersSecondColor: [],
        numberOfPlayers: 2,
      }
    })
  }

  setVolume = (target, bool) => {
    if (target.includes('Music')) {
      if (!bool) this.setState({ musicVolume: 0 });
      else this.setState({ musicVolume: 1 });
    } else if (target.includes('Sound')) {
      if (!bool) this.setState({ soundVolume: 0 });
      else this.setState({ soundVolume: 1 });
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact path = '/'
              render={() => (
                <HomePage 
                  setTournamentMode={this.setTournamentMode}
                  sounds={this.state.sounds}
                  setVolume={this.setVolume}
                />
              )}
            />
            <Route
              path="/houses"
              render={() => (
                <HousesChoice
                  houseSelect={this.state.houseSelect}
                />)}
            />
            <Route
              path="/fight"
              render={() => (
                <Fight
                  fightersHouse={this.state.houseSelect.fightersHouse}
                  fightersColor={this.state.houseSelect.fightersColor}
                  fightersSecondColor={this.state.houseSelect.fightersSecondColor}
                  tournamentMode={this.state.houseSelect.tournamentMode}
                  resetGame={this.resetGame}
                  volume={[this.state.musicVolume, this.state.soundEffectVolume]}
                />)}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
