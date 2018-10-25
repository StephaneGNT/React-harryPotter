import React, { Component } from 'react'
import '../style/fightBonus.css'

class Bonus extends Component {

    constructor(props){
        super(props)
    }

    render () {

        let bonusStyle = {
            position : "absolute",
            top : this.props.bonus.layout.top+"px",
            left : this.props.bonus.layout.left+"px",
            width : this.props.bonus.layout.width+"px",
            height : this.props.bonus.layout.height+"px",
            zIndex : 3,
            transition: "top 1100ms ease-in-out",
            opacity:this.props.bonus.opacity,
        }

        let bonusID = this.props.bonus.coeff > 0 ? "bonus" : "malus";

        return (
            <div className={"bonus"} style={bonusStyle} id={bonusID}>{this.props.bonus.chosenSort}
            </div>
        )
    }
}

export default Bonus