import React from "React";
import {Button, Modal, Select, Breadcrumb, Form, Input, Radio, Icon, Layout} from "antd";
import style from "./queryStudentPassword.less";
import UrlHelper from "js-url-helper";
import * as service from "../../services/detailsServices";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";
import defaultImg from "../../assets/images/data-null.png";

const {Content} = Layout;
const urlHelper = new UrlHelper(location);
const FormItem = Form.Item;
const Option = Select.Option;

class DataNull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '未查询到该考生数据',
      imgUrl: this.props.imgUrl || defaultImg
    }
  }

  render() {
    let data = this.props.data;
    return (
      data === null ? (
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

class CheckLengthen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      explain: '',
      CourseNames: [],
      UserFace: '',
      UserTrueName: '',
      UserSex: '',
      StudentCode: '',
      CardNo: '',
      CourseName: '',
      ExamScene: '',
      SeatNumber: '',
      Password: '',
      studentInformation: 'none',
      ReturnEntity: [],
      value: ''
    };
    let that = this;
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3
    });
    service.QueryCourses({
      payload: {}
    }).then(function (data) {
      layer.close(loading);
      that.setState({
        CourseNames: data.ReturnEntity
      });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if ( !err ) {
        let that = this;
        let loading = layer.msg('加载中', {
          icon: 16, shade: 0.3
        });
        service.FindPassword({
          payload: {
            "CardNo": values.IdNumber,
            "CourseId": values.subject
          }
        }).then(data => {
          layer.close(loading);
          that.setState({
            ReturnEntity: data.ReturnEntity,
            studentInformation: 'block',
          },);
          if ( data.ReturnEntity ) {
            that.setState({
              UserFace: data.ReturnEntity.UserFace,
              UserTrueName: data.ReturnEntity.UserTrueName,
              UserSex: data.ReturnEntity.UserSex,
              StudentCode: data.ReturnEntity.StudentCode,
              CardNo: data.ReturnEntity.CardNo,
              CourseName: data.ReturnEntity.CourseName,
              ExamScene: data.ReturnEntity.ExamScene,
              SeatNumber: data.ReturnEntity.SeatNumber,
              Password: data.ReturnEntity.Password,
            })
          }
        });
      }
    });
  };
  onChange = (e) => {
    this.state.value = e.target.value;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <div>
          <Breadcrumb className={style.bread}>
            <Breadcrumb.Item style={{color: '#4d4d4d'}}>首页</Breadcrumb.Item>
            <Breadcrumb.Item style={{color: '#1a1a1a'}}>查询考生信息</Breadcrumb.Item>
          </Breadcrumb>
          {/*<div className={style.query}>
                  <Lengthen
                    ref={this.saveFormRef}
                  />
                </div>*/}
          <div className={style.queryIfo}>
            <Form onSubmit={this.handleSubmit}>
              <div className={style.vertical}>
                <FormItem label="">
                  {getFieldDecorator('IdNumber', {
                      rules: [ {
                        required: true,
                        message: '请输入身份证号！'
                      }, {pattern: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/, message: '输入的身份证号码不合法！'} ],
                    },
                  )(
                    <Input placeholder="请输入身份证号" className={style.idNumber} onChange={(e) => this.onChange(e)}/>
                  )}
                </FormItem>
                 </div>
                <div className={style.vertical}>
                <FormItem>
                  {getFieldDecorator('subject', {
                    rules: [ {required: true, message: '请选择学科！'} ],
                  })(
                    <Select placeholder="请选择" style={{width: "130px"}}>
                      {this.state.CourseNames.map((item, index) => <Option
                        value={item.CourseId}>{item.CourseName}</Option>)}
                    </Select>
                  )}
                </FormItem>
              </div>
              <div className={style.check}>
              <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    查询
                  </Button>
              </FormItem>
              </div>
            </Form>
          </div>
          {
            this.state.ReturnEntity !== null ? (
              <div className={style.studentIfo} style={{display: this.state.studentInformation}}>
                <div className={style.information}>考生信息</div>
                <div className={style.studentDetail}>
                  <img src={this.state.UserFace} style={{width: '82px', height: '110px'}}/>
                </div>
                <div className={style.name}>
                  <div>姓<span style={{paddingLeft: '28px'}}>名：</span><span>{this.state.UserTrueName}</span></div>
                  <div>性<span style={{paddingLeft: '28px'}}>别：</span><span>{this.state.UserSex}</span></div>
                  <div>准考证号：<span>{this.state.StudentCode}</span></div>
                  <div>身份证号：<span>{this.state.CardNo}</span></div>
                  <div>学<span style={{paddingLeft: '28px'}}>科：</span><span>{this.state.CourseName}</span></div>
                  <div>考<span style={{paddingLeft: '28px'}}>场：</span><span>{this.state.ExamScene}</span></div>
                  <div><span style={{letterSpacing: "6px"}}>座位号:</span><span>{this.state.SeatNumber}</span></div>
                  <div>登陆密码：<span>{this.state.Password}</span></div>
                </div>
              </div>
            ) : (<DataNull data={this.state.ReturnEntity}/>)}
        </div>
      </div>
    );
  }
}

const ACheckLengthen = Form.create()(CheckLengthen);

ReactDOM.render((
  <div>
    <Header/>
    <Layout className={"teacher-layout h-all"}>
      <SiderNav/>
      <Layout className={style.layoutBox}>
        <Content className={style.hello}>
          <ACheckLengthen/>
        </Content>
      </Layout>
    </Layout>
    <Footer/>
  </div>
), document.getElementById('main'));
