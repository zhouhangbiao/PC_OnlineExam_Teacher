import React from "React";
import { Button, Modal, Form, Input, Radio, InputNumber } from 'antd';
import style from './StudentAgain.less';
import * as service from '../../services/commonServices';
import UrlHelper from 'js-url-helper';
let urlHelper = new UrlHelper(location);
var searchParam = urlHelper.getSearchParam();
const { TextArea } = Input;
const FormItem = Form.Item;
const Lengthen = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, getValue, onChange,displayVerify} = props;
        const { getFieldDecorator } = form;
        const { TextArea } = Input;
        return (
            <Modal
                visible={visible}
                title="重考说明"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <div className={style.lengthen}>
                        <span>类型<span className={style.NotemptyF}>*</span></span>

                        <FormItem className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                rules: [{ required: true, message: '提示：请选择类型！' }]
                            })(
                                <Radio.Group onChange={onChange} >
                                    <Radio value="1">断电</Radio>
                                    <Radio value="2">网络异常</Radio>
                                    <Radio value="3">作弊</Radio>
                                    <Radio value="4">其他</Radio>
                                </Radio.Group>
                            )}
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
                    <label className={style.explain}>重考说明<span className={style.Notempty}>*</span>：</label>
                    <FormItem>
                        {getFieldDecorator('TextArea', {
                            rules: [{ required: true, message: '说明情况不能为空！' },
                            { min: 5, message: '请最少输入五个字符！' },
                            { max: 200, message: '请输入少于200个字符！' },
                            ], validateFirst: true
                        })(
                            <TextArea
                                onChange={getValue}
                                className={style.TextArea}
                                autosize={{ minRows: 5, maxRows: 10 }}
                                placeholder="请最少输入五个字符" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);
class Again extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkVisible: false,
            conetent: "",
            visibleAgain: false,
            selectValue: '',
            textValue: ''
        }
    }
    //获取选择框数据
    getSelectValue = (e) => {
        this.setState({
            selectValue: e.target.value
        })

    }
    //判断是否选中考生
    ischeck = () => {
        if (!this.props.selectedRows) {
            this.setState({
                checkVisible: true,
                conetent: "请先选择要操作的记录！"
            })
        } else {
            this.setState({
                visibleAgain: true
            })
        }
    }
    checkCancelVisible = () => {
        this.setState({
            checkVisible: false
        })
    }
    handleCancelAgain = () => {
        this.setState({
            visibleAgain: false
        })
    }
    //获取下拉框数据
    handleGetValue = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }
    //渲染表格
    handleCreateAgain = () => {
        this.form.validateFields((err, values) => {
            let loading = layer.msg('加载中...', {
                icon: 16
                , shade: 0.3
                , time: 0
            });
            if (err) {
                layer.close(loading);
                return;
            } else {
                this.form.resetFields();
                service.StudentResetExam({
                    payload: {
                        "StampType": this.state.selectValue,//重考类型
                        "Remark": this.state.textValue,//监考情况说明
                        "ExamSceneId": searchParam.examSceneId, //场次ID
                        "CourseId": this.props.CourseId,//学科ID
                        "StudentCode": this.props.allSelected,
                        "AuthorizationCode": values.authorize,
                    }
                }).then((data) => {
                    layer.close(loading);
                    switch (data.ReturnEntity) {
                        case 1:
                            this.props.reloadList(true);
                            this.setState({ visibleAgain: false })
                            this.props.getList();
                            return layer.msg('重考成功');
                        case 2:
                            this.props.reloadList(true);
                            this.setState({ visibleAgain: false })
                            return layer.msg('重考失败，请重试')
                        case 3:
                            this.setState({ visibleAgain: false })
                            this.props.reloadList(true);
                            return layer.msg('已关闭考试')
                        case 4:
                            this.setState({ visibleAgain: false })
                            this.props.reloadList(true);
                            return layer.msg('考生未开始')
                        case 5:
                            this.setState({ visibleAgain: false })
                            this.props.reloadList(true);
                            return layer.msg('考生已经交卷，自动刷新后重试')
                        case 6:
                              this.setState({ visibleAgain: true })
                              this.props.reloadList(true);
                              return layer.msg('该授权码无效！')
                    }

                })
            }

        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
      if (this.props.IsAllowReexamination) {
            return (
                <div style={{ display: 'inline-block' }}>
                    <Modal
                        title="考生重考"
                        wrapClassName="vertical-center-modal"
                        onCancel={this.checkCancelVisible}
                        visible={this.state.checkVisible}
                        footer={<button onClick={() => this.checkCancelVisible(false)} type="button"
                            className="ant-btn ant-btn-primary"><span>关 闭</span></button>}
                    >
                        <p>{this.state.conetent}</p>
                    </Modal>
                    <Button type="primary" onClick={this.ischeck}>考生重考</Button>
                    <Lengthen
                        displayVerify={this.state.displayVerify}
                        ref={this.saveFormRef}
                        onChange={this.getSelectValue}
                        visible={this.state.visibleAgain}
                        onCancel={this.handleCancelAgain}
                        onCreate={this.handleCreateAgain}
                        getValue={this.handleGetValue}
                    />
                </div>
            )
        }
        else {
            return null
        }
    }
}
export default Again
