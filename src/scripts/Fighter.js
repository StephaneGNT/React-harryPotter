import React, { Component } from 'react';
import './Fighter.css';

class Fighter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spellCasted: false,
      rotation:this.props.fighter.rotation,
      facesRight: this.props.fighter.facesRight,
      top:this.props.fighter.top,
      left:this.props.fighter.left,
      width:this.props.fighter.width,
      height:this.props.fighter.height,
      speed: 5,
    }
  }
  
  render() {
    let fighterStyle = {
      transform: `rotateY(${this.state.rotation}deg)`,
      position: "absolute",
      top: this.state.top+"px",
      left: this.state.left+"px",
      width:this.state.width+"px",
      height:this.state.height+"px",
    };

    let fighterId="fighter"+this.props.fighter.house

    return (
      <div>
        <div className="fighter" style={fighterStyle} id={fighterId}>
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress=(event) => {
    switch(event.which){
      case this.props.fighter.attack : 
        this.props.fighter.castSpell(this.props.fighter.id, this.props.fighter.facesRight); 
        break;
      //case this.props.fighter.defense : this.props.fighter.defend(this.props.fighter.id); break;
      case this.props.fighter.rotate : 
        this.props.fighter.rotateFighter(this.props.fighter.id); 
        break;
      case this.props.fighter.moveUp : 
        if(this.state.top>50){
          this.props.fighter.move(this.props.fighter.id, -this.state.speed, 0);
        }
        break;
      case this.props.fighter.moveDown : 
        if(this.state.top+this.state.height+5<window.innerHeight){
          this.props.fighter.move(this.props.fighter.id, this.state.speed, 0);
        }
        break;
      case this.props.fighter.moveLeft : 
        if(this.state.left>0){
          this.props.fighter.move(this.props.fighter.id, 0 , -this.state.speed); 
        }
        break;
      case this.props.fighter.moveRight : 
        if(this.state.left+this.state.width+5<window.innerWidth){
          this.props.fighter.move(this.props.fighter.id, 0, this.state.speed); 
        }
        break;
    }

    this.setState({
      spellCasted:this.props.fighter.spellCasted,
      top:this.props.fighter.top,
      left:this.props.fighter.left,
      rotation:this.props.fighter.rotation
    })
  }
}

export default Fighter;
