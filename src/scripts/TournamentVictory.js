import React, { Component } from 'react';
import './TournamentVictory.css';

class TournamentVictory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classifiedPlayers: [],
        }
    }

    componentDidMount = () => {
        const classifiedPlayers=this.state.classifiedPlayers;
        while (this.props.houses.length > 0) {
            let winningHouse = this.props.houses[0];
            let max = this.props.points[winningHouse];
            for (let i = 1; i < this.props.houses.length; i++) {
                if (this.props.points[this.props.houses[i]] > max) {
                    winningHouse = this.props.houses[i];
                    max = this.props.points[winningHouse];
                }
            }
            let winningHouseIndex = this.props.houses.indexOf(winningHouse)
            classifiedPlayers.push(this.props.houses[winningHouseIndex])           
            this.props.houses.splice(winningHouseIndex, 1)
        }
        this.setState({
            classifiedPlayers
        })
    }

    render() {

        let titleStyle = {
            fontSize: "200px",
            marginTop: "50px",
            color: "#ECCA00",
            textShadow: "4px 4px 4px #CF8E19"
        }

        let winningStyle = {
            //top: "100px",
            //left: "100px",
        }
        let secondStyle = {
            //top: "150px",
            //left: "50px",
        }
        let thirdStyle = {
            //top: "150px",
            //left: "150px",
        }

        return (
            <div>
                <div>
                    <p style={titleStyle}>{this.state.classifiedPlayers[0]} wins !!</p>
                </div>
                <div>
                    <div className="shield" style={{ winningStyle }} id={this.state.classifiedPlayers[0]}></div>
                    <div className="shield" style={{ secondStyle }} id={this.state.classifiedPlayers[1]}></div>
                    <div className="shield" style={{ thirdStyle }} id={this.state.classifiedPlayers[2]}></div>
                </div>
                <div>
                    <div id="podium"></div>
                    <a href='https://fr.freepik.com/vecteurs-libre/3d-formes-geometriques-realistes-isolees-sur-fond-transparent_3090536.htm'></a>
                </div>
                <div>
                    <div id="fireGoblet"></div>
                </div>
            </div>
        );
    }
}

export default TournamentVictory;
