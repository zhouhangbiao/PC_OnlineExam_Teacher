/**
 * 左侧菜单栏
 * Created by Administrator on 2018/8/20.
 */

import React from "React";
import {Layout, Menu} from "antd";
import UrlHelper from "js-url-helper";


const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();
const {Sider} = Layout;

/**
 * 全局侧边导航
 */
class SiderNav extends React.Component {

  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      defaultSelectedKeys: query.type
    };
  }

  /**
   * 展开/收缩导航
   * @param collapsed
   */
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  };

  /**
   * 跳转页面
   * @param e
   */
  linkFun = (e) => {
    let linkTpl = {
      1: '/onlineExamTeacher/detailsIndex.html',
      2: '/onlineExamTeacher/examSceneList.html',
      3:'/onlineExamTeacher/queryStudentPassword.html',
      4:'/onlineExamTeacher/wrongQuestion.html',
      5:'/onlineExamTeacher/noticeList.html',
    };
    urlHelper.jump({
      path: linkTpl[e.key],
      search: urlHelper.setSearchParam({
        type: e.key,
      })
    });
  };

  /**
   * 渲染DOM
   * @return {XML}
   */
  render() {
    const { collapsed, defaultSelectedKeys } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth="40"
        width="140"
        onCollapse={this.onCollapse}
      >
        <div className="logo"/>
        <Menu key="1" theme="dark" defaultSelectedKeys={[defaultSelectedKeys]} mode="inline" onClick={this.linkFun}>
        <Menu.Item key="1">
            <span className="icon icon-home"></span>
            <span>首页</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="icon icon-test"></span>
            <span>考试场次</span>
          </Menu.Item>
        <Menu.Item key="3">
            <span className="icon icon-keys"></span>
            <span>查询考生信息</span>
          </Menu.Item>
          <Menu.Item key="4">
            <span className="icon icon-penci"></span>
            <span>错题上报</span>
          </Menu.Item>
          <Menu.Item key="5">
            <span className="icon icon-notice"></span>
            <span>公告</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
export default SiderNav;
