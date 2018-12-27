import ReactDOM from 'ReactDOM';
import { Modal, Select, Form, Input, Button, Radio, Tooltip } from 'antd';
import * as service from '../services/commonServices';
import * as serviceE from '../services/examServices';
import * as serviceD from "../services/detailsServices";
import style from "./WrongNew.less";
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const ModalContent = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, ExamScene, CourseName, SeatNumber, QuestionCategoryName, QuestionIndex, disableSeatNumber
                , disableCourseName, disableQuestionCategoryName, disableQuestionIndex, inputSelect, search, disableSearch, imgsrc, reload,
                optionExamScene, optionCourseName, optionSeatNumber, optionType, optionNUmber, onChangeRadio, form, radio, getValue, onSave, CourseNameValue,
                SeatNumberValue, typeValue, numberValue, ExamSceneValue, disableExamScene, editoption, title } = this.props;
            const { getFieldDecorator } = form;
            const { TextArea } = Input;
            return (
                <Modal
                    title={title}
                    visible={visible}
                    onOk={onCreate}
                    width="800px"
                    onCancel={onCancel}
                    footer={[
                        <Button key="submit" onClick={onCancel}>
                            取消
              </Button>,
                        <Button key="submit" type="primary" onClick={onCreate}>
                            上报
                </Button>,
                        <Button key="submit" type="primary" onClick={onSave}>
                            暂存
               </Button>,
                    ]}
                >
                    <FormItem>
                        <Select style={{ width: 195 }} defaultValue="请选择考试场次" className={style.select} onChange={ExamScene} value={ExamSceneValue} disabled={disableExamScene} >
                            {optionExamScene}
                        </Select>
                        <Select style={{ width: 130 }} defaultValue="请选择学科" className={style.select} disabled={disableCourseName} onChange={CourseName} value={CourseNameValue} >
                            {optionCourseName}
                        </Select>
                        <Select style={{ width: 130 }} defaultValue="请选择座位号" className={style.select} disabled={disableSeatNumber} onChange={SeatNumber} value={SeatNumberValue}>
                            {optionSeatNumber}
                        </Select>
                        <Input placeholder="考生信息(准考证+姓名)" className={style.input} disabled value={inputSelect} />
                        <Select style={{ width: 130 }} defaultValue="请选择题型" className={style.select} disabled={disableQuestionCategoryName} onChange={QuestionCategoryName} value={typeValue}>
                            {optionType}
                        </Select>
                        <Select style={{ width: 130 }} defaultValue="请选择题号" className={style.select} disabled={disableQuestionIndex} onChange={QuestionIndex} value={numberValue}>
                            {optionNUmber}
                        </Select>
                        <Button type="primary" onClick={search} disabled={disableSearch}>查询</Button>
                    </FormItem>
                    <div className={style.pic}>
                        <img src={imgsrc}></img>
                    </div>
                    <label className={style.type}>错题类型<span className={style.Notempty}>*</span>：</label>
                    <FormItem className={style.radio}>
                        {getFieldDecorator('RadioGroup', {
                            rules: [{ required: true, message: '提示：请选择类型！' }],
                            initialValue: editoption
                        })(
                            <RadioGroup onChange={onChangeRadio} >
                                {radio}
                            </RadioGroup>
                        )}
                    </FormItem>
                    <label className={style.description}>错题描述<span className={style.Notempty}>*</span>：</label>
                    <FormItem className={style.radio}>
                        {getFieldDecorator('TextArea', {
                            rules: [{ required: true, message: '说明情况不能为空!' },
                            { max: 100, message: '请输入少于100个字符!' },
                            ], validateFirst: true
                        })(
                            <TextArea
                                onChange={getValue}
                                className={style.TextArea}
                                autosize={{ minRows: 5, maxRows: 10 }}
                                placeholder="必填，不能为空" />
                        )}
                    </FormItem>
                </Modal>
            )
        }
    }
)
class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.Newshow,
            visibleAgain: false,
            disableCourseName: true,
            disableSeatNumber: true,
            disableQuestionCategoryName: true,
            disableQuestionIndex: true,
            inputSelect: "考生信息(准考证+姓名)",
            disableSearch: true,
            imgsrc: "",
            reload: false,
            optionExamScene: [],
            optionCourseName: [],
            optionSeatNumber: [],
            optionType: [],
            optionNUmber: [],
            radio: [],
            textValue: "",
            OperationType: 0,
            edit: this.props.edit,
            CourseNameValue: "请选择学科",
            SeatNumberValue: "请选择座位号",
            typeValue: "请选择题型",
            numberValue: "请选择题号",
            ExamSceneValue: "请选择场次",
            disableExamScene: false,
            CourseNameName: "",
            ExamSceneName: "",
            typeName: "",
            editoption: "",
            title: "新增错题记录"
        }
    }
    componentWillMount() {
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        const radio = []
        //获取场次
        this.getExamScene()
        service.GetWrongTypes({
            payload: {}
        }).then((data) => {
            data.ReturnEntity.QuestionWrongTypes.map((item) => {
                radio.push(<Radio value={item.QuestionWrongTypeId}>{item.QuestionWrongTypeName}</Radio>)
            })
            this.setState({
                radio: radio
            })
        })
    }
    //根据两次接受的参数对比决定执行
    componentDidUpdate(prevProps, prevState) {
        if (this.props.edit && prevProps.edit !== this.props.edit) {
            this.editWrong()
        }
    }
    //获取场次下拉框
    getExamScene = () => {
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        const optionExamScene = []
        serviceE.GetExamSceneList({
            payload: {
                "PageSize": "100",
                "PageIndex": "1"
            }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.ExaminationList.map((item) => {
                optionExamScene.push(
                    <Option value={item.ExamSceneId}> <Tooltip title={item.ExamSceneName}>{item.ExamSceneName}  </Tooltip></Option>
                )
            })
            this.setState({
                optionExamScene: optionExamScene
            })
        })
    }
    //点击题号编辑页面
    editWrong = () => {
        const form = this.formRef.props.form;
        this.setState({
            disableExamScene: true,
            title: "修改错题记录"
        })
        service.GetWrongQuestionDetail({
            payload: {
                "WrongQuestionId": this.props.WrongQuestionId
            }
        }).then((data) => {
            this.setState({
                imgsrc: data.ReturnEntity.QuestionPic,
                ExamSceneValue: data.ReturnEntity.ExamSceneId,
                ExamSceneName: data.ReturnEntity.ReportingExamSceneName,
                CourseNameValue: data.ReturnEntity.CourseId,
                CourseNameName: data.ReturnEntity.CourseName,
                SeatNumberValue: data.ReturnEntity.SeatNumber,
                typeValue: data.ReturnEntity.QuestionCategoryId,
                typeName: data.ReturnEntity.QuestionCategoryName,
                numberValue: data.ReturnEntity.QuestionIndex,
                inputSelect: data.ReturnEntity.StudentInfo,
                textValue: data.ReturnEntity.ReportingComment,
                editoption: data.ReturnEntity.QuestionWrongTypeId,
            }, () => {

                form.setFieldsValue({ TextArea: this.state.textValue })
                const ExamSceneoption = [];
                const Courseoption = [];
                const SeatNumberoption = [];
                const Typeoption = [];
                const numberoption = [];
                ExamSceneoption.push(<Option value={this.state.ExamSceneValue}>{this.state.ExamSceneName}</Option>)
                Courseoption.push(<Option value={this.state.CourseNameValue}>{this.state.CourseNameName}</Option>)
                SeatNumberoption.push(<Option value={this.state.SeatNumberValue}>{this.state.SeatNumberValue}</Option>)
                Typeoption.push(<Option value={this.state.typeValue}>{this.state.typeName}</Option>)
                numberoption.push(<Option value={this.state.numberValue}>{this.state.numberValue}</Option>)
                this.setState({
                    optionExamScene: ExamSceneoption,
                    optionCourseName: Courseoption,
                    optionSeatNumber: SeatNumberoption,
                    optionType: Typeoption,
                    optionNUmber: numberoption
                })
            })

        })
    }
    //取消按钮
    handleCancel = () => {
        const form = this.formRef.props.form;
        this.setState({
            // visible: false,
            CourseNameValue: "请选择学科",
            SeatNumberValue: "请选择座位号",
            typeValue: "请选择题型",
            numberValue: "请选择题号",
            inputSelect: "考生信息(准考证+姓名)",
            disableCourseName: true,
            disableSeatNumber: true,
            disableQuestionCategoryName: true,
            disableQuestionIndex: true,
            disableSearch: true,
            imgsrc: "",
            ExamSceneValue: "请选择场次",
            disableExamScene: false,
            editoption: "",
            title: "新增错题记录",
        })
        form.setFieldsValue({ TextArea: 0 })
        this.getExamScene()
        this.props.Addcancel(true);
    }
    //暂存
    onSave = () => {
        this.setState({
            OperationType: 1
        }, () => {
            this.post()
        })
    }
    //提交
    handleCreate = () => {
        const form = this.formRef.props.form;
        this.setState({
            OperationType: 2
        }, () => {
            this.post()
        })
    }
    //暂存 上报接口
    post = () => {
        const form = this.formRef.props.form;
        if (!this.state.imgsrc) {
            layer.msg('未找到错题信息，请重新查找')
        } else {
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
                    service.SaveWrongQuestion({
                        payload: {
                            "ExamSceneId": this.state.ExamSceneValue,//考试场次Id
                            "CourseId": this.state.CourseNameValue,//科目Id
                            "QuestionCategoryId": this.state.typeValue,//题型Id
                            "QuestionIndex": this.state.numberValue,//题号
                            "SeatNumber": this.state.SeatNumberValue,//座位号
                            "QuestionWrongTypeId": this.state.editoption,//错题类型
                            "ReportingComment": this.state.textValue,//错题描述
                            "OperationType": this.state.OperationType,
                            "WrongQuestionId": this.props.WrongQuestionId
                        }
                    }).then((data) => {
                        layer.close(loading);
                        switch (data.ReturnEntity) {
                            case 1:

                                layer.msg('操作成功', {
                                    type: 1
                                }, () => {
                                    this.setState({
                                        visible: false,
                                        CourseNameValue: "请选择学科",
                                        SeatNumberValue: "请选择座位号",
                                        typeValue: "请选择题型",
                                        numberValue: "请选择题号",
                                        inputSelect: "考生信息(准考证+姓名)",
                                        disableCourseName: true,
                                        disableSeatNumber: true,
                                        disableQuestionCategoryName: true,
                                        disableQuestionIndex: true,
                                        disableSearch: true,
                                        imgsrc: "",
                                        ExamSceneValue: "请选择场次",
                                        editoption: "",
                                        disableExamScene: false,
                                    })
                                    this.props.reload(true);
                                    this.getExamScene()
                                    this.props.Addcancel(true);
                                });
                                break;
                            case 2:
                                layer.msg('请勿重复添加相同数据')
                                break;
                            case 3:
                                layer.msg('暂时无法上报，请暂存数据')
                                break;
                            case 0:
                                layer.msg('操作失败,请重试')
                                break;
                        }
                    })
                }

            });
        }
    }
    //显示弹出框
    show = () => {
        this.setState({
            visible: true,
        })
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };
    //根据场次获取学科
    ExamScene = (value) => {
        this.setState({
            CourseNameValue: "请选择学科",
            SeatNumberValue: "请选择座位号",
            typeValue: "请选择题型",
            numberValue: "请选择题号",
            inputSelect: "考生信息(准考证+姓名)",
            disableSeatNumber: true,
            disableQuestionCategoryName: true,
            disableQuestionIndex: true,
            disableSearch: true,
            imgsrc: "",
        })
        if (value) { this.setState({ disableCourseName: false }) }
        const optionCourseName = []
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        serviceD.QueryCourses({
            payload: {
                "ExamSceneId": value
            }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.map((item) => {
                optionCourseName.push(<Option value={item.CourseId}>{item.CourseName}</Option>)
            })
            this.setState({
                ExamSceneValue: value,
                optionCourseName: optionCourseName
            })
        })
    }
    //根据学科获取座位号
    CourseName = (value) => {
        this.setState({
            SeatNumberValue: "请选择座位号",
            typeValue: "请选择题型",
            numberValue: "请选择题号",
            inputSelect: "考生信息(准考证+姓名)",
            disableQuestionCategoryName: true,
            disableQuestionIndex: true,
            disableSearch: true,
            imgsrc: "",

        })
        if (value) { this.setState({ disableSeatNumber: false }) }
        const optionSeatNumber = []
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        service.GetSeatNumbers({
            payload: {
                "ExamSceneId": this.state.ExamSceneValue
            }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.SeatNumbers.map((item) => {
                optionSeatNumber.push(<Option value={item}>{item}</Option>)
            })
            this.setState({
                CourseNameValue: value,
                optionSeatNumber: optionSeatNumber
            })
        })
    }
    //根据座位号获取考生信息以及题型
    SeatNumber = (value) => {
        this.setState({
            typeValue: "请选择题型",
            numberValue: "请选择题号",
            inputSelect: "考生信息(准考证+姓名)",
            disableQuestionIndex: true,
            disableSearch: true,
            imgsrc: "",
        })
        const optionType = []
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        service.GetStudentInfo({
            payload: {
                "ExamSceneId": this.state.ExamSceneValue,
                "SeatNumber": value
            }
        }).then((data) => {
            layer.close(loading);
            this.setState({
                inputSelect: data.ReturnEntity.StudentInfo
            })
        })
        if (value) { this.setState({ disableQuestionCategoryName: false }) }
        service.GetQuestionCategories({
            payload: {
                "ExamSceneId": this.state.ExamSceneValue,
                "CourseId": this.state.CourseNameValue,
                "SearchType": 2,
            }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.QuestionCategories.map((item) => {
                optionType.push(<Option value={item.QuestionCategoryId}>{item.QuestionCategoryName}</Option>)
            })
            this.setState({
                SeatNumberValue: value,
                optionType: optionType
            })
        })
    }
    //错题类型取值
    onChangeRadio = (e) => {
        this.setState({
            editoption: e.target.value
        })
    }
    //错题描述取值
    getValue = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }
    //通过题型获取题号
    QuestionCategoryName = (value) => {
        this.setState({ numberValue: "请选择题号", disableSearch: true, imgsrc: "", typeValue: value })
        const optionNUmber = []
        if (value) { this.setState({ disableQuestionIndex: false }) }
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        service.GetQuestionOrderIndex({
            payload: {
                "ExamSceneId": this.state.ExamSceneValue,
                "CourseId": this.state.CourseNameValue,
                "SeatNumber": this.state.SeatNumberValue,
                "QuestionCategoryId": value
            }
        }).then((data) => {
            layer.close(loading);
            data.ReturnEntity.QuestionIndex.map((item) => {
                optionNUmber.push(<Option value={item}>{item}</Option>)
            })
            this.setState({
                optionNUmber: optionNUmber
            })
        })

    }
    //题号下拉框
    QuestionIndex = (value) => {
        this.setState({ imgsrc: "", })
        if (value) {
            this.setState({
                disableSearch: false,
                numberValue: value,
            })
        }
    }
    //查询
    search = () => {
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        service.GetPicture({
            payload: {
                "ExamSceneId": this.state.ExamSceneValue,//考试场次Id
                "CourseId": this.state.CourseNameValue,//科目Id
                "SeatNumber": this.state.SeatNumberValue,//座位号
                "QuestionCategoryId": this.state.typeValue,//题型Id
                "QuestionIndex": this.state.numberValue,//题号
            }
        }).then((data) => {
            layer.close(loading);
            if (data.ReturnEntity) {
                this.setState({
                    imgsrc: data.ReturnEntity
                })
            } else {
                this.setState({
                    imgsrc: false
                })
            }
        })
    }
    render() {
        return (
            <div className={style.newdiv}>
                <ModalContent
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.props.Newshow}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    disableCourseName={this.state.disableCourseName}
                    disableSeatNumber={this.state.disableSeatNumber}
                    disableQuestionCategoryName={this.state.disableQuestionCategoryName}
                    disableQuestionIndex={this.state.disableQuestionIndex}
                    ExamScene={this.ExamScene}
                    CourseName={this.CourseName}
                    SeatNumber={this.SeatNumber}
                    QuestionCategoryName={this.QuestionCategoryName}
                    QuestionIndex={this.QuestionIndex}
                    inputSelect={this.state.inputSelect}
                    search={this.search}
                    disableSearch={this.state.disableSearch}
                    imgsrc={this.state.imgsrc}
                    optionExamScene={this.state.optionExamScene}
                    optionCourseName={this.state.optionCourseName}
                    optionSeatNumber={this.state.optionSeatNumber}
                    optionType={this.state.optionType}
                    optionNUmber={this.state.optionNUmber}
                    reload={this.reload}
                    onChangeRadio={this.onChangeRadio}
                    radio={this.state.radio}
                    getValue={this.getValue}
                    onSave={this.onSave}
                    CourseNameValue={this.state.CourseNameValue}
                    SeatNumberValue={this.state.SeatNumberValue}
                    typeValue={this.state.typeValue}
                    numberValue={this.state.numberValue}
                    ExamSceneValue={this.state.ExamSceneValue}
                    disableExamScene={this.state.disableExamScene}
                    editoption={this.state.editoption}
                    title={this.state.title}
                />
            </div>
        )
    }
}
export default New