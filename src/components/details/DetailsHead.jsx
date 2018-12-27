import React from "React";
import UrlHelper from "js-url-helper";
import style from './DetailsHead.less';
import {Layout, Progress, Icon, Button, Breadcrumb, message, Modal, Input, Form, Radio, notification,Tabs} from 'antd';
import 'moment/locale/zh-cn';
const urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();
const FormItem = Form.Item;
import Authorize from './Authorize.jsx';
import Extension from './Lengthen.jsx';
import AuthorizeRestart from './AuthorizeRestart.jsx';
import CountDown from './CountDown.jsx';
import Reexamine from './Reexamination.jsx';
import * as service from '../../services/detailsServices';
import classnames from "classnames";
import CountDownTime from '../CountDownTime.jsx';
import * as cef from "../CefRunTime";
import DownloadFile from "../DownloadFile";
import TasksList from '../details/TasksList.jsx';
import InvigilatorRecord from '../InvigilatorRecord.jsx';
import ExamSheet from '../ExamSheet.jsx';
import AnswerData from '../AnswerData.jsx';
const TabPane = Tabs.TabPane;
class DetailsHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 10,
      count2: 3605,
      reload1: false,
      visible: false,
      visibleLeng: false,
      visibleRest: false,
      visibleStart: false,
      visibleUpLoad: false,
      visibleClose: false,
      visibleStartTest: false,
      visibleAuthorize: false,
      visibleTime: false,
      visibleFive: false,
      ReturnEntity: 0,
      Courses: [],
      LeftTimeLength: null,
      RemindTimeLength: null,
      ExamSceneName: null,
      ExamCourses: [],
      ExamInstruction: null,
      ExamType: null,
      TimeLength: null,
      AutoOpenTimeLength: null,
      ExamTime: null,
      MissExamTimeLength: null,
      IsNeedAuthorization: null,
      AutoOpenExam: null,
      Status: null,
      displayOne: 'none',//正常开考
      displayAuthorize: "none", //授权开考
      displayYCKS: 'none',//延长考场时长
      displayCk: 'none',//重考
      displayClose: 'none',//关闭考试
      displayThree: 'none',//状态为3
      displayFour: 'none',//状态为4
      autoStart: 'none',//自动开启
      autoEnd: 'none',//自动关闭
      course: null,
      remainingTime: 'none',
      autoVisible: false,
      displayVerify: '', //授权开启验证授权码
      RestartVerify: '', //重新开启考试验证授权码
      explainVisible: false,
      explain: '',
      explainAuthorize: '',
      explainVisibleAuthorize: false,
      explainVisibleClose: false,
      explainVisibleUP: false,
      autoCloseVisible: false, //自动关闭提示框
      explainClose: '',
      explainUP: '',
      autoExamExplain: '',
      uploadDataProgress: 0,
      uploadData: "none",
      restart: "none",//重新开启
      displayAuthorizeRestart: "none",//授权重新开启
      visibleRestart: false,
      explainVisibleRestart: false,
      VisibleRestart: false, //授权重新开启
      visiblePreloading: false, //预加载
      disabledState: false,//预加载按钮置灰
      tabcontent: [],
      active: '0',
      key: "99",
      IsAllowReexamination:null,
      IsAllowDelayExam:null,
      datasExport:"none"  //答卷数据导出
    };
    this.GetExamInfo();
    window.updateUploadExamSceneData = this.updateUploadExamSceneData;//答卷数据上传
  }

  /**
   * 答卷数据上传
   * @param progress
   * @param response
   */
  updateUploadExamSceneData = (progress, response) => {
    this.setState({
      uploadDataProgress: progress,
      uploadData: "block",
    });
    if ( progress < 100 ) {
      return;
    }
    cef.updateUploadExamSceneData(progress, response);
  };
  /**
   *获取考试详情信息
   */
  GetExamInfo = () => {
    let that = this;
    let subject = [];
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3, time: 3000
    });
    service.GetExamInfo({
      payload: {
        "ExamSceneId": query.examSceneId
      }
    }).then(function (data) {
      layer.close(loading);
      if ( data.ReturnEntity.Status === 1 ) {
        if ( data.ReturnEntity.IsNeedAuthorization ) { //授权开启
          that.setState({
            displayPreloading: 'inline-block',
            displayAuthorize: 'inline-block',
            displayOne: 'none',
            displayFour: 'inline-block',
          });
        } else {
          if ( data.ReturnEntity.AutoOpenExam === false ) {//正常开考
            that.setState({
              displayPreloading: 'inline-block',
              displayAuthorize: 'none',
              displayOne: 'inline-block',
              displayFour: 'inline-block',
            });
          } else if ( data.ReturnEntity.AutoOpenExam ) {  //自动开考
            that.setState({
              displayPreloading: 'inline-block',
              displayAuthorize: 'none',
              displayOne: 'none',
              displayFour: 'inline-block',
              autoStart: 'inline-block',
            });
            that.refs.autoStart.countDown();
          }
        }
        data.ReturnEntity.Status = '未开启';
      } else if ( data.ReturnEntity.Status === 2 ) {
        if ( data.ReturnEntity.IsAllowDelayExam ) { //统一设置是否允许考场延长时长
          if ( data.ReturnEntity.AutoOpenExam ) {
            that.setState({
              displayPreloading: 'inline-block',
              displayYCKS: 'inline-block',
              displayClose: 'none',   //关闭考试
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoStart: "none",
              autoEnd: "inline-block",  //自动关闭考试
            });
          } else {
            that.setState({
              displayPreloading: 'inline-block',
              displayYCKS: 'inline-block',
              displayClose: 'inline-block',
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoEnd: "none",
            });
          }
        } else {
          if ( data.ReturnEntity.AutoOpenExam ) {
            that.setState({
              displayPreloading: 'inline-block',
              displayYCKS: 'none',
              displayClose: 'none',   //关闭考试
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoStart: "none",
              autoEnd: "inline-block",  //自动关闭考试
            });
          } else {
            that.setState({
              displayPreloading: 'inline-block',
              displayYCKS: 'none',
              displayClose: 'inline-block',
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoEnd: "none",
            });
          }
        }
        if ( data.ReturnEntity.IsAllowReexamination ) { //统一设置是否允许重考
          if ( data.ReturnEntity.AutoOpenExam ) {
            that.setState({
              displayPreloading: 'inline-block',
              displayCk: 'inline-block',
              displayClose: 'none',   //关闭考试
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoStart: "none",
              autoEnd: "inline-block",  //自动关闭考试
            });
          } else {
            that.setState({
              displayPreloading: 'inline-block',
              displayCk: 'inline-block',
              displayClose: 'inline-block',
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoEnd: "none",
            });
          }
        } else {
          if ( data.ReturnEntity.AutoOpenExam ) {
            that.setState({
              displayPreloading: 'inline-block',
              displayCk: 'none',
              displayClose: 'none',   //关闭考试
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoStart: "none",
              autoEnd: "inline-block",  //自动关闭考试
            });
          } else {
            that.setState({
              displayPreloading: 'inline-block',
              displayCk: 'none',
              displayClose: 'inline-block',
              displayFour: 'inline-block',
              displayThree: 'none',
              remainingTime: "inline-block",
              autoEnd: "none",
            });
          }
        }
        data.ReturnEntity.Status = '正在考试';
        that.refs.getSwordButton.countDown();
      } else if ( data.ReturnEntity.Status === 3 ) {
        if ( data.ReturnEntity.IsNeedAuthorizationReOpen && data.ReturnEntity.AutoOpenExam === false ) {
          that.setState({
            displayPreloading: 'none',
            displayAuthorizeRestart: "inline-block",
            displayThree: 'inline-block',
            displayFour: 'inline-block',
            datasExport:"inline-block"
          });
        } else if ( data.ReturnEntity.IsNeedAuthorizationReOpen === false && data.ReturnEntity.AutoOpenExam === false ) {
          that.setState({
            displayPreloading: 'none',
            restart: "inline-block",
            displayThree: 'inline-block',
            displayFour: 'inline-block',
            datasExport:"inline-block"
          });
        } else {
          that.setState({
            displayPreloading: 'none',
            displayThree: 'inline-block',
            displayFour: 'inline-block',
            datasExport:"inline-block"
          });
        }
        data.ReturnEntity.Status = '已关闭';
      } else if ( data.ReturnEntity.Status === 4 ) {
        that.setState({
          displayPreloading: 'none',
          displayFour: 'inline-block',
          displayOne: 'none',
          displayThree: 'inline-block',
          datasExport:"inline-block"
        });
        data.ReturnEntity.Status = '已上传';
      } else if ( data.ReturnEntity.Status === 5 ) {
        that.setState({
          displayPreloading: 'none',
          displayFour: 'inline-block',
          displayOne: 'none',
          displayThree: 'inline-block',
          datasExport:"inline-block"
        });
        data.ReturnEntity.Status = '已导出';
      }
      if ( data.ReturnEntity.ExamType === 1 ) {
        data.ReturnEntity.ExamType = '正式考试'
      } else if ( data.ReturnEntity.ExamType === 2 ) {
        data.ReturnEntity.ExamType = '模拟考试'
      } else if ( data.ReturnEntity.ExamType === 3 ) {
        data.ReturnEntity.ExamType = '所有考试'
      }
      for ( let i = 0; i < data.ReturnEntity.ExamCourses.length; i++ ) {
        subject.push(data.ReturnEntity.ExamCourses[ i ].CourseName)
      }
      that.state.course = subject.join("、");
      that.setState({
        LeftTimeLength: data.ReturnEntity.LeftTimeLength,
        RemindTimeLength: data.ReturnEntity.RemindTimeLength,
        ExamSceneName: data.ReturnEntity.ExamSceneName,
        ExamCourses: data.ReturnEntity.ExamCourses,
        ExamInstruction: data.ReturnEntity.ExamInstruction,
        ExamType: data.ReturnEntity.ExamType,
        TimeLength: Math.floor(data.ReturnEntity.TimeLength / 60) + "分钟",
        ExamTime: data.ReturnEntity.ExamTime,
        MissExamTimeLength: data.ReturnEntity.MissExamTimeLength,
        IsNeedAuthorization: data.ReturnEntity.IsNeedAuthorization,
        Status: data.ReturnEntity.Status,
        AutoOpenExam: data.ReturnEntity.AutoOpenExam,
        AutoOpenTimeLength: data.ReturnEntity.AutoOpenTimeLength,
        IsAllowReexamination: data.ReturnEntity.IsAllowReexamination,
        IsAllowDelayExam: data.ReturnEntity.IsAllowDelayExam,
      });
    });
  };
  explainCancelVisible = () => { //开启考试判断后台返回状态
    this.setState({explainVisible: false});
    window.location.reload();
  };
  explainCancelVisibleAuthorize = () => { //授权开考判断后台返回状态
    this.setState({explainVisibleAuthorize: false});
    window.location.reload();
  };
  explainCancelVisibleClose = () => { //关闭考试判断后台返回状态
    this.setState({explainVisibleClose: false});
    window.location.reload();
  };
  explainCancelVisibleUP = () => { //答卷数据上传判断后台返回状态
    this.setState({explainVisibleUP: false});
    window.location.reload();
  };
  onExamComplete = () => { //考试完成
    this.setState({
      visibleTime: true,
    });
  };
  handleCancelTime = () => {  //考试完成弹框关闭
    this.setState({
      visibleTime: false,
    });
  };
  handleCancelFive = () => {  //考试即将完成完成弹框关闭
    this.setState({
      visibleFive: false,
    });
  };
  /**
   * 考试即将完成
   */
  onExamBound = () => {
    this.setState({
      visibleFive: true,
    });
  };
  /**
   * 所有弹框
   */
  handleCancelStart = () => { //点击关闭开启考试提示框
    this.setState({
      visibleStart: false,
    });
  };
  showModalClose = () => { //关闭考试
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    let that = this;
    service.QueryExamingCount({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then(function (data) {
      layer.close(loading);
      that.setState({ReturnEntity: data.ReturnEntity});
    });
    this.setState({
      visibleClose: true,
    });
  };
  handleCancelClose = () => { //点击关闭关闭考试
    this.setState({
      visibleClose: false,
    });
  };
  cancelClose = () => {  //确定关闭考试
    let that = this;
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    service.CloseExam({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then(function (data) {
      layer.close(loading);
      if ( data.ReturnEntity === 1 ) {
        that.setState({visibleClose: false});
        window.location.reload();
      } else if ( data.ReturnEntity === 2 ) {
        that.setState({
          visibleClose: false,
          explainVisibleClose: true,
          explainClose: '已关闭的考试勿重复关闭！'
        });
      } else if ( data.ReturnEntity === 3 ) {
        that.setState({
          visibleClose: false,
          explainVisibleClose: true,
          explainClose: '考试未开启！'
        });
      } else if ( data.ReturnEntity === 0 ) {
        that.setState({
          visibleClose: false,
          explainVisibleClose: true,
          explainClose: '关闭考试失败！'
        });
      }
    });
  };
  closeTest = () => {
  };
  openNotificationTest = () => {
    if ( this.state.AutoOpenExam === true ) {  //自动关闭考试
      this.setState({
        autoCloseVisible: true
      })
    } else {   //手动开启考试结束
      const key = `open${Date.now()}`;
      notification.open({
        description: <p>本场考试已结束，请及时关闭考试并收卷！</p>,
        duration: null,
        placement: 'bottomRight',
        btn: <Button type="primary" onClick={() => notification.close(key)}>关闭</Button>,
        key,
        onClose: this.closeTest,
      });
    }
  };
  autoCancelVisible = () => {  //自动开考提醒框
    this.setState({
      autoVisible: false,
    });
  };
  autoCloseCancelVisible = () => {  //自动关闭提示框
    this.setState({autoCloseVisible: false});
    window.location.reload()
  };
  autoStart = () => {  //自动开启时间为0时调用开启方法
    let that = this;
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    service.AutoOpenExam({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then(function (data) {
      layer.close(loading);
      if ( data.ReturnEntity === 1 ) {
        that.setState({
          visibleStartTest: false,
          remainingTime: "inline-block",
          displayOne: 'none',
          autoVisible: true,
          autoExamExplain: '本场考试已自动开启，请提醒考生开始考试!'
        });
        setTimeout(() => {
          that.GetExamInfo()  //重新渲染信息数据
        }, 1000);
        //that.refs.getSwordButton.countDown();
      } else if ( data.ReturnEntity === 0 ) {
        that.setState({
          autoVisible: true,
          autoExamExplain: '自动开启失败!'
        })
      }
    });
  };
  showModalStartTest = () => {  //确定开启考试
    this.setState({
      visibleStartTest: true,
    });
  };
  handleCancelStartTest = () => {  //点击关闭确定开启考试
    this.setState({
      visibleStartTest: false,
    });
  };
  sureExam = () => {    //确定开考
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    let that = this;
    service.OpenExam({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then(function (data) {
      layer.close(loading);
      if ( data.ReturnEntity === 1 ) {
        that.setState({
          visibleStartTest: false,
          remainingTime: "inline-block",
          displayOne: 'none',
        });
        setTimeout(() => {
          that.GetExamInfo()  //重新渲染信息数据
        }, 1000);
        that.refs.getSwordButton.countDown();
      } else if ( data.ReturnEntity === 2 ) {
        that.setState({
          visibleStartTest: false,
          explainVisible: true,
          explain: '系统检测到你有其他场次未关闭，请先关闭后再开启！'
        });
      } else if ( data.ReturnEntity === 0 ) {
        that.setState({
          visibleStartTest: false,
          explainVisible: true,
          explain: '开启失败！'
        });
      }
    });
  };
  showModal = () => {   //确定授权开考
    this.setState({visible: true});
  };
  handleCancel = () => {  //点击关闭授权开考
    this.setState({visible: false});
  };
  showModalUpLoad = () => { //查询答卷数据上传
    let that = this;
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    service.QueryUploadCount({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then(function (data) {
      layer.close(loading);
      that.setState({Courses: data.ReturnEntity.Courses});
    });
    this.setState({
      visibleUpLoad: true,
    });
  };
  handleCancelUpLoad = () => { //点击关闭答卷数据上传
    this.setState({
      visibleUpLoad: false,
    });
  };
  jumpReturn = () => {  //点击返回
    urlHelper.jump({
      path: '/onlineExamTeacher/examSceneList.html',
      search: urlHelper.setSearchParam({
        type: 1,
      })
    });
  };
  UploadExamData = () => {  //答卷数据上传接口
    this.setState({
      explainVisibleUP: true,
      visibleUpLoad: false,
      uploadData: "block"
    });
    cef.uploadExamSceneData(query.examSceneId)
  };
  close = () => {        //考试剩余时间提示框
  };
  openNotification = () => {
    const key = `open${Date.now()}`;
    notification.open({
      description: <p>本场考试还剩余<span style={{color: '#fd3131'}}>{Math.floor(this.state.RemindTimeLength / 60)}</span>分钟，请提醒考生尽快作答！
      </p>,
      duration: null,
      placement: 'bottomRight',
      btn: <Button type="primary" onClick={() => notification.close(key)}>关闭</Button>,
      key,
      onClose: this.close,
    });
  };
  //预加载按钮
  preloading = () => {
    this.setState({
      visiblePreloading: true,
      disabledState: true,
    }, () => {
      service.LoadBasicData({
        payload: {
          "ExamSceneId": query.examSceneId
        }
      }).then((data) => {
        if ( data.ReturnEntity === 1 ) {
          layer.msg('操作成功', {icon: 1, time: 1000});
        } else {
          layer.msg('操作失败', {icon: 2, time: 2000});
        }
        this.setState({disabledState: false, visiblePreloading: false,})
      })
    });
  };
  //关闭预加载弹框
  cancelAuthorize = () => {
    this.setState({visiblePreloading: false})
  }
  //  授权开考逻辑
  showModalAuthorize = () => {
    this.setState({visibleAuthorize: true});
  };
  handleCancelAuthorize = () => {
    this.setState({visibleAuthorize: false});
  };

  handleCreateAuthorize = () => {
    const form = this.formAu;
    form.validateFields((err, values) => {
      if ( err ) {
        return;
      }
      //form.resetFields();
      let loading = layer.msg('加载中', {
        icon: 16, shade: 0.3
      });
      let that = this;
      service.AuthorizeStartExam({
        payload: {
          "ExamSceneId": query.examSceneId,
          "AuthorizationCode": values.codes
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity === 1 ) {
          that.setState({
            displayAuthorize: 'none',
            visibleAuthorize: false,
            remainingTime: "inline-block",
          });
          /* setTimeout(function () {
             that.GetExamInfo();  //重新渲染信息数据
           }, 1000);*/
          window.location.reload();
          that.refs.getSwordButton.countDown();
        } else if ( data.ReturnEntity === 2 ) {
          that.setState({
            visibleAuthorize: false,
            explainVisibleAuthorize: true,
            explainAuthorize: '系统检测到你有其他场次未关闭，请先关闭后再开启！'
          });
        } else if ( data.ReturnEntity === 0 ) {
          that.setState({
            visibleAuthorize: false,
            explainVisibleAuthorize: true,
            explainAuthorize: '授权开启失败！'
          });
        } else if ( data.ReturnEntity === 3 ) {
          that.setState({
            displayVerify: "提示：该授权码无效，请重新输入！"
          });
        }
      });
    });
  };
  hiddenNoticeAu = () => {  //获取焦点时隐藏错误提示信息
    this.setState({
      displayVerify: ""
    });
  };
  saveFormRef = (form) => {
    this.formAu = form;
  };
  saveFormRefs = (form) => {
    this.form = form;
  };
  refresh = () => { //页面刷新
    window.location.reload()
  };
  handleCancelRestart = () => {  //关闭重新开启确定弹框
    this.setState({
      visibleRestart: false
    })
  };
  RestartCancelVisible = () => {  //重新开启后台返回状态显示
    this.setState({
      explainVisibleRestart: false
    });
    window.location.reload()
  };
  showModalRestart = () => {   //打开重新开启确定弹框
    this.setState({
      visibleRestart: true
    })
  };

  restartExam = () => {    //重新开考
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    let that = this;
    service.ReOpen({
      payload: {
        "ExamSceneId": query.examSceneId,
        "AuthorizationCode": ""
      }
    }).then(function (data) {
      layer.close(loading);
      if ( data.ReturnEntity === 1 ) {
        that.setState({
          visibleRestart: false,
          remainingTime: "inline-block",
          restart: 'none',
        });
        //that.GetExamInfo()  //重新渲染信息数据
        window.location.reload();
        that.refs.getSwordButton.countDown();
      } else if ( data.ReturnEntity === 2 ) {
        that.setState({
          visibleRestart: false,
          explainVisibleRestart: true,
          Restartexplain: '请使用授权码进行开启！'
        });
      } else if ( data.ReturnEntity === 3 ) {
        that.setState({
          visibleRestart: false,
          explainVisibleRestart: true,
          Restartexplain: '授权码无效！'
        });
      } else if ( data.ReturnEntity === 4 ) {
        that.setState({
          visibleRestart: false,
          explainVisibleRestart: true,
          Restartexplain: '系统检测到你有其他场次未关闭，请先关闭后再开启！'
        });
      } else if ( data.ReturnEntity === 5 ) {
        that.setState({
          visibleRestart: false,
          explainVisibleRestart: true,
          Restartexplain: '自动开启模式，无法重新开启考试！'
        });
      } else if ( data.ReturnEntity === 0 ) {
        that.setState({
          visibleRestart: false,
          explainVisibleRestart: true,
          Restartexplain: '开启失败！'
        });
      }
    });
  };
  showModalLeng = () => { //授权重新开启
    this.setState({visibleLeng: true});
  };
  RestartexplainCancelVisible = () => { //判断后台返回状态
    this.setState({VisibleRestart: false});
    window.location.reload();
  };
  handleCancelLeng = () => {  //授权重新开启
    this.setState({visibleLeng: false});
  };
  handleCreateLeng = () => {   // 确定授权重新开启
    const form = this.form;
    form.validateFields((err, values) => {
      if ( err ) {
        return;
      }
      //form.resetFields();
      let loading = layer.msg('加载中', {
        icon: 16, shade: 0.3
      });
      let that = this;
      service.ReOpen({
        payload: {
          "ExamSceneId": query.examSceneId,
          "AuthorizationCode": values.restartCode
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity === 1 ) {
          that.setState({
            visibleLeng: false,
            remainingTime: "inline-block",
            displayAuthorizeRestart: "none"
          });
          //that.GetExamInfo()  //重新渲染信息数据
          window.location.reload();
          that.refs.getSwordButton.countDown()
        } else if ( data.ReturnEntity === 2 ) {
          that.setState({
            visibleLeng: false,
            VisibleRestart: true,
            Restartexplain: '请使用授权码进行开启！'
          });
        } else if ( data.ReturnEntity === 3 ) {
          if ( values.restartCode === undefined || values.restartCode === '' ) {
            that.setState({
              RestartVerify: '',
            });
          } else {
            that.setState({
              RestartVerify: "授权码无效！"
            });
          }
        } else if ( data.ReturnEntity === 4 ) {
          that.setState({
            visibleLeng: false,
            VisibleRestart: true,
            Restartexplain: '系统检测到你有其他场次未关闭，请先关闭后再开启！'
          });
        } else if ( data.ReturnEntity === 5 ) {
          that.setState({
            visibleLeng: false,
            VisibleRestart: true,
            Restartexplain: '自动开启模式，无法重新开启考试！'
          });
        } else if ( data.ReturnEntity === 0 ) {
          that.setState({
            visibleLeng: false,
            VisibleRestart: true,
            Restartexplain: '开启失败！'
          });
        }
      });
    });
  };
  hiddenNotice = () => {  //获取焦点时隐藏错误提示信息
    this.setState({
      RestartVerify: ""
    });
  };
  dataExport = () => { //答卷数据导出
    let that=this;
    let loading = layer.msg('正在导出...', {
      icon: 16,
      shade: 0.3,
      time: 0
    });
    service.ExportExamSceneData({
      payload: {
        "ExamSceneId": query.examSceneId,
      }
    }).then((response) => {
      layer.close(loading);
      if ( response.ReturnEntity === 0 ) {
        layer.msg('导出失败', {icon: 2, time: 2000});
      } else {
        DownloadFile(response);
        setTimeout(function () {
          that.GetExamInfo();  //重新渲染信息数据
        }, 1000);
      }
    })
  };
  /**
   * tab逻辑
   */
  leave = (value) => {
    if (!value) {
      this.setState({
        key: "99"
      })
    }
  }
  //显示默认tab
  activeKey = (activeKey) => {
    this.setState({
      active: activeKey,
      key: activeKey,
    })
  }
  render() {
    const {uploadDataProgress} = this.state;
    let Courses = this.state.Courses;
    return (
      <div className={classnames(style.detailsHeads, "header")}>
        <div>
          <Breadcrumb className={style.bread}>
            <Breadcrumb.Item style={{color: '#4d4d4d'}}>考试场次</Breadcrumb.Item>
            <Breadcrumb.Item style={{color: '#1a1a1a'}}>考试详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.countdown}>
          <div style={{width: "160px", display: this.state.remainingTime, float: 'left'}}>
            <span>剩余时间:
              {
                this.state.RemindTimeLength !== undefined ?
                  <CountDown ref="getSwordButton"
                             count={this.state.LeftTimeLength}
                             onComplete={this.openNotificationTest}
                             bound={parseInt(this.state.RemindTimeLength)}
                             onBound={this.openNotification}/> : null
              }
            </span>
          </div>
          <div style={{float: 'right', marginRight: '5px'}}>
            {/*预加载弹框*/}
            <div style={{ display: 'inline-block' }}>
              <Button style={{ display: this.state.displayPreloading }} type="primary" disabled={this.state.disabledState}
                onClick={this.preloading}>预加载考试数据</Button>
              <Modal
                title="预加载提示"
                wrapClassName="vertical-center-modal"
                visible={this.state.visiblePreloading}
                footer={<button onClick={this.cancelAuthorize} type="button"
                  className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
              >
                <p>正在加载考试数据，预计等待2分钟，请稍后。</p>
              </Modal>
            </div>
            <Button disabled style={{display: this.state.autoStart, margin: '0 6px'}}>自动开启
              <CountDownTime
                ref="autoStart"
                count={this.state.AutoOpenTimeLength}
                onComplete={this.autoStart}/>
            </Button>
            <Modal
              title="提示"
              wrapClassName="vertical-center-modal"
              onCancel={this.autoCancelVisible}
              visible={this.state.autoVisible}
              footer={<button onClick={() => this.autoCancelVisible(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>{this.state.autoExamExplain}</p>
            </Modal>
            <Button type="primary" onClick={() => this.showModalStartTest(true)}
                    style={{display: this.state.displayOne}}>开启考试</Button>
            <Modal
              title="开启考试"
              wrapClassName="vertical-center-modal"
              visible={this.state.visibleStartTest}
              onOk={this.sureExam}
              onCancel={() => this.handleCancelStartTest(false)}>
              <p>确定要开启本场考试吗？</p>
            </Modal>
            <Modal
              title="开启考试"
              wrapClassName="vertical-center-modal"
              onCancel={this.explainCancelVisible}
              visible={this.state.explainVisible}
              footer={<button onClick={() => this.explainCancelVisible(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>{this.state.explain}</p>
            </Modal>
            {/*授权开考弹框*/}
            {/*<AuthorizeExam displayAuthorize={this.state.displayAuthorize}/>*/}
            <div style={{display: 'inline-block'}}>
              <Button style={{display: this.state.displayAuthorize}} type="primary"
                      onClick={() => this.showModalAuthorize(true)}>授权开启</Button>
              <Authorize displayVerify={this.state.displayVerify}
                         ref={this.saveFormRef}
                         visible={this.state.visibleAuthorize}
                         onCancel={this.handleCancelAuthorize}
                         onCreate={this.handleCreateAuthorize}
                         hiddenNoticeAu={this.hiddenNoticeAu}
              />
              <Modal
                title="授权开启"
                wrapClassName="vertical-center-modal"
                onCancel={this.explainCancelVisibleAuthorize}
                visible={this.state.explainVisibleAuthorize}
                footer={<button onClick={() => this.explainCancelVisibleAuthorize(false)} type="button"
                                className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
              >
                <p>{this.state.explainAuthorize}</p>
              </Modal>
            </div>
            <Button disabled style={{display: this.state.autoEnd, margin: '0 6px'}}>自动关闭</Button>
            <Modal
              title="提示"
              wrapClassName="vertical-center-modal"
              onCancel={this.autoCloseCancelVisible}
              visible={this.state.autoCloseVisible}
              footer={<button onClick={() => this.autoCloseCancelVisible(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>本场考试已自动关闭，请及时收卷！</p>
            </Modal>
            <Button type="primary" onClick={() => this.showModalClose(true)}
                    style={{display: this.state.displayClose}}>关闭考试</Button>
            <Modal
              title="关闭考试"
              wrapClassName="vertical-center-modal"
              visible={this.state.visibleClose}
              onOk={this.cancelClose} onCancel={() => this.handleCancelClose(false)}>
              <p>当前考试还有<span className={style.hasStudent}>{this.state.ReturnEntity}</span>名考生正在考试，确定要关闭本场考试吗？
              </p>
              <p>关闭后考生将无法继续作答</p>
            </Modal>
            <Modal
              title="关闭考试"
              wrapClassName="vertical-center-modal"
              onCancel={this.explainCancelVisibleClose}
              visible={this.state.explainVisibleClose}
              footer={<button onClick={() => this.explainCancelVisibleClose(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>{this.state.explainClose}</p>
            </Modal>
            <Extension displayYCKS={this.state.displayYCKS}/>
            <Reexamine displayCk={this.state.displayCk}/>
            <Button type="primary" style={{display: this.state.restart}}
                    onClick={() => this.showModalRestart(true)}>重新开启</Button>
            <Modal
              title="重新开启考试"
              wrapClassName="vertical-center-modal"
              visible={this.state.visibleRestart}
              onOk={this.restartExam}
              onCancel={() => this.handleCancelRestart(false)}>
              <p>该场次已关闭，请确定要重新开启该考试场次吗？</p>
              <p>开启后，所有的考生将允许继续答题。</p>
            </Modal>
            <Modal
              title="重新开启考试"
              wrapClassName="vertical-center-modal"
              onCancel={this.explainCancelVisible}
              visible={this.state.explainVisibleRestart}
              footer={<button onClick={() => this.RestartCancelVisible(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>{this.state.Restartexplain}</p>
            </Modal>
            {/* <Button type="primary" onClick={() => this.showModalLeng(true)}
              style={{ display: this.state.displayAuthorizeRestart }}>预加载考试数据</Button> */}
            <Button type="primary" onClick={() => this.showModalLeng(true)}
                    style={{display: this.state.displayAuthorizeRestart}}>授权重新开启</Button>
            <AuthorizeRestart RestartVerify={this.state.RestartVerify}
                              ref={this.saveFormRefs}
                              visible={this.state.visibleLeng}
                              onCancel={this.handleCancelLeng}
                              onCreate={this.handleCreateLeng}
                              hiddenNotice={this.hiddenNotice}
            />
            <Modal
              title="授权重新开启"
              wrapClassName="vertical-center-modal"
              onCancel={this.RestartexplainCancelVisible}
              visible={this.state.VisibleRestart}
              footer={<button onClick={() => this.RestartexplainCancelVisible(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <p>{this.state.Restartexplain}</p>
            </Modal>
            <Button type="primary" onClick={() => this.showModalUpLoad(true)}
                    style={{display: this.state.displayThree}}>答卷数据上传</Button>
            <Modal
              title="答卷数据上传"
              wrapClassName="vertical-center-modal"
              visible={this.state.visibleUpLoad}
              onOk={this.UploadExamData} onCancel={() => this.handleCancelUpLoad(false)}>
              <p>请确定本场考试答卷数据是否完整</p>
              {
                Courses.map((item, index) => {
                  return <p style={{letterSpacing: '1px'}}>{item.CourseName}：机考<span
                    style={{color: '#fd3131'}}>{item.MachineUploadCount}</span>/{item.MachineCount},纸质<span
                    style={{color: '#fd3131'}}>{item.PaperCount}</span>/{item.PaperUploadCount}</p>
                })
              }
            </Modal>
            <Modal
              title="答卷数据上传"
              wrapClassName="vertical-center-modal"
              onCancel={this.explainCancelVisibleUP}
              visible={this.state.explainVisibleUP}
              footer={<button onClick={() => this.explainCancelVisibleUP(false)} type="button"
                              className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
            >
              <div className={style.dataBox} style={{display: this.state.uploadData}}>
                <h4>正在上传数据</h4>
                <Progress percent={uploadDataProgress} strokeColor={"#1383f2"}/>
              </div>
            </Modal>
            <Button type="primary" onClick={this.dataExport} style={{display: this.state.datasExport}}>答卷数据导出</Button>
            <Button type="primary" onClick={this.refresh}>刷新</Button>
            <Button type="primary" onClick={this.jumpReturn} style={{display: this.state.displayFour}}>返回</Button>
          </div>
        </div>
        <div className={style.testSession}>
          <div className={style.testLeft}>
            <div>
              <span>考试场次：</span>
              <div className={style.boldFont}>{this.state.ExamSceneName}</div>
            </div>
            <div style={{margin: '16px 0'}}>
              <span style={{textAlign: "center", width: '100px'}}><span>科</span><span
                style={{marginLeft: "28px"}}>目：</span></span>
              <div className={style.boldFont}>{this.state.course}</div>
            </div>
          </div>
          <div className={style.testCenter}>
            <div>
              <span>考试类型：</span>
              <div className={style.boldFont}>{this.state.ExamType}</div>
            </div>
            <div style={{margin: '16px 0'}}>
              <span className={style.fixWidth}><span>时</span><span
                style={{marginLeft: "28px"}}>长：</span></span>
              <div className={style.boldFont}>{this.state.TimeLength}</div>
            </div>
          </div>
          <div className={style.testRight}>
            <div>
              <span>考试时间：</span>
              <div className={style.boldFont}>{this.state.ExamTime}</div>
            </div>
            <div style={{margin: '16px 0'}}>
              <span className={style.fixWidth}><span>状</span><span
                style={{marginLeft: "28px"}}>态：</span></span>
              <div className={style.status}>{this.state.Status}</div>
            </div>
          </div>
          <div style={{paddingBottom: '16px'}}>
            <span>考试说明：</span>
            <div
              style={{display: 'inline-block', color: '#1a1a1a', marginLeft: '10px'}}>{this.state.ExamInstruction}</div>
          </div>
        </div>
        <div className={classnames(style.tabsChange, "headerTab")}>
          <Tabs type="card" onChange={this.activeKey} activeKey={this.state.active}>
            {this.state.ExamCourses.map((item, index) => {
              return <TabPane tab={item.CourseName} key={index}><TasksList IsAllowDelayExam={this.state.IsAllowDelayExam} IsAllowReexamination={this.state.IsAllowReexamination} CourseId={this.state.ExamCourses[index].CourseId} /></TabPane>
            })}
            <TabPane tab="监考记录" key='5'><InvigilatorRecord reload={this.state.key} CourseName={this.state.ExamCourses} leaveTab={this.leave} /></TabPane>
            <TabPane tab="缺考表" key='6'><ExamSheet reload={this.state.key} MissExamTimeLength={this.state.MissExamTimeLength} leaveTab={this.leave} /></TabPane>
            <TabPane tab="答卷数据" key='7'><AnswerData reload={this.state.key} leaveTab={this.leave} /></TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default DetailsHead;

