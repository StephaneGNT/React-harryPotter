import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state={
      areSmallButtonVisible:false,
    }
  }
  

  handleClick(tournamentMode){
    this.props.setTournamentMode(tournamentMode)
  }

  showButton=()=>{
    this.setState({
      areSmallButtonVisible:!this.state.areSmallButtonVisible
    })
    //console.log(this.state.areSmallButtonVisible)
  }


  render() {

    let titleStyle = {
      fontSize:"200px",
      marginTop:"50px",
      color:"#ECCA00",
      textShadow:"4px 4px 4px #CF8E19"
    }

    let bigButtonStyle={
      display:"block",
      fontSize: "40px",
      marginTop: "20px",
      marginLeft: "10%",
      width: "80%",
      textShadow: "1px 1px #CF8E19",
    }

    let smallButtonStyle={
      display:this.state.areSmallButtonVisible ? "block" : "none",
      fontSize: "30px",
      marginTop: "10px",
      marginLeft: "30%",
      width: "40%",
    }

    return (
      <div className="container">
        <h1 className="text-center" style={titleStyle}>Potter Fight</h1>
        <div className="text-center">
          <button style={bigButtonStyle} onClick={((e) => this.showButton())} >NEW FIGHT</button>
          <Link to="/houses"><button onClick={((e) => this.handleClick(false))} style={smallButtonStyle}> 1 vs 1 </button></Link>
          <Link to="/houses"><button onClick={((e) => this.handleClick(true))} style={smallButtonStyle}> Tournament </button></Link>
          <Link to="/houses"><button onClick={((e) => this.handleClick(true))} style={smallButtonStyle}> Battle royale </button></Link>
        </div>
        <button style={bigButtonStyle}>SETTINGS</button>
        <button style={bigButtonStyle}>INSTRUCTIONS</button>
      </div>
    );
  }
}


export default HomePage;
