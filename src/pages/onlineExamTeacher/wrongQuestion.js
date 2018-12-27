import ReactDOM from 'ReactDOM';
import { Select, LocaleProvider, Pagination, Modal, Table, Button, Layout, Tooltip } from 'antd';
import * as service from "../../services/commonServices";
import * as serviceD from "../../services/detailsServices";
import * as serviceE from "../../services/examServices";
import style from "./wrongQuestion.less";
import "moment/locale/zh-cn";
import zhCN from "antd/lib/locale-provider/zh_CN";
import BuildNew from "../../components/WrongNew.jsx";
import Report from "../../components/WrongReport.jsx";
import ReadOnly from "../../components/Wrongreadonly.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import defaultImg from "../../assets/images/data-null.png";
import SiderNav from "../../components/layout/SiderNav.jsx";
import DownloadFile from "../../components/DownloadFile";
import UrlHelper from "js-url-helper";
const Option = Select.Option;
const optionE = [];
const optionQ = [];
const optionG = [];
class Wrong extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: true,
      examSceneId: "",
      courseId: "",
      content: [],
      pageIndex: "1",
      pageSize: "10",
      status: "",
      type: "",
      tableBodyH: "100%",
      pagereturn: 1,
      option: [],
      ReportingExamSceneId: "",
      selectRows: [],
      selectkey: "",
      CourseId: "",
      QuestionCategoryId: "",
      WrongQuestionId: "",
      WrongIdArr: [],
      ExamArr: [],
      readonlyExamSceneId: "",
      show: false,
      Newshow: false,
      visible: false,
      poststaues: false,
      edit: false,
      text: "暂无数据",
      imgUrl: defaultImg,
      total: 0
    }
  }
  //设置高度
  setTableHeight = () => {
    if (this.state.content.length) {
      let bodyH = document.body.offsetHeight;
      let heH = document.querySelector('.header-box').offsetHeight;
      let fotterH = document.querySelector('.footer-box').offsetHeight;
      let speacH = 272;
      let tabBodyH = bodyH - heH - fotterH - speacH;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };
  //点击场次下拉框
  ExamScene = (value) => {
    this.setState({
      examSceneId: value
    })
  }
  //点击题型下拉框
  type = (value) => {
    this.setState({
      type: value
    })
  }
  //点击状态下拉框
  Status = (value) => {
    this.setState({
      status: value
    })
  }
  //查询列表
  search = () => {
    this.setState({
      pagereturn: 1,
      pageIndex: "1"
    }, () => {
      this.tablecontent()
    })
  }
  //点击学科下拉框
  handleChange = (value) => {
    if (value == "") {
      this.setState({
        check: true,
        type: "",
        courseId: value
      })
    }
    if (value != "") {
      this.setState({
        check: false,
        type: ""
      })
      this.setState({
        courseId: value
      }, () => {
        let loading = layer.msg('加载中...', {
          icon: 16,
          shade: 0.3
        });
        //查询题型
        service.GetQuestionCategories({
          payload: {
            // "ExamSceneId":this.state.examSceneId,
            "CourseId": this.state.courseId,
            "SearchType": 1,
          }
        }).then((data) => {
          layer.close(loading);
          const optionG = [];
          data.ReturnEntity.QuestionCategories.map((item) => {
            optionG.push(<Option value={item.QuestionCategoryId}>{item.QuestionCategoryName}</Option>)
          })
          this.setState({
            option: optionG
          })
        })
      })
    }
  }
  //勾选选项
  selectRow = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectRows: selectedRows,
      selectkey: selectedRowKeys
    })
  }
  //切换页数
  onChange = (pageNumber) => {
    this.setState({
      pagereturn: pageNumber,
      pageIndex: pageNumber,
    }, () => {
      this.tablecontent()
    })
  }
  //修改每页显示数
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      pageSize: pageSize,
      pagereturn: current,
      pageIndex: current
    }, () => {
      this.tablecontent()
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }
  //渲染完成后执行
  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
    //查询场次
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3
    });
    serviceE.GetExamSceneList({
      payload: {
        "PageSize": "100",
        "PageIndex": "1"
      }
    }).then((data) => {
      layer.close(loading);
      data.ReturnEntity.ExaminationList.map((item) => {
        optionE.push(<Option value={item.ExamSceneId}><Tooltip title={item.ExamSceneName} placement="topLeft">{item.ExamSceneName} </Tooltip></Option>)
      })
    })
    //查询学科
    serviceD.QueryCourses({ payload: {} }).then((data) => {
      data.ReturnEntity.map((item) => {
        optionQ.push(<Option value={item.CourseId}>{item.CourseName}</Option>)
      })
    })

    //错题列表
    this.setState({
      PageIndex: "1",
      PageSize: "10"
    }, () => {
      this.tablecontent()
    })
  }
  //关闭查看
  cancel = (value) => {
    if (value) {
      this.setState({
        show: false
      })
    }
  }
  //新增修改关闭
  addcancel = (value) => {
    if (value) {
      this.setState({
        Newshow: false,
        edit: false,

      })
    }
  }
  //新增成功后刷刷新表格
  reload = (value) => {
    if (value) {
      this.tablecontent()
    }
  }
  //上报成功后刷刷新表格
  ReportStaues = (value) => {
    if (value) {
      this.tablecontent()
    }
  }
  //点击题号
  editNew = (item) => {
    if (item.Status == 1) {
      this.setState({
        Newshow: true,
        edit: true,
        WrongQuestionId: item.WrongQuestionId
      })
    } else {
      this.setState({
        show: true,
        WrongQuestionId: item.WrongQuestionId,
        poststaues: true
      })
    }
  }
  //新增
  newAdd = () => {
    this.setState({
      Newshow: true,
      edit: false,
      WrongQuestionId: '',
    })
  }
  //导出
  export = () => {
    const WrongIdArr = [];
    const ExamArr = [];
    this.state.selectRows.map((item) => {
      WrongIdArr.push(`${item.WrongQuestionId}`)
      ExamArr.push(`${item.ReportingExamSceneId}`)
    })
    this.setState({
      WrongIdArr: WrongIdArr,
      ExamArr: ExamArr
    }, () => {
      if (this.state.WrongIdArr.length == 0 || this.state.ExamArr.length == 0) {
        this.setState({
          visible: true,
        })
      } else {
        let loading = layer.msg('加载中...', {
          icon: 16
          , shade: 0.3
          , time: 0
        });
        service.ExportRecords({
          payload: {
            "ExamSceneId": this.state.ExamArr,
            "WrongQuestionId": this.state.WrongIdArr
          }
        }).then((response) => {
          layer.close(loading);
          DownloadFile(response);
          this.tablecontent()
        })
      }
    })
  }
  onCreate = () => {
    this.setState({
      visible: false,
    })
  }
  //渲染列表
  tablecontent = () => {
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3
    });
    const Content = [];
    service.GetWrongQuestions({
      payload: {
        "ExamSceneId": this.state.examSceneId,//考试场次Id
        "CourseId": this.state.courseId,//科目Id
        "QuestionCategoryId": this.state.type,//题型Id
        "Status": this.state.status,//状态，1未处理、2已导出、3已上报
        "PageIndex": this.state.pageIndex,//当前页码
        "PageSize": this.state.pageSize//每页显示数
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({
        total: data.ReturnEntity.TotalCount
      })
      if (data.ReturnEntity.Entities.length) {
        data.ReturnEntity.Entities.map((item, index) => {
          Content.push({
            key: index,
            ReportingExamSceneId: item.ReportingExamSceneId,
            ReportingExamSceneName: item.ReportingExamSceneName,
            CourseName: item.CourseName,
            StudentCode: item.StudentCode,
            UserTrueName: item.UserTrueName,
            SeatNumber: item.SeatNumber,
            QuestionCategoryName: item.QuestionCategoryName,
            QuestionIndex: <a href="javascript:;" onClick={() => { this.editNew(item) }}>{item.QuestionIndex}</a>,
            CreatedTime: item.CreatedTime,
            Status: item.Status,
            CourseId: item.CourseId,
            QuestionCategoryId: item.QuestionCategoryId,
            WrongQuestionId: item.WrongQuestionId
          })
        })
        this.setState({
          content: Content,
        }, () => {
          this.setTableHeight()
        })
      }
      else {
        this.setState({
          content: []
        })
      }
    })
  }
  render() {
    const columns = [{
      title: '考试场次',
      dataIndex: 'ReportingExamSceneName',
      width: 250,

    }, {
      title: '学科',
      dataIndex: 'CourseName',
      width: 100,
    }, {
      title: '准考证号',
      dataIndex: 'StudentCode',
      width: 140,
    }, {
      title: '姓名',
      dataIndex: 'UserTrueName',
      width: 80,
    }, {
      title: '座位号',
      dataIndex: 'SeatNumber',
      width: 120,
    }, {
      title: '题型',
      dataIndex: 'QuestionCategoryName',
      width: 120,
    }, {
      title: '题号',
      dataIndex: 'QuestionIndex',
      width: 80,
    }, {
      title: '创建时间',
      dataIndex: 'CreatedTime',
      width: 140,
    }, {
      title: '状态',
      dataIndex: 'Status',
      width: 100,
      render: (text) => {
        switch (text) {
          case 1:
            return '未处理'
          case 2:
            return '已导出'
          case 3:
            return '已上报'
        }
      }
    }]
    const rowSelection = {
      onChange: this.selectRow,
      getCheckboxProps: record => ({
        disabled: record.Status === 3,
      }),
    };
    return (
      <div className={style.content}>
        <Header />
        <Layout className={"teacher-layout h-all"}>
          <SiderNav />
          <Layout className={style.layoutBox}>
            <div className={style.margin}>
              <h5>错题上报</h5>
              <div className={style.selectList}>
                <Select style={{ width: 195 }} placeholder="请选择考试场次" className={style.select} onChange={this.ExamScene}>
                  <Option value="">请选择场次</Option>
                  {optionE}
                </Select>
                <Select style={{ width: 128 }} placeholder="请选择学科" className={style.select} onChange={this.handleChange}>
                  <Option value="">请选择学科</Option>
                  {optionQ}
                </Select>
                <Select style={{ width: 128 }} className={style.select} disabled={this.state.check} onChange={this.type} value={this.state.type} >
                  <Option value="">请选择题型</Option>
                  {this.state.option}
                </Select>
                <Select style={{ width: 128 }} placeholder="请选择状态" className={style.select} onChange={this.Status}>
                  <Option value="">请选择状态</Option>
                  <Option value="1">未处理</Option>
                  <Option value="2">已导出</Option>
                  <Option value="3">已上报</Option>

                </Select>
                <div className={style.titButton}>
                  <Button type="primary" className={style.firstbutton} onClick={this.search}>查询</Button>
                  <Button type="primary" onClick={() => this.newAdd(true)}>新增</Button>
                  <Report ReportStaues={this.ReportStaues} selectRows={this.state.selectRows} selectkey={this.state.selectkey}></Report>
                  <Button type="primary" className={style.button} onClick={this.export}>导出错题包</Button>
                </div>
              </div>
              <Table
                locale={{
                  emptyText: (
                    <div>
                      <img src={this.state.imgUrl} />
                      <p>{this.state.text}</p>
                    </div>),
                }}
                rowSelection={rowSelection}
                columns={columns}
                pagination={false}
                dataSource={this.state.content}
                className={style.ExamTable}
                scroll={{ x: 864, y: this.state.tableBodyH }}
              />
              <LocaleProvider locale={zhCN}>
                <Pagination className={style.notice}
                  showSizeChanger
                  current={this.state.pagereturn}
                  onShowSizeChange={this.onShowSizeChange}
                  defaultCurrent={this.state.pagereturn}
                  total={this.state.total}
                  showQuickJumper={false}
                  onChange={this.onChange}
                  pageSizeOptions={['10', '20', '50', '100']}
                  showTotal={(total, range) => '显示' + ' ' + `${range[0]}-${range[1]}, 共 ${total} ` + '记录'}
                />
              </LocaleProvider>
            </div>
          </Layout>
        </Layout>
        <Footer />
        <ReadOnly
          show={this.state.show}
          WrongQuestionId={this.state.WrongQuestionId}
          cancel={this.cancel}
          poststaues={this.state.poststaues}
        />
        <BuildNew
          Newshow={this.state.Newshow}
          Addcancel={this.addcancel}
          reload={this.reload}
          WrongQuestionId={this.state.WrongQuestionId}
          edit={this.state.edit} >
        </BuildNew>
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
          <p>请选择导出数据</p>
        </Modal>
      </div>
    )
  }
}
ReactDOM.render((<Wrong />), document.getElementById('main'));