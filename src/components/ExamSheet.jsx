import React from "React";
import { Button, LocaleProvider, Pagination, Table } from "antd";
import "moment/locale/zh-cn";
import UrlHelper from "js-url-helper";
import zhCN from "antd/lib/locale-provider/zh_CN";
import style from "./ExamSheet.less";
import * as service from "../services/commonServices";
import DownloadFile from "../components/DownloadFile";
import defaultImg from "../assets/images/data-null.png";

const urlHelper = new UrlHelper(location);
let searchParam = urlHelper.getSearchParam();

class TabsSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      PageIndex: 1,
      PageSize: 10,
      misstime: "",
      total: "",
      imgUrl: defaultImg,
      text: '暂无数据',
      tableBodyH: "100%",
      pagereturn: 1,
    }
  }

  state = {
    iconLoading: false,
  }
  //导出
  export = () => {
    let loading = layer.msg('加载中...', {
      icon: 16
      , shade: 0.3
      , time: 0
    });
    service.ExportAbsentRecords({
      payload: {
        "ExamSceneId": searchParam.examSceneId,
      }
    }).then((response) => {
      layer.close(loading);
      DownloadFile(response);
    })
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.reload == "6") {
      this.tablecontent();
      this.props.leaveTab(false)
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight);
    this.setState({
      PageIndex: "1",
      PageSize: "10"
    }/*, () => {
      this.tablecontent();
    }*/)
  }

  //每次离开页面后执行
  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  /**
   * 设置表格的高度
   */
  setTableHeight = () => {
    if (this.state.content.length) {
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
  //切换页码
  onChange = (pageNumber) => {
    this.setState({
      pagereturn: pageNumber,
      PageIndex: pageNumber
    }, () => {
      this.tablecontent()
    })
  };
  //更改显示条数
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      PageSize: pageSize,
      pagereturn: current,
      PageIndex: current
    }, () => {
      this.tablecontent()
    })
  }
  //加载表格内容
  tablecontent = () => {
    let loading = layer.msg('加载中...', {
      icon: 16
      , shade: 0.3
      , time: 0
    });
    this.setState({
      misstime: Math.floor(this.props.MissExamTimeLength / 60)
    })
    let Content = [];
    service.AbsentRecords({
      payload: {
        "ExamSceneId": searchParam.examSceneId,
        "PageIndex": this.state.PageIndex,
        "PageSize": this.state.PageSize
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({
        total: data.ReturnEntity.TotalCount
      })
      data.ReturnEntity.Records.map((item, index) => {
        Content.push({
          key: index,
          registrationNumber: item.StudentCode,
          name: item.UserTrueName,
          SeatNumber: item.SeatNumber,
          AbsentContent: item.AbsentCourses,
          status: "缺考"
        })
      }),
        this.setState({
          content: Content
        }, () => {
          this.setTableHeight()
        })
    })
  }

  render() {
    const columns = [{
      title: '准考证号', dataIndex: 'registrationNumber', key: 'registrationNumber', width: 160
    }, {
      title: '姓名', dataIndex: 'name', key: 'name', width: 100
    }, {
      title: '座位号', dataIndex: 'SeatNumber', key: 'SeatNumber', width: 100
    }, {
      title: '缺考学科', dataIndex: 'AbsentContent', key: 'testTime', width: 160
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: text => <span className={style.redcolor}>{text}</span>,
    }];
    if (this.state.misstime === "" || this.state.misstime === 0) {
      var tit = <span className={style.p}>关闭考试后统计缺考</span>
    } else {
      var tit = <span className={style.p}>开考后<span
        className={style.redcolor}>{this.state.misstime}</span>分钟进行统计，关闭考试后系统会再次统计</span>
    }
    return (
      <div className={style.Exambox}>
        <div className={style.div}>
          {tit}
          <Button className={style.loadingBtn} type="primary" onClick={this.export}>
            导出
          </Button>
        </div>
        <Table
          locale={{
            emptyText: (
              <div>
                <img src={this.state.imgUrl} />
                <p>{this.state.text}</p>
              </div>),
            filterConfirm: '确定'
          }}
          columns={columns}
          pagination={false}
          dataSource={this.state.content}
          className={style.ExamTable}
          scroll={{ x: 680, y: this.state.tableBodyH }}
        />
        <LocaleProvider locale={zhCN}>
          <Pagination className={style.Exampage}
            current={this.state.pagereturn}
            showSizeChanger
            pageSize={this.state.PageSize}
            onShowSizeChange={this.onShowSizeChange}
            total={this.state.total}
            onChange={this.onChange}
            pageSizeOptions={['10', '20', '50', '100']}
            showTotal={(total, range) => '显示' + ' ' + `${range[0]}-${range[1]}, 共 ${total} ` + '记录'}
          />
        </LocaleProvider>
      </div>
    )
  }
}

export default TabsSheet
