import React from "React";
import {Button, Modal, Form, Input, Radio, InputNumber} from 'antd';
import style from './Reexamination.less';

const FormItem = Form.Item;
import * as service from '../../services/detailsServices';
import UrlHelper from "js-url-helper";

const urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();

class Reexamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRest: false,
      displayVerify: '',
      explainVisible: false,
      explain: '',
      authorization: 'none',
    };
  }
  hiddenNotice = () => {  //获取焦点时隐藏错误提示信息
      this.state.authorization= 'none'
  };
  showModalRest = () => {
    this.setState({visibleRest: true});
  };
  explainCancelVisible = () => { //判断后台返回状态
    this.setState({explainVisible: false});
    window.location.reload();
  };
  handleCancelRest = () => {
    this.setState({visibleRest: false});
  };
  handleCreateRest = () => {
    this.state.authorization= 'none';
    const form = this.form;
    form.validateFields((err, values) => {
      if ( values.authorize === '' ) {
        this.state.authorization= 'none'
      }
      if ( err ) {
        return;
      }
      //form.resetFields();
      let that = this;
      let loading = layer.msg('加载中', {
        icon: 16, shade: 0.3
      });
      service.ResetExam({
        payload: {
          "ExamSceneId": query.examSceneId,
          "AbnormalType": values.modifier,
          "AuthorizationCode": values.authorize,
          "Remark": values.lengthen
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity === 1 ) {
          that.setState({visibleRest: false});
          window.location.reload();
        } else if ( data.ReturnEntity === 2 ) {
          that.setState({
            authorization:'block',
            displayVerify: '提示：该授权码无效，请重新输入！',
          });
        } else if ( data.ReturnEntity === 3 ) {
          that.setState({
            visibleRest: false,
            explainVisible: true,
            explain: '该场次已关闭！'
          });
        }
      });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    const Reexamination = Form.create()(
      (props) => {
        const {visible, onCancel, onCreate, form, displayVerify} = props;
        const {getFieldDecorator} = form;
        const {TextArea} = Input;
        return (
          <Modal
            visible={visible}
            title="重考说明"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <div className={style.lengthen}>
                <span>类型*</span>
              </div>
              <FormItem className="collection-create-form_last-form-item">
                {getFieldDecorator('modifier', {
                  rules: [ {required: true, message: '提示：请选择类型！'} ]
                })(
                  <Radio.Group>
                    <Radio value="1">断电</Radio>
                    <Radio value="2">网络异常</Radio>
                    <Radio value="3">考试系统异常</Radio>
                    <Radio value="4">其他</Radio>
                  </Radio.Group>
                )}
              </FormItem>
              <div>
                <div className={style.authorizeCode}>
                  <span>授权码*</span>
                </div>
                <FormItem label="">
                  {getFieldDecorator('authorize', {
                    rules: [ {required: true, message: '提示：请输入授权码！'}, {
                      validator: function (rule, value, callback) {
                        if ( value ==='') {
                          callback("");
                        }
                        callback()
                      }
                    }
                    ],
                  })(
                    <Input maxLength={50} placeholder="请输入您的授权码" className={style.inputCode} onKeyDown={this.hiddenNotice}/>
                  )}
                </FormItem>
                <div className={style.displayVerify} style={{display:this.state.authorization}}>
                  <p>{displayVerify}</p>
                </div>
              </div>
              <div>
              </div>
              <div className={style.authorizeCode}>
                <span>重考说明*</span>
              </div>
              <FormItem label="">
                {getFieldDecorator('lengthen', {
                    rules: [ {required: true, message: '重考说明请输入至少五个字符！'}, {min: 5, message: '重考说明请输入至少五个字符！'} ]
                  },
                )(<TextArea className={style.textareaCode} maxLength={200} rows={4} placeholder="请输入至少五个字符"/>)}
              </FormItem>
            </Form>
            <div className={style.notice}>
              <p>提示：该操作会将整个考场所有考生已考数据清空，请谨慎操作。</p>
            </div>
          </Modal>
        );
      }
    );

    return (
      <div style={{display: 'inline-block'}}>
        <Button type="primary" onClick={() => this.showModalRest(true)}
                style={{display: this.props.displayCk}}>重考</Button>
        <Reexamination
          displayVerify={this.state.displayVerify}
          ref={this.saveFormRef}
          visible={this.state.visibleRest}
          onCancel={this.handleCancelRest}
          onCreate={this.handleCreateRest}
        />
        <Modal
          title="重考"
          wrapClassName="vertical-center-modal"
          onCancel={this.explainCancelVisible}
          visible={this.state.explainVisible}
          footer={<button onClick={() => this.explainCancelVisible(false)} type="button"
                          className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>{this.state.explain}</p>
        </Modal>
      </div>
    );
  }
}

export default Reexamine
