import React, { Component } from 'react';
import '../style/housesChoice.css';
import { Link } from 'react-router-dom';

class HousesChoice extends Component {
  constructor(props) {
    super(props);
    const { houseSelect } = this.props;
    this.state = {
      numberOfPlayers: 2,
      playersSelected: 0,
      fightersHouse: houseSelect.fightersHouse,
      alreadyClicked: false,
      tooManyPlayers: false,
    };
  }

  selectHouse = (houseName) => {
    const { houseSelect } = this.props;
    const { fightersHouse, numberOfPlayers } = this.state;
    // Test number of players => user is not allowed to select more houses than number of players
    if (fightersHouse.length === numberOfPlayers) {
      this.setState({
        tooManyPlayers: true,
      });
      setTimeout(() => {
        this.setState({
          tooManyPlayers: false,
        });
      }, 2000);
    } else if (fightersHouse.indexOf(houseName) !== -1) {
      this.setState({
        alreadyClicked: true,
      });
      setTimeout(() => {
        this.setState({
          alreadyClicked: false,
        });
      }, 2000);
    } else {
      // Housename sent up to App.js
      houseSelect.returnHouse(houseName);
      // Grayscale on selected shield
      const houseFilter = `${houseName}Filter`;
      this.setState({
        [houseFilter]: 'grayscale(100%)',
      });
    }
  }

  selectNumberOfPlayers = (e) => {
    this.setState({
      numberOfPlayers: e.target.value,
    });
  }

  componentDidMount = () => {
    const { houseSelect } = this.props;
    this.setState({
      numberOfPlayers: houseSelect.tournamentMode ? 3 : 2,
    });
  }

  displayMessage = () => {
    const { alreadyClicked, tooManyPlayers } = this.state;
    let message = ' ';
    if (alreadyClicked) message = 'This house has already been chosen';
    if (tooManyPlayers) message = 'You have already selected all the players';
    return (
      <p id="errorMessage">
        {message}
      </p>);
  }

  renderNumberOfPlayers = () => {
    const { houseSelect } = this.props;
    if (houseSelect.tournamentMode) {
      return (
        <div className="row" id="numberOfPlayers">
          <span>Number of players : </span>
          <select onChange={this.selectNumberOfPlayers}>
            <option> 3 </option>
            <option> 4 </option>
          </select>
        </div>
      );
    }
    return
  }

  renderFlags = () => {
    const houses = ['slytherin', 'gryffindor', 'hufflepuff', 'ravenclaw']
    const render = [];
    for (let i = 0; i < houses.length; i++) {
      render.push(
        <div className="flag" id={houses[i] + "Flag"} role="houseSelection" onClick={((e) => this.selectHouse(houses[i]))} style={{ filter: this.state[houses[i] + "Filter"] }} />
      );
    }
    return render;
  }

  render() {
    const { fightersHouse, numberOfPlayers } = this.state;
    return (
      <div id="houseSelection">
        <h1 className="text-center">Choose your fighter house</h1>
        {this.renderNumberOfPlayers()}
        <div id="flagsRow">{this.renderFlags()}</div>

        <div style={{ textAlign: 'center' }}>
          {this.displayMessage()}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '30px' }}>
          <Link to="/fight"><button type="button" disabled={fightersHouse.length < numberOfPlayers}> FIGHT ! </button></Link>
        </div>
      </div>
    );
  }
}

export default HousesChoice;
