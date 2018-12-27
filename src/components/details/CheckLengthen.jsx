import React from "React";
import {Button, Modal, Form, Input, Radio, InputNumber, Select} from 'antd';
import style from './CheckLengthen.less';
import * as service from "../../services/detailsServices";

const Option = Select.Option;
const FormItem = Form.Item;
import UrlHelper from 'js-url-helper';

let urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();

function onChange(value) {
}

class CheckLengthen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLeng: false,
      checkVisible: false,
      explainVisible: false,
      explain: '',
      message: '',
      displayVerify: '',
      showVerify:'none'
    };
  }

  prolongTime = () => {
    if ( this.props.selectedRows ) {
      this.showModalLeng(true)
    } else {
      this.setState({
        checkVisible: true,
      });
    }
  };
  checkVisible = () => { //判断是否勾选
    this.setState({checkVisible: true});
  };
  checkCancelVisible = () => { //判断是否勾选
    this.setState({checkVisible: false});
  };
  explainCancelVisible = () => { //判断后台返回状态
    this.setState({explainVisible: false});
    this.props.getList()
  };
  showModalLeng = () => { //考场延长考试时长弹框
    this.setState({visibleLeng: true});
  };
  handleCancelLeng = () => {  //考场延长考试时长弹框关闭
    this.setState({visibleLeng: false});
  };
  handleCreateLeng = () => {
    this.hiddenNotice();
    const form = this.form;
    form.validateFields((err, values) => {
      if ( err ) {
        return;
      }
      //form.resetFields();
      let that = this;
      let loading = layer.msg('加载中', {
        icon: 16, shade: 0.3
      });
      service.ExtendStudentTime({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": this.props.CourseId,
          "StudentCodes": this.props.allSelected,
          "ReasonType": values.modifier,
          "ExtendTimeLength": values.timeLength * 60,
          "ExtendType": values.choiceType,
          "Description": values.explain,
          "AuthorizationCode": values.authorize,
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity.ExtendResult === 1 ) {
          that.setState({visibleLeng: false});
          that.props.getList();
        } else if ( data.ReturnEntity.ExtendResult === 2 ) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain: '选中的考生已交卷，请刷新后重新选择！'
          });
        } else if ( data.ReturnEntity.ExtendResult === 3 ) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain: '考试已关闭，无法进行此操作！'
          });
        } else if ( data.ReturnEntity.ExtendResult === 0 ) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain: '系统错误，提交失败！'
          });
        } else if ( data.ReturnEntity.ExtendResult === 4 ) {
          layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: data.Message,
            time: 500000,
            shadeClose: true,
          });
        }else if(data.ReturnEntity.ExtendResult === 5){
          that.setState({
            visibleLeng: true,
            showVerify: 'block',
            displayVerify: '该授权码无效！'
          });
        }
      });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };
  hiddenNotice = () => {  //获取焦点时隐藏错误提示信息
      this.state.showVerify= 'none'
  };
  render() {
    const Lengthen = Form.create()(
      (props) => {
        const {visible, onCancel, onCreate, form,displayVerify} = props;
        const {getFieldDecorator} = form;
        const {TextArea} = Input;
        return (
          <Modal
            visible={visible}
            title="延长考生考试时长说明"
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
                <div className={style.lengthen}>
                  <span>延长时长*</span>
                </div>
                <FormItem style={{width:'100px',display:'inline-block'}}>
                  {getFieldDecorator('choiceType', {
                    rules: [ {required: true, message: '请选择类型！',initialValue:"请选择"}],
                  })(
                      <Select placeholder="请选择" onChange={onChange} style={{width: '100px'}}>
                        <Option value="1">延长</Option>
                        <Option value="2">缩短</Option>
                      </Select>
                  )}
                </FormItem>
                <FormItem style={{width:'150px',display:'inline-block'}}>
                  {getFieldDecorator('timeLength', {
                    rules: [ {required: true, message: '请输入时长！'}, {
                      validator: function (rule, value, callback) {
                        if ( value <= 0 || value > 30 ) {
                          callback("延长时长须为>0且<=30的正整数！")
                        }
                        callback()
                      }
                    }, {pattern: /^[1-9]+([0-9]*){0,30}$/, message: '延长时长不能输入小数！'} ],
                  })(
                    <div>
                      <InputNumber min={1} max={30} className={style.lent}/>
                      <span style={{marginLeft: '8px', color: '#808080'}}>分钟</span>
                    </div>
                  )}
                </FormItem>
              </div>
              <div>
              </div>
              <div>
                <div className={style.authorizeCode}>
                  <span>授权码*</span>
                </div>
                <FormItem label="">
                  {getFieldDecorator('authorize', {
                    rules: [ {required: true, message: '提示：请输入授权码！'}
                    ],
                  })(
                    <Input maxLength={50} placeholder="请输入您的授权码" className={style.inputCode} onKeyDown={this.hiddenNotice}/>
                  )}
                </FormItem>
                <div className={style.displayVerify} style={{display:this.state.showVerify}}>
                  <p>{displayVerify}</p>
                </div>
              </div>
              <div className={style.authorizeCode}>
                <span>延时说明*</span>
              </div>
              <FormItem label="">
                {getFieldDecorator('explain', {
                    rules: [ {required: true, message: '延时说明请输入至少五个字符！'}, {min: 5, message: '延时说明请输入至少五个字符！'} ]
                  },
                )(<TextArea className={style.textareaCode} maxLength={200} minlength={5} rows={4}
                            placeholder="请输入至少五个字符"/>)}
              </FormItem>
            </Form>
            <div className={style.notice}>
              <p>提示：该操作会在考生原有剩余时长上进行追加时</p>
              <p>长，请谨慎操作。</p>
            </div>
          </Modal>
        );
      }
    );
  if(this.props.IsAllowDelayExam){
    return (
      <div style={{display: 'inline-block'}}>
        <Button type="primary" onClick={this.prolongTime}>延长时长</Button>
        <Modal
          title="延长考生时长"
          wrapClassName="vertical-center-modal"
          onCancel={this.checkCancelVisible}
          visible={this.state.checkVisible}
          footer={<button onClick={() => this.checkCancelVisible(false)} type="button"
                          className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>请先选择要操作的记录！</p>
        </Modal>
        <Modal
          title="延长考生时长"
          wrapClassName="vertical-center-modal"
          onCancel={this.explainCancelVisible}
          visible={this.state.explainVisible}
          footer={<button onClick={() => this.explainCancelVisible(false)} type="button"
                          className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>{this.state.explain}</p>
        </Modal>
        <Lengthen
          displayVerify={this.state.displayVerify}
          ref={this.saveFormRef}
          visible={this.state.visibleLeng}
          onCancel={this.handleCancelLeng}
          onCreate={this.handleCreateLeng}
        />
      </div>
    );
    }
    else{
      return null
    }
  }
}

export default CheckLengthen
