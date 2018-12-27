import React from "React";
import {Button, LocaleProvider, Pagination, Select, Table, Tooltip} from "antd";
import "moment/locale/zh-cn";
import style from "./InvigilatorRecord.less";
import BuildNew from "./BuildNew.jsx";
import UrlHelper from "js-url-helper";
import * as service from "../services/commonServices";
import zhCN from "antd/lib/locale-provider/zh_CN";
import DownloadFile from "../components/DownloadFile";
import defaultImg from "../assets/images/data-null.png";

const urlHelper = new UrlHelper(location);
const Option = Select.Option;
var searchParam = urlHelper.getSearchParam();

class TabsInvigilator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      PageIndex: 1,
      PageSize: 10,
      OperationType: 0,
      CourseId: 0,
      Current: 1,
      toogle: false,
      subjectName: [],
      selectSubject: [],
      titol: '',
      imgUrl: defaultImg,
      text: '暂无数据',
      tooltip: [],
      pagereturn: 1,
      tableBodyH: "100%",
    }
  }

  /**
   * 设置表格的高度
   */
  setTableHeight = () => {
    if ( this.state.content.length ) {
      let bodyH = document.body.offsetHeight;
      let heH = document.querySelector('.header-box').offsetHeight;
      let fotterH = document.querySelector('.footer-box').offsetHeight;
      let speacH = 455;
      let tabBodyH = bodyH - heH - fotterH - speacH;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };
  childadd = (value) => {

    if ( value === true ) {
      this.setState({
        pagereturn: 1,
        PageIndex: 1
      }, () => {
        this.tablecontent();
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.props.reload == "5" ) {
      this.tablecontent();
      this.props.leaveTab(false)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
    this.setState({
      PageIndex: "1",
      PageSize: "10"
    }/*, () => {
      this.tablecontent()
    }*/)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  explainDom = (Remark) => {
    return (
      <Tooltip title={`${this.state.tooltip}`}>
        <span className={style.explain}>{Remark}</span>

      </Tooltip>
    )
  }
  handleChange = (value) => {
    this.setState({
      CourseId: value
    })
  }
  handleChangeType = (value) => {
    this.setState({
      OperationType: value
    })
  }
  //查询按钮
  search = () => {
    this.setState({
      pagereturn: 1,
      PageIndex: "1"
    }, () => {
      this.tablecontent()
    })
  }
  //新建按钮
  buildNew = () => {
    this.setState({
      toogle: true
    })
  }
  onChange = (pageNumber) => {
    this.setState({
      pagereturn: pageNumber,
      PageIndex: pageNumber
    }, () => {
      this.tablecontent()
    })
  };

  export = () => {
    let loading = layer.msg('加载中...', {
      icon: 16
      , shade: 0.3
      , time: 0
    });
    service.ExportSuperviseRecords({
      payload: {
        "ExamSceneId": searchParam.examSceneId,//考试场次ID
        "CourseId": this.state.CourseId,//科目ID
        "OperationType": this.state.OperationType,//操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
      }
    }).then((response) => {
        layer.close(loading);
        DownloadFile(response);
      }
    )
  }
  cancel = (value) => {
    if ( value === false ) {
      this.setState({
        toogle: false
      })
    }
  }
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      PageSize: pageSize,
      pagereturn: current,
      PageIndex: current
    }, () => {
      this.tablecontent();
    })
  }
  tablecontent = () => {
    let Content = [];
    let loading = layer.msg('加载中...', {
      icon: 16
      , shade: 0.3
      , time: 0
    });
    service.SuperviseRecords({
      payload: {
        "ExamSceneId": searchParam.examSceneId,
        "PageIndex": this.state.PageIndex,
        "PageSize": this.state.PageSize,
        "OperationType": this.state.OperationType,
        "CourseId": this.state.CourseId,//科目ID
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({
        total: data.ReturnEntity.TotalCount
      })
      if ( data.ReturnEntity.Records.length ) {
        data.ReturnEntity.Records.map((Item, index) => {
          this.setState({
            tooltip: Item.Remark
          })
          Content.push({
            key: index,
            AbsentContent: Item.CourseNames,
            type: Item.OperationType,
            registrationNumber: Item.StudentCode,
            name: Item.UserTrueName,
            SeatNumber: Item.SeatNumber,
            recordtime: Item.CreatedDateTime,
            explain: this.explainDom(Item.Remark),
          });
        })
        this.setState({
          content: Content
        }, () => {
          this.setTableHeight()
        })
      } else {
        this.setState({
          content: []
        })
      }
    })
  }

  render() {
    const columns = [ {
      title: '科目', dataIndex: 'AbsentContent', key: 'AbsentContent', width: 200
    }, {
      title: '类型', dataIndex: 'type', key: 'type', width: 160, render: (text) => {
        switch (text) {
          case 1:
            return '考场延时';
          case 2:
            return '重考';
          case 3:
            return '考生延时';
          case 4:
            return '考生缩时';
          case 5:
            return '标记考生';
          case 6:
            return '强制交卷';
          case 7:
            return '监考';
          case 8:
            return '考试重考';
        }
      }
    }, {
      title: '准考证号', dataIndex: 'registrationNumber', key: 'registrationNumber', width: 200
    }, {
      title: '姓名', dataIndex: 'name', key: 'name', width: 100
    }, {
      title: '座位号', dataIndex: 'SeatNumber', key: 'SeatNumber', width: 100
    }, {
      title: '记录时间', dataIndex: 'recordtime', key: 'recordtime', width: 140
    }, {
      title: '说明', dataIndex: 'explain', key: 'explain', width: 160,
    } ];
    return (
      <div className={style.Exambox}>
        <div className={style.operation}>
          <Select defaultValue="请选择科目" className={style.input} style={{width: 120}} onChange={this.handleChange}>
            <Option value="0">请选择科目</Option>
            {this.props.CourseName.map((item, index) => <Option value={item.CourseId}>{item.CourseName}</Option>)}
          </Select>
          <Select defaultValue="请选择类型" className={style.input} style={{width: 120}} onChange={this.handleChangeType}>
            <Option value="0">请选择类型</Option>
            <Option value="1">考场延时</Option>
            <Option value="2">重考</Option>
            <Option value="3">考生延时</Option>
            <Option value="4">考生缩时</Option>
            <Option value="5">标记考生</Option>
            <Option value="6">强制交卷</Option>
            <Option value="7">监考</Option>
            <Option value="8">考试重考</Option>
          </Select>
          <Button type="primary" className={style.button} onClick={this.export}>导出</Button>
          <BuildNew childadd={this.childadd}/>
          <Button type="primary" className={style.buttond} onClick={this.search}>查询</Button>
        </div>
        <Table
          locale={{
            emptyText: (
              <div>
                <img src={this.state.imgUrl}/>
                <p>{this.state.text}</p>
              </div>),
            filterConfirm: '确定'
          }}
          columns={columns}
          pagination={false}
          dataSource={this.state.content}
          className={style.ExamTable}
          scroll={{x: 864, y: this.state.tableBodyH}}
        />
        <LocaleProvider locale={zhCN}>
          <Pagination className={style.Exampage}
                      current={this.state.pagereturn}
                      defaultCurrent={this.state.pagereturn}
                      onShowSizeChange={this.onShowSizeChange}
                      showQuickJumper={true}
                      pageSize={this.state.PageSize}
                      showSizeChanger
                      total={this.state.total}
                      onChange={this.onChange}
                      pageSizeOptions={[ '10', '20', '50', '100' ]}
                      showTotal={(total, range) => '显示' + ' ' + `${range[ 0 ]}-${range[ 1 ]}, 共 ${total} ` + '记录'}
          />
        </LocaleProvider>

      </div>
    )
  }
}

export default TabsInvigilator
