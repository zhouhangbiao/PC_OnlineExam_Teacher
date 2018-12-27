import React from "React";

/**
 * 倒计时
 */
class CountDown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      color: props.color ? props.color : "#FF0000",
      counted: 0,
      warn: false
    };
  }

  counted = 0;

  componentDidMount() {
    this.timed();
  }

  componentDidUpdate() {
    if (this.props.reload) {
      this.counted = 0;
      this.timed();
    }
  }

  /**
   * 计时
   */
  timed = () => {
    let timer = setInterval(() => {
      this.counted = this.counted + 1;
      this.setState({
        counted: this.counted
      });
      if (this.props.bound) {
        if ((this.props.count - this.counted === this.props.bound * 60) && !this.state.warn) {
          this.props.onBound && this.props.onBound();
          this.setState({
            warn: true
          });
        }
      }
      if (this.props.count === this.counted) {
        clearInterval(timer);
        this.props.onComplete && this.props.onComplete();
      }
    }, 1000);
  };

  /**
   * 格式化秒
   * @param seconds
   * @return {string}
   */
  secondToTime = (seconds) => {
    let h = Math.floor(seconds / 3600) < 10 ? '0' + Math.floor(seconds / 3600) : Math.floor(seconds / 3600);
    let m = Math.floor((seconds / 60 % 60)) < 10 ? '0' + Math.floor((seconds / 60 % 60)) : Math.floor((seconds / 60 % 60));
    let s = Math.floor((seconds % 60)) < 10 ? '0' + Math.floor((seconds % 60)) : Math.floor((seconds % 60));

    if (h !== "00") {
      return h + ":" + m + ":" + s;
    } else {
      return m + ":" + s;
    }
  };

  render(){
    return (
      <div style={{color: this.state.color}}>
        {this.secondToTime(this.props.count - this.counted)}
      </div>
    );
  }
}

export default CountDown;
