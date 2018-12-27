import React from "React";
import {Icon, LocaleProvider, Pagination, Table} from "antd";
import "moment/locale/zh-cn";
import UrlHelper from "js-url-helper";
import zhCN from "antd/lib/locale-provider/zh_CN";
import style from "./AnswerData.less";
import * as service from "../services/commonServices";
import defaultImg from "../assets/images/data-null.png";

const urlHelper = new UrlHelper(location);
var searchParam = urlHelper.getSearchParam();

class TabAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: [],
      total: "",
      columns: [],
      content: [],
      records: [],
      PageSize: "10",
      imgUrl: defaultImg,
      text: '暂无数据',
      tableBodyH: "100%",
      pagereturn: 1,
      IsNeedScantron: ''
    }
  }

  count = (o) => {
    var t = typeof o;
    if ( t == 'string' ) {
      return o.length;
    } else if ( t == 'object' ) {
      var n = 0;
      for ( var i in o ) {
        n++;
      }
      return n;
    }
    return false;
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

  componentDidUpdate(prevProps, prevState) {
    if ( this.props.reload == "7" ) {
      this.tablecontent();
      this.props.leaveTab(false)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
    this.setState({
      pageSize: '10',
      PageIndex: '1'
    }/*, () => {
      this.tablecontent()
    }*/)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  //改变显示条数
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      PageSize: pageSize,
      pagereturn: current,
      PageIndex: current
    }, () => {
      this.tablecontent()
    })
  }
  //修改页码
  onChange = (pageNumber) => {
    this.setState({
      pagereturn: pageNumber,
      PageIndex: pageNumber
    }, () => {
      this.tablecontent();
    })
  }
  //渲染表格
  tablecontent = () => {
    const Columns = [ {
      title: '准考证号', dataIndex: 'StudentCode', key: 'registrationNumber', width: 140
    }, {
      title: '姓名', dataIndex: 'UserTrueName', key: 'name', width: 60
    }, {
      title: '座位号', dataIndex: 'SeatNumber', key: 'SeatNumber', width: 80
    }, ];
    let loading = layer.msg('加载中...', {
      icon: 16
      , shade: 0.3
      , time: 0
    });
    service.PaperData({
      payload: {
        "ExamSceneId": searchParam.examSceneId,//场次ID
        "PageIndex": this.state.PageIndex,//当前页数
        "PageSize": this.state.PageSize //每页显示数
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({
        total: data.ReturnEntity.TotalCount,
        Title: data.ReturnEntity.Courses
      });
      data.ReturnEntity.Records[ 0 ].CoursesStatus.map((item, index) => {
        if ( data.ReturnEntity.Courses[ index ].IsNeedScantron === 1 ) {
          Columns.push({
              title: `${item.CourseName}`, width: 120, children: [
                {
                  title: `状态`, dataIndex: `HandResult${index}`, key: `Machine${index}`, width: 40, render: (text) => {
                    switch (text) {
                      case 1:
                        return '未开始'
                      case 2:
                        return '考试中'
                      case 3:
                        return '已交卷'
                      case 4:
                        return '不考'
                    }
                  }
                },
                {
                  title: `机考`,
                  dataIndex: `MachineHandResult${index}`,
                  key: `Machine${index}`,
                  width: 40,
                  render: (text) => {
                    switch (text) {
                      case 0:
                        return null
                      case 1:
                        return <Icon type="check" style={{fontSize: 18, color: '#08c'}}/>
                    }
                  }
                },
                {
                  title: `纸质`,
                  dataIndex: `PaperHandResult${index}`,
                  key: `Paper${index}`,
                  width: 40,
                  render: (text) => {
                    switch (text) {
                      case 0:
                        return null
                      case 1:
                        return <Icon type="check" style={{fontSize: 18, color: 'rgb(19,134,242)'}}/>
                    }
                  }
                }
              ]
            }
          );
        } else if ( data.ReturnEntity.Courses[ index ].IsNeedScantron === 0 ) {
          Columns.push({
              title: `${item.CourseName}`, width: 120, children: [
                {
                  title: `状态`, dataIndex: `HandResult${index}`, key: `Machine${index}`, width: 40, render: (text) => {
                    switch (text) {
                      case 1:
                        return '未开始'
                      case 2:
                        return '考试中'
                      case 3:
                        return '已交卷'
                      case 4:
                        return '不考'
                    }
                  }
                },
                {
                  title: `机考`,
                  dataIndex: `MachineHandResult${index}`,
                  key: `Machine${index}`,
                  width: 40,
                  render: (text) => {
                    switch (text) {
                      case 0:
                        return null
                      case 1:
                        return <Icon type="check" style={{fontSize: 18, color: '#08c'}}/>
                    }
                  }
                }
              ]
            }
          );
        }
      });
      this.setState({
        columns: Columns
      })
      let data1 = [];
      data.ReturnEntity.Records.map((r, i, c) => {
        r.CoursesStatus.map((item, j) => {
        });
        if ( this.count(r.CoursesStatus) == 1 ) {
          data1.push({
            key: i,
            StudentCode: r.StudentCode,
            UserTrueName: r.UserTrueName,
            SeatNumber: r.SeatNumber,
            HandResult0: r.CoursesStatus[ 0 ].HandResult,
            MachineHandResult0: r.CoursesStatus[ 0 ].MachineHandResult,
            PaperHandResult0: r.CoursesStatus[ 0 ].PaperHandResult,
          })
        } else if ( this.count(r.CoursesStatus) == 2 ) {
          data1.push({
            key: i,
            StudentCode: r.StudentCode,
            UserTrueName: r.UserTrueName,
            SeatNumber: r.SeatNumber,
            HandResult0: r.CoursesStatus[ 0 ].HandResult,
            MachineHandResult0: r.CoursesStatus[ 0 ].MachineHandResult,
            PaperHandResult0: r.CoursesStatus[ 0 ].PaperHandResult,
            MachineHandResult1: r.CoursesStatus[ 1 ].MachineHandResult,
            PaperHandResult1: r.CoursesStatus[ 1 ].PaperHandResult,
            HandResult1: r.CoursesStatus[ 1 ].HandResult,
          })
        } else if ( this.count(r.CoursesStatus) == 3 ) {
          data1.push({
            key: i,
            StudentCode: r.StudentCode,
            UserTrueName: r.UserTrueName,
            SeatNumber: r.SeatNumber,
            HandResult0: r.CoursesStatus[ 0 ].HandResult,
            MachineHandResult0: r.CoursesStatus[ 0 ].MachineHandResult,
            PaperHandResult0: r.CoursesStatus[ 0 ].PaperHandResult,
            MachineHandResult1: r.CoursesStatus[ 1 ].MachineHandResult,
            PaperHandResult1: r.CoursesStatus[ 1 ].PaperHandResult,
            HandResult1: r.CoursesStatus[ 1 ].HandResult,
            MachineHandResult2: r.CoursesStatus[ 2 ].MachineHandResult,
            PaperHandResult2: r.CoursesStatus[ 2 ].PaperHandResult,
            HandResult2: r.CoursesStatus[ 2 ].HandResult,
          })
        } else if ( this.count(r.CoursesStatus) == 4 ) {
          data1.push({
            key: i,
            StudentCode: r.StudentCode,
            UserTrueName: r.UserTrueName,
            SeatNumber: r.SeatNumber,
            HandResult0: r.CoursesStatus[ 0 ].HandResult,
            MachineHandResult0: r.CoursesStatus[ 0 ].MachineHandResult,
            PaperHandResult0: r.CoursesStatus[ 0 ].PaperHandResult,
            MachineHandResult1: r.CoursesStatus[ 1 ].MachineHandResult,
            PaperHandResult1: r.CoursesStatus[ 1 ].PaperHandResult,
            HandResult1: r.CoursesStatus[ 1 ].HandResult,
            MachineHandResult2: r.CoursesStatus[ 2 ].MachineHandResult,
            PaperHandResult2: r.CoursesStatus[ 2 ].PaperHandResult,
            HandResult2: r.CoursesStatus[ 2 ].HandResult,
            MachineHandResult3: r.CoursesStatus[ 3 ].MachineHandResult,
            PaperHandResult3: r.CoursesStatus[ 3 ].PaperHandResult,
            HandResult3: r.CoursesStatus[ 3 ].HandResult,
          })
        } else {
          data1.push({
            key: null
          })
        }
        this.setState({
          content: data1
        }, () => {
          this.setTableHeight()
        })
      })
    })
  }

  render() {
    return (
      <div className={style.Exambox}>
        <div className={style.title}>
          <p className={style.pleft}>{this.state.Title.map((item) => <span className={style.marginr}>{item.CourseName}：
            机考<span className={style.colorred}>{item.MachineHandCount}</span>/{item.TotalCount}，
            纸质<span className={style.colorred}>{item.PaperHandCount}</span>/{item.TotalCount}</span>)}</p>
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
          columns={this.state.columns}
          dataSource={this.state.content}
          pagination={false}
          className={style.ExamTable}
          scroll={{x: 680, y: this.state.tableBodyH}}
        />
        <LocaleProvider locale={zhCN}>
          <Pagination className={style.Exampage}
                      current={this.state.pagereturn}
                      defaultCurrent={this.state.pagereturn}
                      showSizeChanger
                      pageSize={this.state.PageSize}
                      onShowSizeChange={this.onShowSizeChange}
                      total={this.state.total}
                      showQuickJumper={true}
                      onChange={this.onChange}
                      pageSizeOptions={[ '10', '20', '50', '100' ]}
                      showTotal={(total, range) => '显示' + ' ' + `${range[ 0 ]}-${range[ 1 ]}, 共 ${total} ` + '记录'}
          />
        </LocaleProvider>
      </div>
    )
  }
}

export default TabAnswer
