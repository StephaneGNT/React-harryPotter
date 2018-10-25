import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import HousesChoice from './pages/HousesChoice';
//import ArenaChoice from './scripts/ArenaChoice';
import Fight from './pages/Fight';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const Context = React.createContext();
class App extends Component {

  constructor() {
    super()

    this.state = {
      houseSelect: {
        returnHouse: this.listFighters,
        tournamentMode: false,
        fightersHouse: ["slytherin", "gryffindor"],
        fightersColor: ["rgb(75, 220, 80)", "rgb(255, 0, 0)"],
        fightersSecondColor: ["rgb(27,146,31)","rgb(201,31,31)"],
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
      case "gryffindor": {fighterColor = "rgb(255, 0, 0)" ; fighterSecondColor="rgb(201,31,31)"}; break;
      case "slytherin": {fighterColor = "rgb(75, 220, 80)" ; fighterSecondColor="rgb(27,146,31)"}; break;
      case "hufflepuff": {fighterColor = "rgb(255, 255, 0)" ; fighterSecondColor="rgb(215,215,8)"}; break;
      case "ravenclaw": {fighterColor = "rgb(0, 0, 255)" ; fighterSecondColor="rgb(48,48,131)"}; break;
    }
    tempHouses.push(fighterID);
    tempColor.push(fighterColor);
    tempSecondColor.push(fighterSecondColor);
    
    this.setState({
      fightersHouse: this.state.houseSelect.fightersHouse.push(fighterID),
      fightersHouse: [...this.state.houseSelect.fightersHouse],
      fightersColor: this.state.houseSelect.fightersColor.push(fighterColor),
      fightersSecondColor: this.state.houseSelect.fightersSecondColor.push(fighterSecondColor),
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