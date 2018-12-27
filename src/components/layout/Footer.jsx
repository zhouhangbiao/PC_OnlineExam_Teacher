/**
 * Created by 粉红豹 on 2018/8/16.
 * 教师端尾部组件
 */

import React from "React";
import style from "./Footer.less";
import classnames from "classnames";

const Copyright = '版权信息：'+ window.localStorage.Copyright || '版权信息：江西省南昌市考试院2018';

/**
 * 全局尾部组件
 */
class Footer extends React.Component {
  /**
   * 渲染DOM
   * @return {XML}
   */
  render() {
    return (
      <div className={classnames(style.FooterBox, "text-c footer-box")}>{Copyright}</div>
    )
  }
}

export default Footer
