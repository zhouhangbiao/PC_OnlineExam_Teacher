import React from "React";
import {Button, Modal, Form, Input, Radio} from 'antd';
import style from './Authorize.less';

const FormItem = Form.Item;
const Authorize = Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, displayVerify, hiddenNoticeAu} = props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title="授权开启"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <p>你已超过正常开考允许时间，请进行授权码进行开启</p>
          <p className={style.authorizeCode}>授权码*</p>
          <FormItem label=" ">
            {getFieldDecorator('codes', {
               rules: [{
                 validator: function (rule, value, callback) {
                   if ( value === undefined || value === '' ) {
                     callback("提示：请输入授权码！")
                   }
                   callback()
                 }
               }
               ],

            })(
              <Input maxLength={50} placeholder="请输入您的授权码" className={style.inputCode} onKeyDown={hiddenNoticeAu}/>
            )}
          </FormItem>
          <p className={style.displayVerify}>{displayVerify}</p>
        </Form>
      </Modal>
    );
  }
);

export default Authorize
