import React from "React";
import {Layout, Form, Icon, Input, Button, Tabs, Table, Pagination, LocaleProvider, Select} from 'antd';
import 'moment/locale/zh-cn';
import UrlHelper from 'js-url-helper';
import style from './TasksList.less';
import CheckLengthen from './CheckLengthen.jsx'
import MarkStudent from './MarkStudent.jsx'
import StudentAgain from './StudentAgain.jsx'
import ForcePaper from './ForcePaper.jsx'
import * as service from '../../services/detailsServices';
import classnames from "classnames";

const FormItem = Form.Item;
import defaultImg from "../../assets/images/data-null.png";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
import zhCN from 'antd/lib/locale-provider/zh_CN';

let urlHelper = new UrlHelper(location);
let query = urlHelper.getSearchParam();


class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PageIndex: 1,
      PageSize: 10,
      content: [],
      StudentTotalNumber: '',
      HandedStudentNumber: '',
      TotalCount: '',
      studentCodes: '',
      studentName: '',
      select: 0,
      currentPage: 1,
      imgUrl: defaultImg,
      text: '暂无数据',
      selectedRowKeys: [],
      allSelected: [],
      tableBodyH: '100%'
    };
    this.getList()
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  getList = () => {
    let that = this;
    let content = [];
    let loading = layer.msg('加载中', {
      icon: 16, shade: 0.3, time: 3000
    });
    service.GetExamScaneCourses({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": this.props.CourseId,
        "StudentCode": this.state.studentCodes,
        "UserTrueName": this.state.studentName,
        "Status": this.state.select,
        "PageIndex": this.state.PageIndex,
        "PageSize": this.state.PageSize
      }
    }).then(function (data) {
      layer.close(loading);
      for ( let i = 0; i < data.ReturnEntity.StudentInfos.length; i++ ) {
        content.push({
          key: i+ new Date(),
          registrationNumber: data.ReturnEntity.StudentInfos[ i ].StudentCode,
          name: data.ReturnEntity.StudentInfos[ i ].UserTrueName,
          SeatNumber: data.ReturnEntity.StudentInfos[ i ].SeatNumber,
          testTime: data.ReturnEntity.StudentInfos[ i ].BeginTime,
          remainingTime: data.ReturnEntity.StudentInfos[ i ].LeftTimeLength,
          handTestTime: data.ReturnEntity.StudentInfos[ i ].EndTime,
          usedTime: data.ReturnEntity.StudentInfos[ i ].ConsumerTimeLength,
          status: data.ReturnEntity.StudentInfos[ i ].Status,
          AnswerProgress: data.ReturnEntity.StudentInfos[ i ].AnswerProgress,
        });
      }
      that.setState({
        content: content,
        StudentTotalNumber: data.ReturnEntity.StudentTotalNumber,
        HandedStudentNumber: data.ReturnEntity.HandedStudentNumber,
        TotalCount: data.ReturnEntity.TotalCount,
      }, function () {
        that.setTableHeight()
      })
    });
  };
  selectedRow = (selectedRowKeys, selectedRows) => {
    let selected = [];
    for ( let i = 0; i < selectedRows.length; i++ ) {
      selected.push(selectedRows[ i ].registrationNumber)
    }
    this.state.allSelected = selected.join(",");
    this.setState({
      allSelected: this.state.allSelected,
      selectedRows: selectedRows.length
    });
  };
  onSelectAll=(selected, selectedRows, changeRows) => {
  };
  studentCodes = (e) => {  //获取学生准考证号
    this.state.studentCodes = e.target.value;
  };
  studentName = (e) => {  //获取学生姓名
    this.state.studentName = e.target.value;
  };
  handleChange = (value) => {   //下拉框获取值
    this.setState({
      select: value
    });
  };
  onShowSizeChange = (current, pageSize) => {   //下拉框切换页面
    this.setState({
      "ExamSceneId": query.examSceneId,
      "CourseId": this.props.CourseId,
      "StudentCode": this.state.studentCodes,
      "UserTrueName": this.state.studentName,
      "Status": this.state.select,
      PageIndex: current,
      PageSize: pageSize
    }, function () {
      this.getList();
    });
  };
  //考生重考后刷新页面
  reloadList = (value) => {
    if ( value ) {
      this.getList();
    }
  }
  onChange = (page, pageNumber) => {   //点击切换页面
    this.setState({
      "ExamSceneId": query.examSceneId,
      "CourseId": this.props.CourseId,
      "StudentCode": this.state.studentCodes,
      "UserTrueName": this.state.studentName,
      "Status": this.state.select,
      PageIndex: page,
      PageSize: pageNumber
    }, function () {
      this.getList();
    });
  };
  queryData = () => {  //查询
    this.setState({
      "ExamSceneId": query.examSceneId,
      "CourseId": this.props.CourseId,
      "StudentCode": this.state.studentCodes,
      "UserTrueName": this.state.studentName,
      "Status": this.state.select,
      PageIndex: 1,
      PageSize: this.state.PageSize
    }, function () {
      this.getList();
    });
  };
  /**
   * 设置表格的高度
   */
  setTableHeight = () => {
    if ( this.state.content.length ) {
      let bodyH = document.body.offsetHeight;
      let heH = document.querySelector('.header-box').offsetHeight;
      let fotterH = document.querySelector('.footer-box').offsetHeight;
      /*      let header = document.querySelector('.header').offsetHeight;
			let headerTab = document.querySelector('.headerTab').offsetHeight;
			let check = document.querySelector('.check').offsetHeight;
			let hasEsm = document.querySelector('.hasEsm').offsetHeight;
			let pagina = document.querySelector('.pagina').offsetHeight;*/
      let foot = 470;
      let tabBodyH = bodyH - heH - fotterH - foot;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };
   /*secondToDate=(result)=> {
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result =m + "分" + s+"秒";
  };*/
  render() {
    const columns = [ {
      title: '准考证号', dataIndex: 'registrationNumber', key: 'registrationNumber', width: 200
    }, {
      title: '姓名', dataIndex: 'name', key: 'name', width: 70
    }, {
      title: '座位号', dataIndex: 'SeatNumber', key: 'SeatNumber', width: 80
    }, {
      title: '开考时间', dataIndex: 'testTime', key: 'testTime', width: 160
    }, {
      title: '剩余时长', dataIndex: 'remainingTime', key: 'remainingTime', render: (text, record) => {
        return Math.floor((text / 60)) + '分钟';
      }, width: 90
    }, {
      title: '交卷时间', dataIndex: 'handTestTime', key: 'handTestTime', width: 160
    }, {
      title: '用时', dataIndex: 'usedTime', key: 'usedTime', render: (text, record) => {
        if ( record.status===3) {
          let m = Math.floor((text/60)) < 10 ? '0' + Math.floor((text/60)) : Math.floor((text/60));
          let s = Math.floor((text % 60)) < 10 ? '0' + Math.floor((text % 60)) : Math.floor((text % 60));
          return m + "分" + s+"秒";
        }else{
          return ''
        }

      }, width: 80
    },
      {
        title: '答卷进度', dataIndex: 'AnswerProgress', key: 'AnswerProgress', width: 80
      },
      {
        title: '状态', dataIndex: 'status', key: 'status', render: (text, record) => {
          switch (text) {
            case 1 :
              return '未开始';
            case 2 :
              return '考试中';
            case 3 :
              return '已交卷';
          }
        }, width: 70
      }
    ];
    const rowSelection = {  //表格方法
      onChange: this.selectedRow,
      onSelect: (record, selected, selectedRows) => {
      },
      onSelectAll: this.onSelectAll,
      getCheckboxProps: record => ({
        disabled: record.status !== 2,
      }),
    };
    return (
      <div className={style.main}>
        <Form style={{paddingLeft: "10px", borderLeft: "1px solid #e6e6e6"}}>
          <FormItem label="">
            <Input placeholder="请输入准考证号" onChange={this.studentCodes} style={{width: '130px'}}/>
          </FormItem>
          <FormItem label="">
            <Input placeholder="请输入姓名" onChange={this.studentName} style={{width: '130px'}}/>
          </FormItem>
          <FormItem label="">
            <Select defaultValue="请选择状态" style={{width: "130px", color: "#b3b3b3"}} onChange={this.handleChange}>
              <Option value="0">请选择状态</Option>
              <Option value="1">未开始</Option>
              <Option value="2">考试中</Option>
              <Option value="3">已交卷</Option>
            </Select>
          </FormItem>
        </Form>
        <div style={{float: 'right', paddingRight: '5px', borderRight: '1px solid #e6e6e6'}}
             className={classnames("check")}>
          <Button type="primary" onClick={this.queryData}>查询</Button>
          {/*        <Button type="primary" >延长时长</Button>*/}
          <CheckLengthen allSelected={this.state.allSelected}
                         selectedRows={this.state.selectedRows}
                         CourseId={this.props.CourseId}
                         IsAllowDelayExam={this.props.IsAllowDelayExam}
                         getList={this.getList}
          />
          <StudentAgain allSelected={this.state.allSelected}
                        selectedRows={this.state.selectedRows}
                        CourseId={this.props.CourseId}
                        reloadList={this.reloadList}
                        IsAllowReexamination={this.props.IsAllowReexamination}
                        getList={this.getList}
          />
          <MarkStudent allSelected={this.state.allSelected}
                       selectedRows={this.state.selectedRows}
                       CourseId={this.props.CourseId}
                       getList={this.getList}
          />
          <ForcePaper allSelected={this.state.allSelected}
                      selectedRows={this.state.selectedRows}
                      CourseId={this.props.CourseId}
                      getList={this.getList}/>
        </div>
        <div className={classnames(style.examination, "hasEsm")}>
          <div className={style.student}>考生已交卷数：<span
            className={style.handStudent}> <span>{this.state.HandedStudentNumber}</span></span>/ <span>{this.state.StudentTotalNumber}</span>
          </div>
        </div>
        <Table rowSelection={rowSelection}
               columns={columns}
               dataSource={this.state.content}
               className={style[ "ant-pagination" ]}
               scroll={{x: 864, y: this.state.tableBodyH}}
               pagination={false}
               locale={{
                 emptyText: (
                   <div>
                     <img src={this.state.imgUrl}/>
                     <p>{this.state.text}</p>
                   </div>),
                 filterConfirm: '确定'
               }}
        />
        <div className={classnames(style.paginationContent, "pagina")}>
          <LocaleProvider locale={zhCN}>
            <Pagination current={this.state.PageIndex}
                        defaultCurrent={this.state.PageIndex}
                        pageSize={this.state.PageSize}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        hideOnSinglePage={false}
                        onShowSizeChange={this.onShowSizeChange}
                        total={this.state.TotalCount}
                        onChange={this.onChange}
                        showTotal={(total, range) => '显示' + ' ' + `${range[ 0 ]}-${range[ 1 ]}, 共 ${total} ` + '记录'}
                        pageSizeOptions={[ '10', '20', '50', '100' ]}
            />
          </LocaleProvider>
        </div>
      </div>
    )
  }
}

export default TasksList
