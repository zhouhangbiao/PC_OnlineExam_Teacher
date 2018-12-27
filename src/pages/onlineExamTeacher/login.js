import ReactDOM from "ReactDOM";
import React from "React";
import { Button, Form, Icon, Input, Modal } from "antd";
import UrlHelper from "js-url-helper";
import style from "./login.less";
import * as service from "../../services/commonServices";
import encrypt from "../../utils/encrypt";
const urlHelper = new UrlHelper(location);
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginType: true,
      visible: false,
      content: "",
      systemName: '',
      systemLogo: '',
      terminalName: '',
      copyright: '',
      visibleChange: false,
      newId: '',
      lastId: '',
      password1: '',
      tjm: "",
      token: "",
      username: ""
    };
    this.getSystemInfo();
  }

  /**
   * 获取系统配置信息
   */
  getSystemInfo = () => {
    service.GetSystemInfo({
      payload: {
        FromType: 1 //1教师端，2 考试端
      }
    }).then((data) => {
      if (data.ReturnEntity) {

        this.setState({
          systemName: data.ReturnEntity.SystemName,
          systemLogo: data.ReturnEntity.SystemLogo,
          terminalName: data.ReturnEntity.TerminalName,
          copyright: data.ReturnEntity.Copyright
        });
      }
    })
  };

  toggleLogin = () => {
    this.setState({
      loginType: !this.state.loginType
    })
  };
  showModal1 = () => {
    this.setState({
      visible: true,
      content: "当前系统暂未开放!"
    });
  }
  showModal2 = () => {
    this.setState({
      visible: true,
      content: "网络未连接，请联网后重试!"
    });
  }
  showModal3 = () => {
    this.setState({
      visible: true,
      content: "用户名或密码错误，请重试!"
    });
  }
  showModal4 = () => {
    this.setState({
      visible: true,
      content: "未找到加密狗"
    });
  }

  changedog = () => {
    this.setState({
      visible: true,
      content: "用户名或密码错误，请重试!"
    });
  }
  showModalDog = () => {

    this.setState({
      visible: true,
      content: "该脱机码无效，请重新输入!"
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleOk1 = () => {
    this.setState({
      visibleChange: false,
    }, () => {
      let loading = layer.msg('登录中...', {
        icon: 16
        , shade: 0.3
        , time: 0
      });

      service.DogLogin({
        payload: {
          "Username": this.state.username,
          "Password": encrypt.encryptByTripleDES(encrypt.encryptByMD5(this.state.password1), this.state.token)
        }
      }).then((data) => {
        layer.close(loading);
        switch (data.ReturnEntity.LoginStatus) {
          case 1:
            this.setUserInfoStorage(data.ReturnEntity);
            this.jumpLink();
            break;
          case 2:
            this.showModal3();
            break;
          case 6:
            this.showModal1();
            break;
          default:
            this.showModal2();
            break;
        }
      })
    });
  }
  handleOk2 = () => {
    this.setState({
      tjm: this.props.form.getFieldValue('TJMpassWord'),
      visibleChange: false,
    }, () => {
      let loading = layer.msg('登录中...', {
        icon: 16
        , shade: 0.3
        , time: 0
      });
      service.OfflineLogin({
        payload: {
          "OfflineCode": this.state.tjm
        }
      }).then((data) => {
        layer.close(loading);
        switch (data.ReturnEntity.LoginStatus) {
          case 1:
            this.jumpLink();
            this.setUserInfoStorage(data.ReturnEntity);
            break;
          case 8:
            this.showModalDog();
            break;
        }
      })
    })
  }
  handleCancel1 = () => {
    this.setState({
      visibleChange: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.loginType) {
      this.props.form.validateFields((err, values) => {
        service.GetSecretKey({
          payload: { "key": values.userName }
        }).then((data) => {
          this.setState({
            token: data.ReturnEntity.SecretKey
          });
        })
        if (!err) {
          service.CheckDogChange({
            payload: { "AuthorizationCode": "" }
          }).then((data) => {
            if (data.ReturnEntity.Status === 1) {
              this.setState({
                password1: values.passWord
              })
              this.handleOk1()

            } else if (data.ReturnEntity.Status === 2) {
              this.setState({
                newId: data.ReturnEntity.NewDogId,
                visibleChange: true,
                lastId: data.ReturnEntity.LastDogId,
                password1: values.passWord
              })
            } else if (data.ReturnEntity.Status === 3) {
              this.showModalDog()
            } else if (data.ReturnEntity.Status === 4) {
              this.showModal4()
            }
          });
        }
      })
    } else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          service.CheckDogChange({
            payload: { "AuthorizationCode": values.TJMpassWord }
          }).then((data) => {
            if (data.ReturnEntity.Status === 1) {
              this.handleOk2()
            } else if (data.ReturnEntity.Status === 2) {
              this.setState({
                newId: data.ReturnEntity.NewDogId,
                visibleChange: true,
                lastId: data.ReturnEntity.LastDogId,
              })
            } else if (data.ReturnEntity.Status === 3) {
              this.showModalDog()
            } else if (data.ReturnEntity.Status === 4) {
              this.showModal4()
            }
          });
        }
      })
    }
  };

  /**
   * 设置用户缓存
   */
  setUserInfoStorage = (info) => {
    const { systemName, systemLogo, terminalName, copyright } = this.state;
    localStorage.setItem('SystemName', systemName);
    localStorage.setItem('SystemLogo', systemLogo);
    localStorage.setItem('TerminalName', terminalName);
    localStorage.setItem('Copyright', copyright);
    localStorage.setItem('UserTrueName', info.UserTrueName);
    localStorage.setItem('SchoolName', info.SchoolName);
    localStorage.setItem('RoomName', info.RoomName);
    localStorage.setItem('AnnouncementNotReadNumber', info.AnnouncementNotReadNumber);
  };

  /**
   * 登录成功跳转页面
   */
  jumpLink = () => {
    layer.msg('登录成功', {
      type: 1
    }, function () {
      urlHelper.jump({
        path: '/onlineExamTeacher/detailsIndex.html',
        search: urlHelper.setSearchParam({
          type: 1,
        })
      });
    });
  };

  componentDidMount() {
    this.getUser = setInterval(
      () => {
        service.GetUserNameFormDog({
          payload: {}
        }).then((data) => {
          if (this.state.loginType) {
            this.setState({
              username: data.ReturnEntity.UserName
            })
            this.props.form.setFieldsValue({ userName: this.state.username })
          } else {
          }
        })
      }, 2000);
  };

  componentWillMount() {
    clearInterval(this.getUser);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.loginType) {
      return (
        <div className={style.bgbox}>
          <div className={style.loginHeader}><img src={this.state.systemLogo} /><span>{this.state.systemName}</span></div>
          <Modal
            visible={this.state.visible}
            title="异常信息"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                确定
              </Button>
            ]}
          >
            <p>{this.state.content}</p>
          </Modal>
          <Modal
            visible={this.state.visibleChange}
            title="异常信息"
            onOk={this.handleOk1}
            onCancel={this.handleCancel1}
            cancelText="取消"
            okText="确认"
          >
            <p>系统检测上一次登录的加密狗ID为<span className={style.redcolor}>{this.state.lastId}</span>，
               本次登录的加密狗ID为<span className={style.redcolor}>{this.state.newId}</span>，
               是否继续用<span className={style.redcolor}>{this.state.newId}</span>登录？</p>
          </Modal>
          <Form className={style.inputbox + " login-form"} onSubmit={this.handleSubmit}>
            <h3 className={style.tit}>{this.state.terminalName}登录</h3>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请插入加密狗!' },
                ], validateTrigger: "onBlur", validateFirst: true
              })(
                <Input className={style.inputStyle} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请插入加密狗，自动识别用户名" onChange={this.changeName} disabled />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('passWord', {
                rules: [{ required: true, message: '密码不能为空!' },
                { max: 50, message: '密码不能大于50个字符!' },
                ], validateTrigger: "onBlur", validateFirst: true
              })(
                <Input className={style.inputStyle} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="请输入密码" onChange={this.changePassword} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={style.bottonStyle + " login-form-button"}>
                登录
              </Button>
              <a href="javascript:void(0)" className={style.toggleType} onClick={this.toggleLogin}>脱机码登录</a>
            </FormItem>
          </Form>

        </div>
      )
    } else {
      return (
        <div className={style.bgbox}>
          <div className={style.loginHeader}><img src={this.state.systemLogo} /><span>{this.state.systemName}</span></div>
          <Modal
            visible={this.state.visible}
            title="异常信息"
            onOk={this.handleOk1}
            onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                确定
              </Button>
            ]}
          >
            <p>{this.state.content}</p>
          </Modal>
          <Modal
            visible={this.state.visibleChange}
            title="异常信息"
            onOk={this.handleOk2}
            onCancel={this.handleCancel1}
            cancelText="取消"
            okText="确认"
          >
            <p>系统检测上一次登录的加密狗ID为<span className={style.redcolor}>{this.state.lastId}</span>，
               本次登录的加密狗ID为<span className={style.redcolor}>{this.state.newId}</span>，
               是否继续用<span className={style.redcolor}>{this.state.newId}</span>登录？</p>
          </Modal>
          <Form className={style.inputboxTJM + " login-form"} onSubmit={this.handleSubmit}>
            <h3 className={style.tit}>{this.state.terminalName}登录</h3>
            <FormItem>
              {getFieldDecorator('TJMpassWord', {
                rules: [{ required: true, message: '请输入脱机码!' },
                { max: 50, message: '密码不能大于50个字符!' },
                ], validateTrigger: "onBlur", validateFirst: true
              })(
                <Input className={style.inputStyle} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text" placeholder="请输入脱机码" onChange={this.changePassword} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={style.bottonStyle + " login-form-button"}>
                登录
              </Button>
              <a href="javascript:void(0)" className={style.toggleType} onClick={this.toggleLogin}>加密狗登录</a>
            </FormItem>
          </Form>

        </div>

      )
    }

  }
}
const LoginForm = Form.create()(Login);
ReactDOM.render((<LoginForm />), document.getElementById('main'));
