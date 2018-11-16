import React from 'react';
import '../style/headerTimer.css';

export default class HeaderTimer extends React.Component {
  constructor(props) {
    super(props);
    const { fightTime } = this.props;
    this.state = {
      seconds: fightTime * 60,
      timer: '',
    };
  }

  componentDidMount = () => {
    const timerInterval = setInterval(() => {
      if (!this.props.showInstructions && !this.props.isFighterDead) {
        this.setState({
          timer: this.printTime(this.state.seconds),
          seconds: this.state.seconds - 1,
        });
      }

      if (this.state.seconds === 0) {
        clearInterval(timerInterval);
        this.props.endOfFight();
      }
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFighterDead !== this.props.isFighterDead) this.setState({seconds: this.props.fightTime * 60});
  }

  printTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return secondsLeft > 9 ? `0${minutes}:${secondsLeft}` : `0${minutes}:0${secondsLeft}`;
  }

  render() {
    const timerStyle = {
      left: (window.innerWidth - 100) / 2,
    };

    return (
      <div style={timerStyle} id="timer">
        {this.state.timer}
      </div>
    );
  }
}
