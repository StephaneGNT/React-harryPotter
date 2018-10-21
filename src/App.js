import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import HousesChoice from './pages/HousesChoice';
//import ArenaChoice from './scripts/ArenaChoice';
import Fight from './pages/Fight';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()

    this.state = {
      houseSelect: {
        returnHouse: this.listFighters,
        tournamentMode: true,
        fightersHouse: [],
        fightersColor: [],
        fightersSecondColor: [],
        numberOfPlayers:2,
      },
    }
  }

  listFighters = (fighterID) => {
    let tempHouses=[]
    let tempColor=[];
    let tempSecondColor=[];
    let fighterColor = "";
    let fighterSecondColor=""
    switch (fighterID) {
      case "gryffindor": {fighterColor = "red" ; fighterSecondColor="rgb(151,7,7)"}; break;
      case "slytherin": {fighterColor = "green" ; fighterSecondColor="rgb(16,78,16)"}; break;
      case "hufflepuff": {fighterColor = "yellow" ; fighterSecondColor="rgb(158,158,5)"}; break;
      case "ravenclaw": {fighterColor = "rgb(96, 96, 199)" ; fighterSecondColor="rgb(48,48,131)"}; break;
    }
    tempHouses.push(fighterID);
    tempColor.push(fighterColor);
    tempSecondColor.push(fighterSecondColor);
    
    this.setState({
      fightersHouse: this.state.houseSelect.fightersHouse.push(fighterID),
      fightersHouse: [...this.state.houseSelect.fightersHouse],
      fightersColor: this.state.houseSelect.fightersColor.push(fighterColor),
      fightersSecondColor: this.state.houseSelect.fightersSecondColor.push(fighterSecondColor),
      /*fightersHouse:tempHouses,
      fighterColor: tempColor,
      fightersSecondColor: tempSecondColor*/
    })
  }

  setTournamentMode=(bool)=>{
    this.setState({
      houseSelect:{
        ...this.state.houseSelect,
        tournamentMode:bool,
      }
    })
  }

  render() {

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
                  fightersHouse={this.state.houseSelect.fightersHouse}
                  fightersColor={this.state.houseSelect.fightersColor}
                  fightersSecondColor={this.state.houseSelect.fightersSecondColor}
                  tournamentMode={this.state.houseSelect.tournamentMode}
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