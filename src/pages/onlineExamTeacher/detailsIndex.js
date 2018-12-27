import ReactDOM from 'ReactDOM';
import style from "./detailsIndex.less";
import {Skeleton, Switch, Card, Icon, Avatar, Button, Layout} from 'antd';
import * as service from "../../services/commonServices";
import * as serviceI from "../../services/detailsServices";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";
import UrlHelper from "js-url-helper";
import defaultImg from "../../assets/images/data-null.png";

let dataNullBox = {
  marginTop: '130px',
  width: '100%',
  textAlign: 'center',
};
let dataNullBoxP = {
  paddingLeft: '10px',
  paddingTop: '2px',
  color: '#b3b3b3'
};
const urlHelper = new UrlHelper(location);
const localStorage = window.localStorage;
const {Meta} = Card;
const {Content} = Layout;
//获取当前时间
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
if ( month < 10 ) {
  month = "0" + month;
}
if ( day < 10 ) {
  day = "0" + day;
}
let nowDate = year + "-" + month + "-" + day;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IsMockTest: true,
      content: null,
      ExamSceneId: "",
      downloadTime: "",
      IsAllowStudentLogin: true,
      IsSeatingPlanEnabled: "",
      description: "设置，解锁座位",
      cursor:"",
      ReturnEntity:null
    };
    service.GetExamIndexInfo({
      payload: {}
    }).then((data) => {
      this.setState({
        ReturnEntity:data.ReturnEntity,
        IsSeatingPlanEnabled: data.ReturnEntity.IsSeatingPlanEnabled,
        IsMockTest: data.ReturnEntity.IsMockTest,
        IsAllowStudentLogin: data.ReturnEntity.IsAllowStudentLogin,
        content: data.ReturnEntity.ExaminationList,
      });
      if ( data.ReturnEntity.IsSeatingPlanEnabled === 1 ) {
        this.setState({
          description: "设置，解锁座位",
          cursor:'pointer'
        });
      }else if ( data.ReturnEntity.IsSeatingPlanEnabled === 0 ) {
        this.setState({
          description: "座位表已禁用",
          cursor:'not-allowed'
        });
      }
    });
    serviceI.QueryDownloadData({
      payload: {}
    }).then((data) => {
      this.setState({
        downloadTime: data.ReturnEntity.LastTimeDownloaded || "无"
      })
    });
  }
  //导航跳转
  jump = (ExamSceneId) => {
    urlHelper.jump({
      path: '/onlineExamTeacher/testDetails.html',
      search: urlHelper.setSearchParam({
        examSceneId: ExamSceneId,
      })
    })
  }
  //顶部导航跳转
  jumpdownload = (param) => {
    let that = this;
    switch (param) {
      case 1:
        urlHelper.jump({
          path: '/onlineExamTeacher/dataDownload.html',
        });
        break;
      case 2:
        urlHelper.jump({
          path: '/onlineExamTeacher/setStudentLogin.html',
        });
        break;
      case 3:
        if ( that.state.IsSeatingPlanEnabled === 1||that.state.ReturnEntity===null ) {
          urlHelper.jump({
            path: '/onlineExamTeacher/seatList.html',
          })
        } else if ( that.state.IsSeatingPlanEnabled === 0 ) {
          return
        }
        break;
      case 4:
        urlHelper.jump({
          path: '/onlineExamTeacher/clearData.html',
        });
        break;
    }
  };
  //显示考试状态
  staues = (Status) => {
    switch (Status) {
      case 1:
        return "未开启"
      case 2:
        return <span className={"font-wrong"}>正在考试</span>
      case 3:
        return "已关闭"
      case 4:
        return "已上传"
      case 5:
        return "已导出"
    }
  }
  //按钮文字
  button = (Status, ButtonStatus) => {
    if ( Status === 3 ) {
      return "查看"
    }
    else if ( Status === 2 ) {
      return "进入考试"
    }
    else if ( Status === 4 ) {
      return "查看"
    }
    else if (Status === 5) {
      return "查看"
    }
    else if ( Status === 1 && ButtonStatus === 1 ) {
      return "查看"
    }
    else if ( Status === 1 && ButtonStatus === 2 ) {
      return "进入考试"
    }
  }
  //是否允许登录
  allow = () => {
    if ( this.state.IsAllowStudentLogin ) {
      return "允许考试登录"
    } else {
      return "禁止考试登录"
    }
  }

  //显示考试类型
  ExamType = () => {
    if ( this.state.IsMockTest ) {
      return "模拟考试"
    } else if ( this.state.IsMockTest == false ) {
      return "正式考试"
    } else {
      return "无"
    }
  }

  render() {
    const {loading} = this.state;
    return (
      <div className={style.content}>
        <Header/>
        <Layout className={"teacher-layout h-all"}>
          <SiderNav/>
          <Layout className={style.layoutBox}>
            <div className={style.margin}>
              <h5 className={style.indexP}>首页</h5>
              <p className={style.indexP}>考试模式：{this.ExamType()}</p>
              <Card style={{width: 230, height: 80}} loading={loading}
                    className={style.fourcard + " " + style.fourcardF} onClick={() => {
                this.jumpdownload(1)
              }} hoverable>
                <Meta
                  avatar={<Avatar src="../../assets/images/img_download.png"/>}
                  title="数据下载"
                  description={"上次下载：" + this.state.downloadTime}
                />
              </Card>
              <Card style={{width: 230, height: 80}} loading={loading} className={style.fourcard} onClick={() => {
                this.jumpdownload(2)
              }} hoverable>
                <Meta
                  avatar={<Avatar src="../../assets/images/img_login.png"/>}
                  title="考生登录设置"
                  description={"当前设置：" + this.allow()}
                />
              </Card>
              <Card style={{width: 230, height: 80,cursor:this.state.cursor}} loading={loading} className={style.fourcard} onClick={() => {
                this.jumpdownload(3)
              }} hoverable>
                <Meta
                  avatar={<Avatar src="../../assets/images/img_Seating.png"/>}
                  title="座位表设置"
                  description={this.state.description}
                />
              </Card>
              <Card style={{width: 230, height: 80}} loading={loading} className={style.fourcard} onClick={() => {
                this.jumpdownload(4)
              }} hoverable>
                <Meta
                  avatar={<Avatar src="../../assets/images/img_clear.png"/>}
                  title="数据清除"
                  description="考试前请清除数据"
                />
              </Card>
              <h5 className={style.today}>当天考试场次：({nowDate})</h5>
              {
                this.state.content && this.state.content.length ?
                  (this.state.content.map((item, index) => {
                    const ExamSceneId = item.ExamSceneId;
                    const ButtonStatus = item.ButtonStatus;
                    return (
                      <Card hoverable className={style.content1 + " " + style.content1 + index}
                            style={{width: 310, height: 140}}
                            actions={[ <p className={style.state}>{this.staues(item.Status)}</p>,
                              <Button onClick={() => (this.jump(ExamSceneId))}
                                      type="primary">{this.button(item.Status, ButtonStatus)}</Button> ]}>
                        <Meta
                          style={{width: 310, height: 108}}
                          title={item.ExamSceneName}
                          description={<div><p
                            className={style.contentP}>考试时间：{item.ExamDate + " " + item.ExamTime}</p>
                            <p
                              className={style.null}>时 长：{item.TimeLength / 60}分钟</p> <p className={style.null}>科
                              目：<span
                                className={style.nulls}>{item.CourseList.map((c) => (c.CourseName) + ` `)}</span></p>
                          </div>}
                        />
                      </Card>
                    )
                  })) : (<DataNull data={this.state.content}/>)}
            </div>
          </Layout>
        </Layout>
        <Footer/>
      </div>
    )
  }
}

class DataNull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '今日暂无考试',
      imgUrl: this.props.imgUrl || defaultImg
    }
  }

  render() {
    let data = this.props.data/* || this.props.data === '' ? this.props.data : null*/;
    return (
      <div style={dataNullBox}>
        <div>
          <img src={this.state.imgUrl}/>
          <p style={dataNullBoxP}>{this.state.text}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render((<Index/>), document.getElementById('main'));
