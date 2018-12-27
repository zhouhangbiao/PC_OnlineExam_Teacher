import React from "React";
import {Button, Modal, Form, Input, Radio, InputNumber} from 'antd';
import style from './Lengthen.less';

const FormItem = Form.Item;
import UrlHelper from 'js-url-helper';

let urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();
const AuthorizeRestart = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, RestartVerify, hiddenNotice} = props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title="授权重新开启"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <p>该考试已关闭，请输入授权码后重新开启!（该授权杩为一次性码使用后即失效）</p>
          <p className={style.authorizeCode}>授权码*</p>
          <FormItem label=" " required>
            {getFieldDecorator('restartCode', {
              /*rules: [ {required: true, message: '提示*：请输入授权码！',},
              ],*/
              rules: [ {
                validator: function (rule, value, callback) {
                  if ( value === undefined || value === '' ) {
                    callback("提示：请输入授权码！")
                  }
                  callback()
                }
              } ]
            })(
              <Input maxLength={200} placeholder="请输入您的授权码" className={style.inputCode} onKeyDown={hiddenNotice}/>
            )}
          </FormItem>
          <p className={style.displayVerify}>{RestartVerify}</p>
        </Form>
      </Modal>
    );
  }
);
export default AuthorizeRestart
