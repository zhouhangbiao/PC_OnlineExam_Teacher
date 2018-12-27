import React from "React";
import ReactDOM from 'ReactDOM';
import { Modal, Input, Checkbox, Form, Button } from 'antd';
import 'moment/locale/zh-cn';
import UrlHelper from 'js-url-helper';
import style from './BuildNew.less';
import * as service from '../services/commonServices';
import * as serviced from '../services/detailsServices';
const urlHelper = new UrlHelper(location);
var searchParam = urlHelper.getSearchParam();
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
let option1 = [];
//渲染页面
const Lengthen = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, onChange, getValue } = props;
        const { getFieldDecorator } = form;
        const { TextArea } = Input;
        return (
            <Modal
                title="新增监考记录"
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
            >
                <Form layout="vertical">
                    <label className={style.subject}>考试科目<span className={style.Notempty}>*</span>：</label>
                    <FormItem>
                        {getFieldDecorator('modifier', {
                            rules: [{ required: true, message: '提示：请选择类型！' }]
                        })(
                            <CheckboxGroup onChange={onChange}
                                options={option1}
                            />
                        )}
                    </FormItem>
                    <br />
                    <label className={style.explain}>监考情况说明<span className={style.Notempty}>*</span>：</label>
                    <FormItem>
                        {getFieldDecorator('TextArea', {
                            rules: [{ required: true, message: '说明情况不能为空!' },
                            { min: 5, message: '请最少输入五个字符!' },
                            { max: 200, message: '请输入少于200个字符!' },
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
        )
    }
)
class BuildNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            index: "",
            value: "",
            childadd: props.childadd
        };
    }
    componentWillMount() {
        let loading = layer.msg('加载中...', {
            icon: 16
            , shade: 0.3
            , time: 0
        });
        serviced.GetExamInfo({
            payload: { "ExamSceneId": searchParam.examSceneId }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.ExamCourses.map((item, index) => {
                option1.push({ label: item.CourseName, value: item.CourseId })
            })
            this.setState({
                index: option1
            })
        })
    }
    //改变单选框
    handleonChange = (checkedValues) => {
        let indexcontent = ""
        checkedValues.map((item) => {
            indexcontent += item + `,`
        })
        indexcontent = indexcontent.slice(0, indexcontent.length - 1)
        this.setState({
            index: indexcontent
        })
    }
    //获取下拉框的值
    handleGetValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    //显示模态框
    showModal = () => {
        this.setState({ visible: true });
    };
    //取消模态框
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //模态框确认按钮
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            let loading = layer.msg('加载中...', {
                icon: 16
                , shade: 0.3
                , time: 0
            });
            if (err) {
                layer.close(loading);
                return;
            } else {
                form.resetFields();
                service.AddSuperviseRecord({
                    payload: {
                        "CourseIds": this.state.index,//科目ID，勾选多个，则中间用逗号隔开
                        "Description": this.state.value,//监考情况说明
                        "ExamSceneId": searchParam.examSceneId //场次ID
                    }
                }).then((data) => {
                    layer.close(loading);
                    if (data.ReturnEntity === 1) {
                        this.setState({ visible: false });
                        this.props.childadd(true)
                    } else {
                        layer.msg('新增失败失败，请重试')
                    }
                })
            }

        });
    };
    cancel = () => {
        this.props.cancel(false);
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
        return (
            <div className={style.div}>
                <Button type="primary" className={style.newbuild} onClick={() => this.showModal(true)}>新增</Button>
                <Lengthen
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    onChange={this.handleonChange}
                    getValue={this.handleGetValue}
                />
            </div>
        )
    }
}
export default BuildNew;
