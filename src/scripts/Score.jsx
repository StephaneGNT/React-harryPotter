import React, { Component } from 'react'
import '../style/scoreBar.css'

class Score extends Component {

    constructor(props){
        super(props)
    }

    render () {

        let scoreStyle = {
            backgroundColor : this.props.fighter.color,
        }

        return (
            <div style={scoreStyle} class="score">
                <span>{this.props.fighter.house} : </span>{this.props.fighter.points}
            </div>
        )
    }
}

export default Score