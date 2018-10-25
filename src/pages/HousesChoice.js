import React, { Component } from 'react';
import '../style/housesChoice.css';
import { Link } from 'react-router-dom'

class HousesChoice extends Component {

  constructor(props) {
    super(props);
    this.state={
      numberOfPlayers:2,
      playersSelected:0,
      fightersHouse:this.props.houseSelect.fightersHouse,
      alreadyClicked:false,
      tooManyPlayers:false,
    }
  }

  selectHouse = (houseName) => {
    // Test number of players => user is not allowed to select more houses than number of players
    if(this.state.fightersHouse.length===this.state.numberOfPlayers){
      this.setState({
        tooManyPlayers:true,
      })
      setTimeout(()=>{ 
        this.setState({
          tooManyPlayers:false,
        })
      }, 2000);
    }
    // Test if house has already been selected => House can't be selected twice
    else if(this.state.fightersHouse.indexOf(houseName)!==-1){
      this.setState({
        alreadyClicked:true,
      })
      setTimeout(()=>{ 
        this.setState({
          alreadyClicked:false,
        })
      }, 2000);
    }
    else{
      // Housename sent up to App.js
      this.props.houseSelect.returnHouse(houseName);
      // Grayscale on selected shield
      let houseFilter=houseName+"Filter"
      this.setState({
          [houseFilter]:"grayscale(100%)"
      })
    } 
  }

  selectNumberOfPlayers=(e)=>{
    this.setState({
      numberOfPlayers : e.target.value
    })
  }

  componentDidMount=()=>{
    this.setState({
      numberOfPlayers: this.props.houseSelect.tournamentMode ? 3 : 2
    })
  }
  
  render() {
    let playMode = !this.props.houseSelect.tournamentMode ? "none" : "inline-block";
    let alreadySelectedHiddenStyle = this.state.alreadyClicked ? "visible" : "hidden";
    let tooManyPlayersHiddenStyle = this.state.tooManyPlayers ? "visible" : "hidden";

    
    let houseTitleStyle={
      fontSize:"100px",
      marginTop:"40px",
      color:"#066C89",
      textShadow:"4px 4px 6px #C7EACF, -2px -2px 2px #000",
    }
    
    return (
      <div className="container">
          <h1  className="text-center" style={houseTitleStyle}>Choose your fighter house</h1>
          <div style={{display : playMode, textAlign:"center"}} className="text-center">
            <span style={{fontSize:"30px",marginTop:"30px", marginLeft:"25px"}}>Number of players : </span>
            <select onChange={this.selectNumberOfPlayers}>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div style={{display:"none", fontSize:"30px"}}  className="row">
            <span>Team : </span>
            <select>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="row">
            <div className="flag" id="slytherinFlag" onClick={((e) => this.selectHouse("slytherin"))} style={{filter:this.state.slytherinFilter}}></div>
            <div className="flag" id="gryffindorFlag" onClick={((e) => this.selectHouse("gryffindor"))} style={{filter:this.state.gryffindorFilter}}></div>
            <div className="flag" id="hufflepuffFlag" onClick={((e) => this.selectHouse("hufflepuff"))} style={{filter:this.state.hufflepuffFilter}}></div>
            <div className="flag" id="ravenclawFlag" onClick={((e) => this.selectHouse("ravenclaw"))} style={{filter:this.state.ravenclawFilter}}></div>
          </div>
          <div style={{textAlign:"center"}}>
              <p style={{visibility:alreadySelectedHiddenStyle, fontSize:"30px",marginTop:"10px"}}>This house has already been chosen</p>
              <p style={{visibility:tooManyPlayersHiddenStyle, fontSize:"30px"}}>You have already selected all the players</p>
          </div>
          <div style={{textAlign:"center", marginBottom:"10px", fontSize:"30px"}}>
            <Link to="/fight"><button disabled={this.state.fightersHouse.length < this.state.numberOfPlayers}> FIGHT ! </button></Link>
          </div>
      </div>
    );
  }
  
}

export default HousesChoice;
