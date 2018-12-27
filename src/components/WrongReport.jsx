import ReactDOM from 'ReactDOM';
import { Modal, Select, Form, Input, Button, Radio } from 'antd';
import * as service from '../services/commonServices';
import style from "./WrongReport.less";
class Report extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            content: "",
            report: []
        }
    }
    //上报
    onClick = () => {
        if (this.props.selectkey.length == 0) {
            this.setState({
                visible: true,
                content: "未选中记录"
            })
        } else {
            const propscontent = [];
            this.props.selectRows.map((item) => {
                propscontent.push({
                    ExamSceneId: item.ReportingExamSceneId,
                    CourseId: item.CourseId,
                    QuestionCategoryId: item.QuestionCategoryId,
                    QuestionIndex: item.QuestionIndex.props.children,
                    SeatNumber: item.SeatNumber
                })
            })
            this.setState({
                report: propscontent
            }, () => {
                let loading = layer.msg('加载中...', {
                    icon: 16,
                    shade: 0.3
                });
                service.Report({
                    payload: {
                        "Reports": this.state.report
                    }
                }).then((data) => {
                    layer.close(loading);
                    switch (data.ReturnEntity.ReportStatus) {
                        case 1:
                            layer.msg('脱机码登录时，不允许上报')
                            break;
                        case 2:
                            layer.msg('网络未连接，无法上报')
                            break;
                        case 3:
                            layer.msg('只允许上报未处理的数据')
                            break;
                        case 4:
                            this.props.ReportStaues(true);
                            layer.msg('上报成功')
                            break;
                        case 0:
                            layer.msg('上报失败')
                            break;
                    }
                })
            })

        }
    }
    onCreate = () => {
        this.setState({
            visible: false,
        })
    }
    render() {
        return (
            <div className={style.newdiv}>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onCancel={this.onCreate}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.onCreate}>
                            确定
                </Button>
                    ]}
                >
                    {this.state.content}
                </Modal>
                <Button type="primary" className={style.button} onClick={this.onClick}>上报</Button>
            </div>
        )
    }
}
export default Report