import React from "React";
import { Button, Breadcrumb, Form, Radio, Modal, Layout } from "antd";
import style from "./setStudentLogin.less";
import UrlHelper from "js-url-helper";
import * as service from "../../services/detailsServices";
import * as serviceWu from "../../services/commonServices";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";

const urlHelper = new UrlHelper(location);
const RadioGroup = Radio.Group;
const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      checkVisible: false,
      explain: '',
    };
    let that = this;
    serviceWu.GetExamIndexInfo({
      payload: {}
    }).then(function (data) {
      if (data.ReturnEntity.IsAllowStudentLogin) {
        that.setState({
          value: 1
        })
      } else if (data.ReturnEntity.IsAllowStudentLogin === false) {
        that.setState({
          value: 2
        })
      }
    });
  };
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  save = () => {  //保存接口
    let that = this;
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    service.LoginSet({
      payload: {
        "EnableLogin": this.state.value
      }
    }).then(function (data) {
      layer.close(loading);
      if (data.ReturnEntity === 1) {
        that.setState({
          checkVisible: true,
          explain: '保存成功！'
        })
      } else if (data.ReturnEntity === 2) {
        that.setState({
          checkVisible: true,
          explain: '保存失败！'
        })
      }
    });
  };
  checkCancelVisible = () => {
    this.setState({ checkVisible: false });
  };

  render() {
    return (
      <div>
        <div className={style.setLogin}>
          <div className={style.set}>考生登陆设置</div>
          <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>允许考生登陆</Radio>
            <Radio value={2}>禁止考生登陆</Radio>
          </RadioGroup>
        </div>
        <div className={style.save}>
          <Button type="primary" onClick={this.save}>保存</Button>
        </div>
        <Modal
          title="提示"
          wrapClassName="vertical-center-modal"
          onCancel={this.checkCancelVisible}
          visible={this.state.checkVisible}
          footer={<button onClick={() => this.checkCancelVisible(false)} type="button"
            className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>{this.state.explain}</p>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Header />
    <Layout className={"teacher-layout h-all"}>
      <SiderNav />
      <Layout className={style.layoutBox}>
        <Content className={style.hello}>
          <Breadcrumb className={style.bread}>
            <Breadcrumb.Item style={{ color: '#4d4d4d' }}>首页</Breadcrumb.Item>
            <Breadcrumb.Item style={{ color: '#1a1a1a' }}>考生登陆设置</Breadcrumb.Item>
          </Breadcrumb>
          <App />
        </Content>
      </Layout>
    </Layout>
    <Footer />
  </div>
  , document.getElementById('main'));
