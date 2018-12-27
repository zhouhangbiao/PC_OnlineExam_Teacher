import React from "React";
import ReactDOM from "ReactDOM";
import * as cef from '../../components/CefRunTime';
import {Button, Checkbox, Col, Modal, Progress, Row, Breadcrumb, Form, Input, Radio, Layout, Icon} from "antd";
import style from "./clearData.less";
import UrlHelper from "js-url-helper";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";

const urlHelper = new UrlHelper(location);
const FormItem = Form.Item;
const {Content} = Layout;

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      ensurevisible: false,
      percent: 0,
      enterCodes: "",
      displayVerify: 'none',
      clearExamData: 'none',
      clearExamDataProgress: 0,
    };
    window.updateClearExamData = this.updateClearExamData;//数据清理
  }

  /**
   * 数据清理
   * @param progress
   * @param response
   */
  updateClearExamData = (progress, response) => {
    window.localStorage.AnnouncementNotReadNumber = '0';
    this.setState({
      clearExamDataProgress: progress,
      clearExamData: "block",
    });
    if(progress < 100){
      return;
    }
    cef.updateClearExamData(progress, response);
  };
  showModal = () => {  //数据清除密码校验弹框
    this.setState({visible: true});
  };
  handleCancel = () => { //数据清除密码校验弹框
    this.setState({visible: false});
  };
  ensureHandleCancel = () => {  //数据清除确定删除弹框
    this.setState({ensureVisible: false});
  };
  hiddenNotice = () => {  //获取焦点时隐藏错误提示信息
    this.state.displayVerify = 'none'
  };
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if ( err ) {
        return;
      }
      if ( values.title !== '000000' ) {
        this.state.displayVerify = 'block'
      } else {
        this.setState({
          visible: false,
          ensureVisible: true,
        });
      }
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    const {clearExamDataProgress} = this.state;
    const CollectionCreateForm = Form.create()(
      (props) => {
        const {visible, onCancel, onCreate, form} = props;
        const {getFieldDecorator} = form;
        return (
          <Modal
            visible={visible}
            title="数据清除"
            okText="确定"
            cancelText="取消"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="">
                {getFieldDecorator('title', {
                  rules: [ {required: true, message: '请输入清除密码！'} ],
                })(
                  <div>
                    <p className={style.clearNotice}>确定要清除系统全部数据吗？（正式考试期间请勿清除数据）</p>
                    <div>
                      <span className={style.passWord}>密码*</span>
                      <Input placeholder="请输入您的密码" className={style.enterPassword} onKeyDown={this.hiddenNotice}/>
                    </div>
                  </div>
                )}
              </FormItem>
              <p style={{color: '#fd3131', display: this.state.displayVerify}}>提示：密码错误，请重新输入或联系管理员！</p>
            </Form>
          </Modal>
        );
      }
    );
    return (
      <div className={style.examInitDataBox}>
        <div className={style.dataBox}>
          <div className="text-c"><Button type="primary" onClick={this.showModal}>清除系统数据</Button></div>
          <p className={style.notice}>提示：数据清除会将当前系统中历史数据全部删除，请谨慎操作。</p>
        </div>
        <div className={style.dataBox} style={{display: this.state.clearExamData}}>
          <h4>正在清除数据</h4>
          <Progress percent={clearExamDataProgress} strokeColor={"#1383f2"}/>
        </div>
        <CollectionCreateForm
          displayVerify={this.state.displayVerify}
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Modal
          visible={this.state.ensureVisible}
          title={"数据清除"}
          okText={"确定"}
          cancelText={"取消"}
          onOk={() => {
            this.setState({
              ensureVisible:false,
              clearExamData:"block"
            });
            cef.clearExamData()
          }}
          onCancel={this.ensureHandleCancel}
          wrapClassName="unlock-seat"
        >
          <p className="text-c font-title">请再次确认是否要初始化系统？(正式考试期间请勿清除数据)</p>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render((
  <div>
    <Header/>
    <Layout className={"teacher-layout h-all"}>
      <SiderNav/>
      <Layout className={style.layoutBox}>
        <Content className={style.hello}>
          <Breadcrumb className={style.bread}>
            <Breadcrumb.Item style={{color: '#4d4d4d'}}>首页</Breadcrumb.Item>
            <Breadcrumb.Item style={{color: '#1a1a1a'}}>数据清除</Breadcrumb.Item>
          </Breadcrumb>
          <CollectionsPage/>
        </Content>
      </Layout>
    </Layout>
    <Footer/>
  </div>
), document.getElementById('main'));

