import React from "React";
import ReactDOM from "ReactDOM";
import * as cef from '../../components/CefRunTime';
import { Button, Modal, Progress, Breadcrumb, Form, Input, Radio, Icon, Layout } from "antd";
import style from "./dataDownload.less";
import UrlHelper from "js-url-helper";
import * as service from "../../services/detailsServices";
import * as serviceE from "../../services/commonServices";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";

const urlHelper = new UrlHelper(location);
const FormItem = Form.Item;
const { Content } = Layout;
const localStorage = window.localStorage;

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      percent: 0,
      IsConnectInternet: 1,
      LastTimeDownloaded: "",
      disabled: null,
      checkVisible: false,
      errorPackageVisible: false,
      displayLoading: "none",
      importExamData: "none",
      importWrongQuestion: "none",
      downloadExamDataProgress: 0,
      importExamDataProgress: 0,
      importWrongQuestionProgress: 0,
      AnnouncementNotReadNumber: localStorage.AnnouncementNotReadNumber * 1 || 0
    };
    window.updateDownloadExamData = this.updateDownloadExamData;//下载考试数据
    window.updateImportExamData = this.updateImportExamData;//导入离线数据包
    window.updateImportWrongQuestion = this.updateImportWrongQuestion;//导入错题数据包
    /**
     * 查询数据下载
     */
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3
    });
    service.QueryDownloadData({
      payload: {}
    }).then(data => {
      layer.close(loading);
      if (data.ReturnEntity.IsConnectInternet === 0) {
        this.setState({
          disabled: true,
          LastTimeDownloaded: data.ReturnEntity.LastTimeDownloaded
        });
      } else if (data.ReturnEntity.IsConnectInternet === 1) {
        this.setState({
          disabled: false,
          LastTimeDownloaded: data.ReturnEntity.LastTimeDownloaded
        });
      }
    })
  }

  /**
   * 下载考试数据
   * @param progress
   * @param response
   */
  updateDownloadExamData = (progress, response) => {
    serviceE.GetAnnouncementList({
      payload: {
        "PageIndex": '1',
        "PageSize": '10'
      }
    }).then((data) => {
      this.setState({ AnnouncementNotReadNumber: data.ReturnEntity.NotReadNumber }, () => {
        localStorage.setItem('AnnouncementNotReadNumber', this.state.AnnouncementNotReadNumber);
      })
    });
    this.setState({
      downloadExamDataProgress: progress,
      displayLoading: "block",
      importExamData: "none",
      importWrongQuestion: "none"
    });
    if (progress < 100) {
      return;
    }
    cef.updateDownloadExamData(progress, response);
  };
  /**
   * 导入离线数据包
   * @param progress
   * @param response
   */
  updateImportExamData = (progress, response) => {
    serviceE.GetAnnouncementList({
      payload: {
        "PageIndex": '1',
        "PageSize": '10'
      }
    }).then((data) => {
      this.setState({ AnnouncementNotReadNumber: data.ReturnEntity.NotReadNumber }, () => {
        localStorage.setItem('AnnouncementNotReadNumber', this.state.AnnouncementNotReadNumber);
      })
    });
    let responseData = JSON.parse(response);
    let progressData = parseInt(progress);
    if (progressData === 0 && responseData.ResultType === 0) {
      this.setState({ importExamData: "none" });
      layer.closeAll()
    }
    else if (progressData === 100 && responseData.ResultType === 1) {
      this.setState({
        importExamDataProgress: progress,
        importExamData: "block"
      });
      cef.updateImportExamData(progress, response);
    }
    else if (progressData > 0 && progressData < 100) {
      this.setState({
        importExamDataProgress: progress,
        importExamData: "block"
      });
      cef.updateImportExamData(progress, response);
    }
  };
  /**
   * 导入错题数据
   * @param progress
   * @param response
   */
  updateImportWrongQuestion = (progress, response) => {
    let responseData = JSON.parse(response);
    let progressData = parseInt(progress);
    if (progressData === 0 && responseData.ResultType === 0) {
      this.setState({ importWrongQuestion: "none" });
      layer.closeAll()
    }
    else if (progressData === 100 && responseData.ResultType === 1) {
      this.setState({
        importWrongQuestionProgress: progress,
        importWrongQuestion: "block"
      });
      cef.updateImportWrongQuestion(progress, response);
    }
    else if (progressData > 0 && progressData < 100) {
      this.setState({
        importWrongQuestionProgress: progress,
        importWrongQuestion: "block"
      });
      cef.updateImportWrongQuestion(progress, response);
    }
  };
  checkCancelVisible = () => { //隐藏下载完成
    this.setState({ checkVisible: false });
  };
  showModal = () => {   //显示导入离线数据包
    this.setState({ visible: true });
  };
  handleCancel = () => { //隐藏导入离线数据包
    this.setState({ visible: false });
  };
  handleCreate = () => {  //导入离线数据包方法
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };
  downloadExamData = () => { //下载考试数据
    this.setState({
      displayLoading: "none",
      importExamData: "none",
      importWrongQuestion: "none",
    });
    cef.downloadExamData()
  };
  importExamData = () => {  //导入离线数据包
    this.setState({
      importExamDataProgress: 0
    });
    cef.importExamData()
  };
  importWrongQuestion = () => { //导入错题包
    this.setState({
      importWrongQuestionProgress: 0
    });
    cef.importWrongQuestion()
  };

  render() {
    const { downloadExamDataProgress, importExamDataProgress, importWrongQuestionProgress } = this.state;
    return (
      <div className={style.examInitDataBox}>
        <div className={style.dataBox} style={{ padding: '0' }}>
          <Button type="primary" onClick={this.downloadExamData} className="downLoad"
            disabled={this.state.disabled}>下载考试数据</Button>
          <Button type="primary" className="exportData" onClick={this.importExamData}>导入离线数据包</Button>
          <Button type="primary" style={{ marginLeft: '0' }} onClick={this.importWrongQuestion}>导入错题包</Button>
          <p className={style.lastDownTime}>上次下载时间：<span>{this.state.LastTimeDownloaded}</span></p>
        </div>
        <div className={style.dataBox} style={{ display: this.state.displayLoading }}>
          <h4>正在比对考试数据</h4>
          <Progress percent={downloadExamDataProgress} strokeColor={"#1383f2"} />
        </div>
        <div className={style.dataBox} style={{ display: this.state.importExamData }}>
          <h4>正在导入离线数据包</h4>
          <Progress percent={importExamDataProgress} strokeColor={"#1383f2"} />
        </div>
        <div className={style.dataBox} style={{ display: this.state.importWrongQuestion }}>
          <h4>正在导入错题包</h4>
          <Progress percent={importWrongQuestionProgress} strokeColor={"#1383f2"} />
        </div>
        <Modal
          title="提示"
          wrapClassName="vertical-center-modal"
          onCancel={this.checkCancelVisible}
          visible={this.state.checkVisible}
          footer={<button onClick={() => this.checkCancelVisible(false)} type="button"
            className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>下载完成！</p>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render((
  <div>
    <Header />
    <Layout className={"teacher-layout h-all"}>
      <SiderNav />
      <Layout className={style.layoutBox}>
        <Content className={style.hello}>
          <Breadcrumb className={style.bread}>
            <Breadcrumb.Item style={{ color: '#4d4d4d' }}>首页</Breadcrumb.Item>
            <Breadcrumb.Item style={{ color: '#1a1a1a' }}>数据下载</Breadcrumb.Item>
          </Breadcrumb>
          <CollectionsPage />
        </Content>
      </Layout>
    </Layout>
    <Footer />
  </div>
), document.getElementById('main'));
