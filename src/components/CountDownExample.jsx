import React from 'React'
import CountDown from './CountDown.jsx';
import { message,Button} from 'antd';

class CountDownExample extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      count1: 10,
      count2: 3605,
      reload1: false
    };
  }

  /**
   * 固定时间回调
   */
  onBound = () => {
    message.warning('执行固定时间 60 分钟设置');
  };

  /**
   * 完成倒计时回调
   */
  onComplete1 = () => {
    message.info('倒计时完成，重新倒计时 20 秒');
    this.setState({
      count1: 20,
      reload1: true
    });
    this.setState({
      reload1: false
    });
  };

  /**
   * 完成倒计时回调
   */
  onComplete2 = () => {
    message.success('倒计时完成');
  };

  render(){
    return (
      <div className={style.countdown}>
        <span >剩余时间: </span>
        <div style={{display:'inline-block'}}>
          <CountDown count={2000} onComplete={this.onComplete2}/>
        </div>
        <div style={{float:'right'}}>
          <Button type="primary">开启考试</Button>
          <Button type="primary">关闭考试</Button>
          <Button type="primary">延长考试时长</Button>
          <Button type="primary">重考</Button>
          <Button type="primary">答卷数据上传</Button>
          <Button type="primary">返回</Button>
        </div>
      </div>
    );
  }
}

export default CountDownExample;
