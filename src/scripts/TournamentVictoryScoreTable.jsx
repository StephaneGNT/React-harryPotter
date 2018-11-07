import React from 'react';
import '../style/tournamentVictoryScoreTable.css' 

export default class ScoreTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    close=()=>{
        this.props.changeDisplay()
    }

    render() {

        return (
            <div id="scoreDiv">
                <p onClick={this.close}>X</p>
                <table>
                    <tbody>
                        <tr>
                            <th>House</th>
                            <th>Points</th>
                        </tr>
                        <tr>
                            <td>{this.props.classifiedPlayers[0]}</td>
                            <td class="points">{this.props.points[this.props.classifiedPlayers[0]]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.classifiedPlayers[1]}</td>
                            <td class="points">{this.props.points[this.props.classifiedPlayers[1]]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.classifiedPlayers[2]}</td>
                            <td class="points">{this.props.points[this.props.classifiedPlayers[2]]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.classifiedPlayers[3]}</td>
                            <td class="points">{this.props.points[this.props.classifiedPlayers[3]]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
