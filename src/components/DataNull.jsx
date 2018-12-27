//空頁面
import React from "React";
import defaultImg from "../assets/images/data-null.png";
import style from "./DataNull.less";

/**
 * 全局空页面组件
 */
class DataNull extends React.Component {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '暂无数据',
      imgUrl: this.props.imgUrl || defaultImg
    }
  }

  /**
   * 渲染DOM
   * @return {*}
   */
  render() {
    let data = this.props.data || this.props.data === '' ? this.props.data : null;
    return (
      data !== null ? (
        <div className={style.dataNullBox}>
          <div>
            <img src={this.state.imgUrl}/>
            <p>{this.state.text}</p>
          </div>
        </div>
      ) : ('')
    )
  }
}
export default  DataNull
