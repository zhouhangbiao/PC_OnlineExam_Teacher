import ReactDOM from "ReactDOM";
import React from "React";
import { Layout, LocaleProvider, Pagination, Table, Tooltip } from "antd";
import "moment/locale/zh-cn";
import zhCN from "antd/lib/locale-provider/zh_CN";
import style from "./noticeList.less";
import UrlHelper from "js-url-helper";
import * as service from "../../services/commonServices";
import defaultImg from "../../assets/images/data-null.png";
import Information from "../../components/Noticedetailed.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";
const urlHelper = new UrlHelper(location);
const localStorage = window.localStorage;
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableBodyH: "100%",
      content: [],
      pageIndex: 0,
      pageSize: 10,
      text: "暂无数据",
      imgUrl: defaultImg,
      total: 0,
      pagereturn: 1,
      AnnouncementId: 0,
      detailstate: false,
      poststate: false,
      recordId: '',
      title: '',
      time: '',
      IsMockTest: false,
      tooltip: [],
      AnnouncementNotReadNumber: localStorage.AnnouncementNotReadNumber * 1 || 0,
    }
  }

  //设置高度
  setTableHeight = () => {
    if (this.state.content.length) {
      let bodyH = document.body.offsetHeight;
      let heH = document.querySelector('.header-box').offsetHeight;
      let fotterH = document.querySelector('.footer-box').offsetHeight;
      let tabHeder = document.querySelector('.teacher-layout .ant-table-header').offsetHeight;
      let speacH = 10;
      let PageH = 37;
      let tabBodyH = bodyH - heH - fotterH - tabHeder - speacH - PageH - 17;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
    this.setState({
      pageIndex: 1,
      pageSize: 10
    }, () => {
      this.tablecontent()
    })
  }

  //显示完整标题
  explainDom = (AnnouncementTitle) => {
    return (
      <Tooltip className={style.length} title={`${this.state.tooltip}`} placement="topLeft">
        <span className={style.explain}>{AnnouncementTitle}</span>
      </Tooltip>
    )
  }
  //切换页码
  onChange = (pageNumber) => {
    this.setState({
      poststate: false,
      pagereturn: pageNumber,
      pageIndex: pageNumber
    }, () => {
      this.tablecontent()
    })
  }
  //   修改每页显示数
  onShowSizeChange = (current, pageSize) => {
    this.setState({
      poststate: false,
      pageSize: pageSize,
      pagereturn: current,
      pageIndex: current
    }, () => {
      this.tablecontent()
    })
  }
  //列表参数传递给state
  readNotice = (record) => {
    if (record.Status === 0) {
      record.Status = 1;
      if (this.state.AnnouncementNotReadNumber > 0) {
        this.setState({
          AnnouncementNotReadNumber: this.state.AnnouncementNotReadNumber - 1
        }, () => {
          localStorage.setItem('AnnouncementNotReadNumber', this.state.AnnouncementNotReadNumber);
        })

      }
    }
    this.setState({
      detailstate: true,
      poststate: true,
      recordId: record.AnnouncementId,
      title: record.AnnouncementTitle,
      time: record.CreateDateTime
    })
  }
  //渲染列表结构
  tablecontent = () => {
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3
    });
    let Content = [];
    service.GetAnnouncementList({
      payload: {
        "PageIndex": this.state.pageIndex,
        "PageSize": this.state.pageSize
      }
    }).then((data) => {
      layer.close(loading);
      this.setState({ AnnouncementNotReadNumber: data.ReturnEntity.NotReadNumber })
      data.ReturnEntity.AnnouncementList.map((Item, index) => {
        this.setState({
          tooltip: Item.AnnouncementTitle
        })
        Content.push({
          key: index,
          AnnouncementTitle: this.explainDom(Item.AnnouncementTitle),
          CreateDateTime: Item.CreateDateTime,
          Status: Item.Status,
          AnnouncementId: Item.AnnouncementId
        })
      })
      this.setState({
        content: Content,
        total: data.ReturnEntity.TotalCount
      }, () => {
        this.setTableHeight()
      })
    })
  }
  child = () => {
    if (this.state.poststate) {
      return (
        <Information
          visible={this.state.detailstate}
          recordId={this.state.recordId}
          title={this.state.title}
          time={this.state.time}
          onChange={this.InformationOnChange}
        >

        </Information>
      )
    }
    else {
      return
    }
  }

  InformationOnChange = (flg) => {
    this.setState({ detailstate: flg })
  }

  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'AnnouncementTitle',
      render: (text1) => <a href="javascript:;" className={style.title} onClick={this.readNotice}>{text1}</a>

    }, {
      title: '发布时间',
      dataIndex: 'CreateDateTime',
      width:180,
    }, {
      title: '状态',
      dataIndex: 'Status',
      width:180,
      render: (text) => {
        switch (text) {
          case 0:
            return <span className={style.redcolor}>未读</span>
          case 1:
            return '已读'
        }
      }
    }]
    return (

      <div>
        <Header IsMockTest={this.state.isMockTest} Number={this.state.AnnouncementNotReadNumber} />
        <Layout className={"teacher-layout h-all"}>
          <SiderNav />
          <Layout className={style.layoutBox}>
            <h5 className={style.layoutBoxTitle}>系统公告</h5>
            <Table
              locale={{
                emptyText: (
                  <div>
                    <img src={this.state.imgUrl} />
                    <p>{this.state.text}</p>
                  </div>),
              }}
              columns={columns}
              pagination={false}
              dataSource={this.state.content}
              className={style.ExamTable}
              scroll={{ x: 864, y: this.state.tableBodyH }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    this.readNotice(record)
                  },
                }
              }}
            />
            <LocaleProvider locale={zhCN}>
              <Pagination className={style.notice}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange}
                defaultCurrent={this.state.pagereturn}
                total={this.state.total}
                showQuickJumper={false}
                onChange={this.onChange}
                pageSizeOptions={['10', '20', '50', '100']}
                showTotal={(total, range) => '显示' + ' ' + `${range[0]}-${range[1]}, 共 ${total} ` + '记录'}
              />
            </LocaleProvider>
            {this.child()}
          </Layout>
        </Layout>
        <Footer />
      </div>
    )
  }

}

ReactDOM.render((<List />), document.getElementById('main'));
