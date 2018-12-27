import React from "React";
import {Button, Modal, Form, Input, Radio, InputNumber} from 'antd';
import style from './Lengthen.less';
import * as service from "../../services/detailsServices";

const FormItem = Form.Item;
import UrlHelper from 'js-url-helper';

let urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();

function onChange(value) {
}
const Lengthen = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, displayVerify} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {TextArea} = Input;
    return (
      <Modal
        visible={visible}
        title="考场延长考试时长说明"
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
            <FormItem label="">
              {getFieldDecorator('long', {
                rules: [ {required: true, message: '请输入延长时长！'}, {
                  validator: function (rule, value, callback) {
                    if ( value <= 0 || value > 60 ) {
                      callback("延长时长须为>0且<=60的正整数！")
                    }
                    callback()
                  }
                }, {pattern: /^[1-9]+([0-9]*){0,60}$/, message: '延长时长不能输入小数！'} ],
              })(
                <InputNumber
                  placeholder="请输入延长时长"
                  min={1}
                  max={60}
                  onChange={onChange} className={style.inputCode}
                />
              )}
              <span style={{marginLeft: '8px', color: '#808080'}}>分钟</span>
            </FormItem>
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
                <Input maxLength={50} placeholder="请输入您的授权码" className={style.inputCode}/>
              )}
            </FormItem>
            <div className={style.displayVerify}>
              <p>{displayVerify}</p>
            </div>
          </div>
          <div>
          </div>
          <div className={style.authorizeCode}>
            <span>延时说明*</span>
          </div>
          <FormItem label="">
            {getFieldDecorator('explain', {
                rules: [ {required: true, message: '延时说明请输入至少五个字符！'}, {min: 5, message: '延时说明请输入至少五个字符;'} ]
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
class Extension extends React.Component {
  state = {
    visibleLeng: false,
    displayVerify: '',
    explainVisible: false,
    explain: '',
  };
  showModalLeng = () => { //考场延长考试时长弹框
    this.setState({visibleLeng: true});
  };
  explainCancelVisible = () => { //判断后台返回状态
    this.setState({explainVisible: false});
    window.location.reload();
  };
  handleCancelLeng = () => {  //考场延长考试时长弹框关闭
    this.setState({visibleLeng: false});
  };
  handleCreateLeng = () => {
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
      service.ProlongExamSceneTime({
        payload: {
          "ExamSceneId": query.examSceneId,
          "StampType": values.modifier,
          "TimeLength": values.long * 60,
          "AuthorizationCode": values.authorize,
          "Remark": values.explain
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity === 1 ) {
          that.setState({visibleLeng: false});
          window.location.reload();
        } else if ( data.ReturnEntity === 2 ) {
          that.setState({
            displayVerify: '提示：该授权码无效，请重新输入！',
          });
        } else if ( data.ReturnEntity === 0 ) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain: '考场延长考试时长失败！'
          });
        }
      });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <Button type="primary" onClick={() => this.showModalLeng(true)}
                style={{display: this.props.displayYCKS}}>延长考试时长</Button>
        <Lengthen
          displayVerify={this.state.displayVerify}
          ref={this.saveFormRef}
          visible={this.state.visibleLeng}
          onCancel={this.handleCancelLeng}
          onCreate={this.handleCreateLeng}
        />
        <Modal
          title="考场延长考试时长"
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
export default Extension
