import React from 'react';

export default class HeaderTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes : this.props.fightTime,
            seconds : 0,
            timer : "0"+this.props.fightTime+":00"
        };
    }

    componentDidMount=()=>{
        let timerInterval = setInterval(()=>{
            if(this.state.seconds === 0){
                this.setState({
                    minutes : this.state.minutes - 1,
                    seconds : 59
                })
            }
            else{
                this.setState({
                    seconds : this.state.seconds - 1,
                })
            }

            this.setState({
                timer : this.state.seconds > 9 ? "0"+this.state.minutes+":"+this.state.seconds : "0"+this.state.minutes+":0"+this.state.seconds
            })

            if(this.state.minutes === 0 && this.state.seconds === 0){
                clearInterval(timerInterval);
                this.props.endOfFight();
            }
        },1000)


        
    }

    render() {

        let timerStyle = {
            position : "absolute",
            top : "10px",
            left : window.innerWidth/2 * 0.95,
            padding : "10px",
            border : "1px solid black",
            width: "100px",
            textAlign : "center",
            fontSize : "20px",
        }

        return (
            <div style={timerStyle}>
                {this.state.timer}
            </div>
        );
    }
}
