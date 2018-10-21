import React, { Component } from 'react';
import ScoreTable from '../scripts/TournamentVictoryScoreTable.js'
import '../style/tournamentVictory.css';

class TournamentVictory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classifiedPlayers: [],
            displayScore: false,
        }
    }

    componentDidMount=()=>{
        let localClassifiedPlayers=this.props.houses;
        localClassifiedPlayers.sort((a,b)=>this.props.points[b]-this.props.points[a])
        this.setState({
            classifiedPlayers:localClassifiedPlayers
        })
    }

    displayScore=()=>{
        this.setState({
            displayScore: !this.state.displayScore
        })
    }

    render() {

        let titleStyle = {
            width:"100%",
            textAlign:"center",
            fontSize: "100px",
            marginTop: "20px",
            color: "#ECCA00",
            textShadow: "4px 4px 4px #CF8E19",
            paddingRight:"20px"
        }

        let winningStyle = {
            top: "100px",
            left: "330px",
        }
        let secondStyle = {
            top: "150px",
            left: "100px",
        }
        let thirdStyle = {
            top: "180px",
            left: "580px",
        }

        return (
            <div>
                <div>
                    <p style={titleStyle}>{this.state.classifiedPlayers[0]} wins !!</p>
                </div>
                <div>
                    <div className="shields" style={winningStyle} id={this.state.classifiedPlayers[0]}></div>
                    <div className="shields" style={secondStyle} id={this.state.classifiedPlayers[1]}></div>
                    <div className="shields" style={thirdStyle} id={this.state.classifiedPlayers[2]}></div>
                </div>
                <div>
                    <div id="podium"></div>
                    <a href='https://fr.freepik.com/vecteurs-libre/3d-formes-geometriques-realistes-isolees-sur-fond-transparent_3090536.htm'></a>
                </div>
                <div>
                    <div id="fireGoblet"></div>
                </div>
                <div>{
                    this.state.displayScore ?
                    <ScoreTable 
                        classifiedPlayers={this.state.classifiedPlayers}
                        points={this.props.points}
                        changeDisplay={this.displayScore}
                    />
                    :
                    <div></div>
                }</div>
                <div className="button">
                    <button onClick={this.displayScore}>Score</button>
                    <button>Home</button>
                </div>
            </div>
        );
    }
}

export default TournamentVictory;
