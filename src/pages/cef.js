import React from "React";
import ReactDOM from "ReactDOM";
import { Progress } from 'antd';
import * as cef from '../components/CefRunTime';

class CefDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      importExamDataProgress: 0
    };

    window.updateImportExamData = this.updateImportExamData;
  }

  /**
   * 更新导入考试数据
   * @param progress
   * @param response
   */
  updateImportExamData = (progress, response) => {
    this.setState({
      importExamDataProgress: progress
    });
    cef.updateImportExamData(progress, response);
  };

  render() {
    return (
      <div>
        <button onClick={() => {cef.importExamData()}}>导入考试数据</button>
        <button onClick={() => {cef.downloadExamData()}}>下载考试数据</button>
        <button onClick={() => {cef.uploadExamSceneData('考试场次Id')}}>答卷数据上传</button>
        <button onClick={() => {cef.clearExamData()}}>数据清理</button>
        <button onClick={() => {cef.importSeatingArrange()}}>导入座位表</button>
        <button onClick={() => {cef.importWrongQuestion()}}>导入错题信息</button>
        <p></p>
        <h3>导入考试数据 进度：</h3>
        <Progress percent={this.state.importExamDataProgress} />
      </div>
    );
  }
}

ReactDOM.render((
  <CefDemo />
), document.getElementById('app'));
