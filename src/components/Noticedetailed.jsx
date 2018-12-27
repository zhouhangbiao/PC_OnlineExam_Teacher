import React from "React";
import { Modal } from "antd";
import style from "./Noticedetailed.less";
import * as service from "../services/commonServices";

/**
 * 公告详情
 */
class Information extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      staus: this.props.visible,
      data: 0,
    }
  }
  componentWillMount() {
    this.getContent()
  }
  //每次点击后
  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && prevProps.visible !== this.props.visible) {
      this.getContent()
    }
  }

  /**
   * 获取内容数据
   */
  getContent = () => {
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3
    });
    service.GetAnnouncementInfo({
      payload: {
        "AnnouncementId": this.props.recordId
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({
        data: data.ReturnEntity
      })
    })
  };
  componentWillReceiveProps(props) {
    this.setState({ staus: this.props.visible })
  };

  /**
   * 关闭弹框
   * @param e
   */
  handleCancel = (e) => {
    this.props.onChange && this.props.onChange(false);
  };

  /**
   * 渲染DOM
   * @return {XML}
   */
  render() {
    return (
      <div>
        <Modal
          title="查看公告"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width="800px"
        >
          <div className={style.content}>
            <h5 className={style.title}><b>{this.props.title}</b></h5>
            <p className={style.center}>时间：{this.props.time}</p>
            <div dangerouslySetInnerHTML={{__html: this.state.data}}></div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Information
