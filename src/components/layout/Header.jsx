/**
 * Created by 粉红豹 on 2018/8/16.
 * 教师端头部组件
 */
import React from "React";
import {Badge, Col, Icon, Row} from "antd";
import classnames from "classnames";
import style from "./Header.less";
import UrlHelper from "js-url-helper";
import defaultImg from "../../assets/images/data-null.png";
import * as service from "../../services/commonServices";

const urlHelper = new UrlHelper(location);
var searchParam = urlHelper.getSearchParam();
const localStorage = window.localStorage;

/**
 * 全局头部组件
 */
class Header extends React.Component {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      SystemLogo: localStorage.SystemLogo || defaultImg,
      SystemName: localStorage.SystemName || '',
      RoomName: localStorage.RoomName || '',
      SchoolName: localStorage.SchoolName || '',
      TerminalName: localStorage.TerminalName || '',
      UserTrueName: localStorage.UserTrueName || '',
      AnnouncementNotReadNumber: localStorage.AnnouncementNotReadNumber * 1,
      toggleNumber: 0
    };
  }

  /**
   * 退出登录
   */
  logout = () => {
      let confirm= layer.confirm('是否退出当前登录', {
      btn: ['确认','取消'],
      title:"退出用户" //按钮
    },  function(){
      service.Logout({
        payload: {}
      }).then((data) => {
        switch (data.ReturnEntity) {
          case 1:
            urlHelper.jump({
              path: '/onlineExamTeacher/login.html',
            })
            break;
          case 0:
            layer.msg('退出失败，请重试', {
              type: 1
            })
        }
      })
    },function(){
      layer.close(confirm);
    });
  };
  /**
   * 跳转公告列表
   */
  noticelist=()=>{
    urlHelper.jump({
      path: '/onlineExamTeacher/noticeList.html',
    });
  };

  /**
   * 组件渲染完成
   */
  componentDidMount(){
    this.setState({
      toggleNumber:searchParam.type
    })
  }

  /**
   * 渲染DOM
   * @return {XML}
   */
  render() {
    const { toggleNumber, SystemLogo, SystemName, SchoolName, RoomName, Number, UserTrueName } = this.state;
    const { IsMockTest } = this.props;

    if(toggleNumber == 5){
    return (
      <Row className={classnames(style.HeaderBox, "header-box")} type="flex" justify="center">
            <Col span={12}>
          <img className={style.logo} src={SystemLogo}/>
          <span className="h4">{SystemName}{IsMockTest ? '（模拟考试）' : ''}</span>
        </Col>
        <Col className="text-r" span={12}>
          <ul>
            <li>考点：<span>{SchoolName}</span></li>
            <li>考场：<span>{RoomName}</span></li>
            <li>
            <Badge count={Number} >
            <a href="javascript:void(0);" className={style.notice+" head-example"} onClick={this.noticelist}>公告</a>
            </Badge >
              </li>
            <li>
              {UserTrueName}<Icon type="down"/>
              <a href="javascript:void(0);" className={classnames(style.headerQuit, "text-c")}
                 onClick={this.logout}>退出</a>
            </li>
          </ul>
        </Col>
      </Row>
    )}else{
      return (
        <div className={classnames(style.HeaderBox, "header-box")}>
          <div className={style.logoBox}>
            <img className={style.logo} src={SystemLogo}/>
            <span className="h4">{SystemName}{IsMockTest ? '（模拟考试）' : ''}</span>
          </div>
          <div className={style.infoBox}>
            <ul>
              <li>考点：<span>{SchoolName}</span></li>
              <li>考场：<span>{RoomName}</span></li>
              <li>
                <Badge count={localStorage.AnnouncementNotReadNumber}>
                  <a href="javascript:void(0);" className={style.notice+" head-example"} onClick={this.noticelist}>公告</a>
                </Badge >
              </li>
              <li>
                {UserTrueName}<Icon type="down"/>
                <a href="javascript:void(0);" className={classnames(style.headerQuit, "text-c")}
                   onClick={this.logout}>退出</a>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default  Header
