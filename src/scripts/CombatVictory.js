import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class CombatVictory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            house: this.props.winner.house,
            color: this.props.winner.color,
            tournamentMode: this.props.tournamentMode,
            turn: this.props.turn,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            house: props.winner.house,
            color: props.winner.color,
        }
    }

    /*newGame = () => {
        this.setState({
            turn: this.state.turn++
        })
        this.props.getCurrentFighters(this.state.turn);
    }*/

    /*componentDidMount = () => {
        if (this.props.tournamentMode === "1 vs 1") {
            this.setState({
                tournamentMode: false
            })
        }
    }*/

    render() {
        let victoryScreenStyle = {
            position: "absolute",
            top: "300px",
            left: this.props.winner.id === "fighter2" ? "250px" : "900px",
        }
        let victoryMessageStyle = {
            color: this.state.color,
            textShadow: "1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            fontSize: "50px",
            margin: "auto",
        }
        let firstButtonStyle = {
            width: "150px",
            display: "inline-block",
            position: "relative",
            top: "10px",
            marginRight: "10px"
        }
        let secondButtonStyle = {
            width: "100px",
            display: "inline-block",
            position: "relative",
            top: "10px",
            right: "5px",
        }
        //console.log(this.props.tournamentMode)

        return (
            <div style={victoryScreenStyle}>
                <p style={victoryMessageStyle}>{this.state.house} wins !</p>
                <div style={firstButtonStyle}>{
                    this.props.tournamentMode ?
                        <button onClick={this.nextFight}>Next fight</button>
                        :
                        <button onClick={this.restartFight}>Restart fight</button>
                }</div>
                <div style={secondButtonStyle}>
                    <Link to="/"><button> Home page </button></Link>
                </div>
            </div>
        );
    }

    restartFight=()=>{
        //console.log("restart fight in combat victory")
        this.props.restartFight();
    }

    nextFight=()=>{
        this.setState({
            turn:this.state.turn++
        })
        this.props.nextFight(this.state.turn);
    }
}

export default CombatVictory;
