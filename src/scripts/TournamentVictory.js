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
        //let j=1;
        while (this.props.houses.length > 1) {
            /*console.log("Houses en entrée : ")
            console.log(this.props.houses)*/
            let winningHouse = this.props.houses[0];
            //console.log("Winning house avant le for : "+winningHouse)
            let max = this.props.points[winningHouse];
            //console.log("Max avant le for : "+max)
            for (let i = 1; i < this.props.houses.length; i++) {
                if (this.props.points[this.props.houses[i]] > max) {
                    winningHouse = this.props.houses[i];
                    max = this.props.points[winningHouse];

                    //console.log("Tour de boucle : "+j)
                    /*console.log("Winning house à la fin de le boucle : ")
                    console.log(winningHouse);
                    console.log("Max à la fin de le boucle : ")
                    console.log(max);*/
                }
            }
            let winningHouseIndex = this.props.houses.indexOf(winningHouse)
            //console.log("winningHouseIndex : "+winningHouseIndex)
            this.setState({
                //newBestPlayer:
                classifiedPlayers: this.state.classifiedPlayers.push(this.props.houses[winningHouseIndex]),
                //classifiedPlayers: this.state.classifiedPlayers.push(this.props.houses.splice(winningHouseIndex,1))
            })
            this.props.houses.splice(winningHouseIndex, 1);
            /*console.log("new best player : ")
            console.log(this.state.newBestPlayer)
            console.log("Houses à la fin de le boucle : ")
            console.log(this.props.houses)
            console.log("Classement à la fin de le boucle : ")
            console.log(this.state.classifiedPlayers)
            j++;*/
        }
        //console.log(this.state.classifiedPlayers)
        this.setState({
            classifiedPlayers: this.state.classifiedPlayers.push(this.props.houses[0])
        })
        console.log(this.state.classifiedPlayers)
        console.log(typeof this.state.classifiedPlayers)
        console.log(this.state.classifiedPlayers[0])
    }

    render() {

        console.log(this.state.classifiedPlayers)
        console.log(typeof this.state.classifiedPlayers)

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
                    <p style={titleStyle}>Slytherin wins !!</p>
                </div>
                <div>
                    <div className="shield" style={{ winningStyle }} id="slytherin"></div>
                    <div className="shield" style={{ secondStyle }} id="ravenclaw"></div>
                    <div className="shield" style={{ thirdStyle }} id="hufflepuff"></div>
                </div>
                <div>
                    <div id="podium"></div>
                </div>
                <div>
                    <div id="fireGoblet"></div>
                </div>
            </div>
        );
    }
}

export default TournamentVictory;
