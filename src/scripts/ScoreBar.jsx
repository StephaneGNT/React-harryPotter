import React, { Component } from 'react';

import Score from './Score'

import '../style/scoreBar.css'

class ScoreBar extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderScore() {
        const playersScore = [];
        for (var i=0; i < this.props.fightersHouse.length; i++) {
            playersScore.push(
                <Score
                    fighter = {{
                        house:this.props.fightersHouse[i],
                        color:this.props.fightersColor[i],
                        secondColor:this.props.fightersSecondColor[i],
                        points: this.props.points[this.props.fightersHouse[i]],
                    }}
                />
            );
        }
        return playersScore;
    }

    render() {

        return (
            <div id="scoreBar">
                {this.renderScore()}
            </div>
        );
    }
}

export default ScoreBar;
