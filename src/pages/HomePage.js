import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/homePage.css';
import Instructions from '../scripts/HomePageInstructions'

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state={
      areSmallButtonVisible:false,
      areInstructionsVisible:false,
    }
  }
  
  showButton=()=>{
    this.setState({
      areSmallButtonVisible:!this.state.areSmallButtonVisible
    })
  }

  setTournamentMode(tournamentMode){
    this.props.setTournamentMode(tournamentMode)
  }

  toggleInstructions=()=>{
    this.setState({
      areInstructionsVisible:!this.state.areInstructionsVisible
    })
  }


  render() {

    let containerStyle={
      //backgroundSize: window.innerHeight+"px, "+window.innerWidth+"px"
      height: window.innerHeight+"px",
      marginTop:0,
      paddingTop:0,
      backgroundRepeat:"no-repeat",
      backgroundSize: window.innerWidth+"px, "+window.innerHeight+"px",
    }

    let titleStyle = {
      fontSize:"200px",
      marginTop:"50px",
      marginBottom : "100px",
      color:"#ECCA00",
      textShadow:"4px 4px 6px #CF8E19, -2px -2px 2px #fff",
    }

    let titleStyle2 = {
      fontSize:"200px",
      marginTop:"50px",
      color:"#066C89",
      textShadow:"4px 4px 6px #C7EACF, -2px -2px 2px #000",
    }

    let bigButtonStyle={
      display:"block",
      fontSize: "40px",
      marginTop: "20px",
      marginLeft: "20%",
      width: "60%",
      color:"#000",
    }

    let smallButtonStyle={
      display:this.state.areSmallButtonVisible ? "block" : "none",
      fontSize: "30px",
      marginTop: "10px",
      marginLeft: "30%",
      width: "40%",
      color:"#000",
    }

    let instructionStyle = {
      display:this.state.areInstructionsVisible ? "block" : "none",
    }

    return (
      <div className="container-fluid" style={containerStyle}>
        <h1 className="text-center" style={titleStyle}>Potter Fight</h1>
        <div className="text-center">
          <button style={bigButtonStyle} onClick={((e) => this.showButton())} >
            NEW FIGHT
          </button>
            <Link to="/houses">
              <button onClick={((e) => this.setTournamentMode(false))} style={smallButtonStyle}>
                 1 vs 1 
              </button>
            </Link>
            <Link to="/houses">
              <button onClick={((e) => this.setTournamentMode(true))} style={smallButtonStyle}>
                 Tournament 
              </button>
            </Link>
            <Link to="/houses">
              <button onClick={((e) => this.setTournamentMode(true))} style={smallButtonStyle}>
                 Battle royale 
              </button>
            </Link>
        </div>
        <button style={bigButtonStyle} >SETTINGS</button>
        
        <button style={bigButtonStyle} onClick={((e) => this.toggleInstructions())}>INSTRUCTIONS</button>
        <div style={instructionStyle}>
          <Instructions
            toggleInstructions={this.toggleInstructions}
          />
        </div>
      </div>
    );
  }
}


export default HomePage;
