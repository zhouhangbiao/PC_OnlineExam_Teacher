import ReactDOM from 'ReactDOM';
import { Modal, Select, Form, Input, Button, Radio } from 'antd';
import * as service from '../services/commonServices';
import style from "./Wrongreadonly.less";
class ReadOnly extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgsrc: "",
            type: "",
            describe: "",
            show: this.props.show,

        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.show && prevProps.show !== this.props.show) {
            this.readOnly()
        }
    }
    readOnly = () => {
        let loading = layer.msg('加载中...', {
            icon: 16,
            shade: 0.3
        });
        service.GetWrongQuestionDetail({
            payload: { "WrongQuestionId": this.props.WrongQuestionId }
        }).then((data) => {
            layer.close(loading);
            this.setState({
                imgsrc: data.ReturnEntity.QuestionPic,
                type: data.ReturnEntity.QuestionWrongType,
                describe: data.ReturnEntity.ReportingComment,
            })
        })

    }
    handleCancel = () => {
        this.setState({
            show: false
        })
        this.props.cancel(true);
    }
    render() {
        return (
            <div>
                <Modal
                    title="查看错题记录"
                    visible={this.props.show}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleCancel}>
                            关闭
                </Button>
                    ]}
                    width="800px"
                >
                    <div className={style.readPic}>
                        <img src={this.state.imgsrc}></img>
                    </div>
                    <p>错误类型：{this.state.type}</p>
                    <p>错题描述：{this.state.describe}</p>
                </Modal>
            </div>
        )
    }
}
export default ReadOnly