import React from 'react';
import '../style/fightShield.css';

export default class Shield extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let shieldStyle={
            top: this.props.fighter.layout.top-20 + "px",
            left: this.props.fighter.layout.left + "px",
            width: 1.1*this.props.fighter.layout.width + "px",
            height: 1.2*this.props.fighter.layout.height + "px",
        }

        return (
            <div style={shieldStyle} className="energyShield"></div>
        );
    }
}