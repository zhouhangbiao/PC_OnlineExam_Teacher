import React from "React";
import {Button, Modal, Form, Input, Radio, InputNumber} from 'antd';
import style from './ForcePaper.less';
import * as service from "../../services/detailsServices";
import UrlHelper from 'js-url-helper';

let urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();
const FormItem = Form.Item;



class ForcePaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLeng: false,
      checkVisible: false,
      explainVisible: false,
      explain:'',
    };
  }
  prolongTime = () => {
    if ( this.props.selectedRows) {
      this.showModalLeng(true)
    } else {
      this.setState({
        checkVisible: true,
      });
    }
  };
  checkVisible=()=>{ //判断是否勾选
    this.setState({checkVisible: true});
  };
  checkCancelVisible=()=>{ //判断是否勾选
    this.setState({checkVisible: false});
  };
  explainCancelVisible=()=>{ //判断后台返回状态
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
    const form = this.form;
    form.validateFields((err, values) => {
      if ( err ) {
        return;
      }
      form.resetFields();
      let that = this;
      let loading = layer.msg('加载中', {
        icon: 16, shade: 0.3
      });
      service.HandAllPapers({
        payload: {
          "ExamSceneId": query.examSceneId,
          "StudentCodes": this.props.allSelected,
          "CourseId":this.props.CourseId,
          "Description": values.explain,
        }
      }).then(function (data) {
        layer.close(loading);
        if ( data.ReturnEntity.HandResult === 1 ) {
          that.setState({visibleLeng: false});
          that.props.getList()
        }else if ( data.ReturnEntity.HandResult === 2) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain:'选中的考生已交卷，请刷新后重新选择！'
          });
        }else if ( data.ReturnEntity.HandResult === 3) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain:'考试已关闭，无法进行此操作！'
          });
        }else if ( data.ReturnEntity.HandResult === 0) {
          that.setState({
            visibleLeng: false,
            explainVisible: true,
            explain:'系统错误，提交失败！'
          });
        }
      });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  render() {
    const Lengthen = Form.create()(
      (props) => {
        const {visible, onCancel, onCreate, form} = props;
        const {getFieldDecorator} = form;
        const {TextArea} = Input;
        return (
          <Modal
            visible={visible}
            title="强制交卷说明"
            okText="确定"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <div>
              </div>
              <div className={style.authorizeCode}>
                <span>情况说明*</span>
              </div>
              <FormItem label="">
                {getFieldDecorator('explain', {
                    rules: [ {required: true, message: '强制交卷说明请输入至少五个字符！'}, {min: 5, message: '强制交卷说明请输入至少五个字符！'} ]
                  },
                )(<TextArea className={style.textareaCode} maxLength={200} minlength={5} rows={4}
                            placeholder="请输入至少五个字符"/>)}
              </FormItem>
            </Form>
            <div className={style.notice}>
              <p>提示：该操作会直接结束考生的本场考试，请谨慎操作。</p>
            </div>
          </Modal>
        );
      }
    );
    return (
      <div style={{display: 'inline-block'}}>
        <Button type="primary" onClick={this.prolongTime}>强制交卷</Button>
        <Modal
          title="强制交卷"
          wrapClassName="vertical-center-modal"
          onCancel={this.checkCancelVisible}
          visible={this.state.checkVisible}
          footer={<button onClick={() => this.checkCancelVisible(false)} type="button"
                          className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>请先选择要操作的记录！</p>
        </Modal>
        <Modal
          title="强制交卷"
          wrapClassName="vertical-center-modal"
          onCancel={this.explainCancelVisible}
          visible={this.state.explainVisible}
          footer={<button onClick={() => this.explainCancelVisible(false)} type="button"
                          className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
        >
          <p>{this.state.explain}</p>
        </Modal>
        <Lengthen
          ref={this.saveFormRef}
          visible={this.state.visibleLeng}
          onCancel={this.handleCancelLeng}
          onCreate={this.handleCreateLeng}
        />
      </div>
    );
  }
}

export default ForcePaper
