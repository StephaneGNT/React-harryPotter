import React, { Component } from 'react';

class WelcomeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      zIndex: 10,
    };
  }

  componentDidMount=() => {
    this.disappear();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fighter1Info.house !== this.props.fighter1Info.house
    || nextProps.fighter2Info.house !== this.props.fighter2Info.house) {
      this.setState({
        opacity: 1,
        zIndex: 10,
      });
      this.disappear();
    }
  }

  disappear=() => {
    const { opacity } = this.state;

    const msgInterval = setInterval(() => {
      this.setState({
        opacity: opacity - 0.02,
      });
    }, 50);
    setTimeout(() => {
      this.setState({
        zIndex: -1,
      });
      clearInterval(msgInterval);
    }, 3000);
  }

  render() {
    const { fighter1Info, fighter2Info } = this.props;
    const { opacity, zIndex } = this.state;

    const componentStyle = {
      width: `${0.8 * window.innerWidth}px`,
      height: `${0.5 * window.innerHeight}px`,
      margin: 'auto',
      position: 'absolute',
      top: '250px',
      left: '20px',
      opacity,
      fontSize: '180px',
      color: 'white',
      textShadow: '-2px -2px 2px #000, 2px 2px 2px #000',
      zIndex,
    };

    const fighter1Style = {
      color: fighter1Info.color,
      position: 'fixed',
      right: `${window.innerWidth / 1.75}px`,
      transform: 'rotateZ(-20deg)',
      textShadow: `1px 1px ${fighter1Info.secondColor},-1px -1px ${fighter1Info.secondColor}`,
    };

    const vsStyle = {
      position: 'absolute',
      left: `${window.innerWidth / 2 * 0.9}px`,
      transform: 'rotateZ(-20deg)',
    };

    const fighter2Style = {
      color: fighter2Info.color,
      transform: 'rotateZ(-20deg)',
      position: 'absolute',
      left: `${window.innerWidth / 2 * 1.05}px`,
      top: '40px',
      textShadow: `1px 1px ${fighter2Info.secondColor},-1px -1px ${fighter2Info.secondColor}`,
    };

    const fighter1House = `${fighter1Info.house[0].toUpperCase() + fighter1Info.house.slice(1)}`;
    const fighter2House = `${fighter2Info.house[0].toUpperCase() + fighter2Info.house.slice(1)}`;

    return (
      <div style={componentStyle}>
        <div style={fighter1Style}>{fighter1House}</div>
        <div style={vsStyle}> vs </div>
        <div style={fighter2Style}>{fighter2House}</div>
      </div>
    );
  }
}

export default WelcomeMessage;
