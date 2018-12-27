import React from "React";

/**
 * 倒计时
 */
class CountDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counted: 0,
      warn: false,
      timePlay:'none',
    };
  }

  counted = 0;

  timer = null;

  /**
   * 到计时
   */
  countDown = () => {
    this.timer = setInterval(() => {
      if ( this.props.count === 0 ) {
        this.counted = -1;
        this.counted = this.counted + 1;
        this.setState({
          counted: this.counted
        });
        if ( this.props.bound ) {
          if ( (this.props.count - this.counted === this.props.bound) && !this.state.warn ) {
            this.props.onBound && this.props.onBound();
            this.setState({
              warn: true
            });
          }
        }
        if ( this.props.count === this.counted ) {
          clearInterval(this.timer);
          this.props.onComplete && this.props.onComplete();
          this.props.reload && this.reCountDown();
        }
      } else {
        this.counted = this.counted + 1;
        this.setState({
          counted: this.counted
        });
        if ( this.props.bound ) {
          if ( (this.props.count - this.counted === this.props.bound) && !this.state.warn ) {
            this.props.onBound && this.props.onBound();
            this.setState({
              warn: true
            });
          }
        }
        if ( this.props.count === this.counted ) {
          clearInterval(this.timer);
          this.props.onComplete && this.props.onComplete();
          this.props.reload && this.reCountDown();
        }
        let timeLimit=this.props.count - this.counted;
        if (timeLimit>600) {
          this.setState({
            timePlay:'none',
          })
        }else if(timeLimit<=600){
          this.setState({
            timePlay:'inline-block',
          })
        }
      }
    }, 1000);
  };

  /**
   * 重新倒计时
   */
  reCountDown = () => {
    clearInterval(this.timer);
    this.counted = 0;
    this.countDown();
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

    if ( h !== "00" ) {
      return h + ":" + m + ":" + s;
    } else {
      return m + ":" + s;
    }
  };

  render() {
    return (
      <span style={{color: this.props.color ? this.props.color : "#FF0000", "padding-left": "10px", display: this.state.timePlay}}>
        {this.secondToTime(
          this.props.count - this.counted>= 0 ?this.props.count - this.counted:0
        )}
        </span>
    );
  }
}

export default CountDown;
