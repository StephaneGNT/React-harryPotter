import React, { Component } from 'react';
import './App.css';
import HomePage from './scripts/HomePage';
import HousesChoice from './scripts/HousesChoice';
//import ArenaChoice from './scripts/ArenaChoice';
import Fight from './scripts/Fight';
//import TournamentVictory from './scripts/TournamentVictory';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()

    this.state = {
      houseSelect: {
        returnHouse: this.listFighters,
        tournamentMode: true,
        fightersHouse: ["gryffindor","slytherin","ravenclaw"],
        fightersColor: [],
        numberOfPlayers:2,
      },
    }
  }

  listFighters = (fighterID) => {
    let fighterColor = ""
    switch (fighterID) {
      case "gryffindor": fighterColor = "red"; break;
      case "slytherin": fighterColor = "green"; break;
      case "hufflepuff": fighterColor = "yellow"; break;
      case "ravenclaw": fighterColor = "blue"; break;
    }
    this.setState({
      fightersHouse: this.state.houseSelect.fightersHouse.push(fighterID),
      fightersHouse: [...this.state.houseSelect.fightersHouse],
      fightersColor: this.state.houseSelect.fightersColor.push(fighterColor),
    })
  }

  setTournamentMode=(bool)=>{
    //console.log("booléen pour setTournament"+bool)
    this.setState({
      houseSelect:{
        ...this.state.houseSelect,
        tournamentMode:bool,
      }
    })
    //console.log(this.state.setTournamentMode)
  }

  render() {

    /*console.log("liste des fighters : ")
    console.log(this.state.houseSelect.fightersHouse)

    console.log("couleur des fighters : ")
    console.log(this.state.houseSelect.fightersColor)

    console.log(this.state.houseSelect.tournamentMode)*/

    return (
      <div className="App">
        <BrowserRouter >
          <Switch>
            <Route
              exact path="/"
              render={() => (
                <HomePage 
                  setTournamentMode={this.setTournamentMode}
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
                  //fightersHouse={fightersList}
                  fightersHouse={this.state.houseSelect.fightersHouse}
                  fightersColor={this.state.houseSelect.fightersColor}
                  tournamentMode={this.state.houseSelect.tournamentMode}
                //fighter={fighterObject}
                //spellfighter={spellObject}
                />)}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;



/*let fighterObject = {
      id: "",
      spellCasted: false,
      rotation: 0,
      facesRight: true,
      top: 250,
      left: 100,
      life: 100,
      width: 250,
      height: 200,
      attack: 87,      // Attaque: w
      defense: 81,    // Défense: q
      rotate: 65,     // Rotate: a
      moveUp: 69,         // Up: e
      moveDown: 68,      // Down: d
      moveLeft: 83,        // Left: s
      moveRight: 70,       // Right: f
      house: "slytherin",
      castSpell: "",
      move: "",
      rotateFighter: ""
    };

    let spellObject = {
      left: 0,
      top: 0,
      height: 20,
      width: 20,
      id: "spellslytherin",
      direction: 10,
    };*/

    /*let fighter1 = new fighterObject();
    let fighter2 = new fighterObject();
    let spell1 = new spellObject();
    let spellfighter2 = new spellObject();*/

    /*
    let fighterObject = {
      id: "",
      spellCasted: false,
      rotation: 0,
      facesRight: true,
      top: 250,
      left: 100,
      life: 100,
      width: 250,
      height: 200,
      attack: 87,      // Attaque: w
      defense: 81,    // Défense: q
      rotate: 65,     // Rotate: a
      moveUp: 69,         // Up: e
      moveDown: 68,      // Down: d
      moveLeft: 83,        // Left: s
      moveRight: 70,       // Right: f
      house: "slytherin",
      castSpell: "",
      move: "",
      rotateFighter: ""
    };

    let spellObject = {
      left: 0,
      top: 0,
      height: 20,
      width: 20,
      id: "spellslytherin",
      direction: 10,
    };
    */