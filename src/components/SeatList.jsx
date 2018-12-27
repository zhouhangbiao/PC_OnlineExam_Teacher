/**
 * 座位表
 * Created by Administrator on 2018/8/20.
 */
import React from "React";
import {Button, Col, Layout, LocaleProvider, Modal, Pagination, Progress, Row, Table} from "antd";
import classnames from "classnames";
import style from "./TableList.less";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import SiderNav from "./layout/SiderNav.jsx";
import DataNull from "./DataNull.jsx";
import zhCN from "antd/lib/locale-provider/zh_CN";
import * as service from "../services/seatServices";
import * as cef from "../components/CefRunTime";
import DownloadFile from "../components/DownloadFile";

const {Content} = Layout;
const columns = [{
  title: '机房座位号',
  dataIndex: 'SeatNumber',
  width: '40%',
}, {
  title: '考试机MAC地址',
  dataIndex: 'MacAddress',
  width: '50%',
}, {
  title: '操作',
  dataIndex: 'StatusFlag',
  width: '10%',
}];

/**
 * 考试场次列表
 */
class ExamSceneList extends React.Component {
  /**
   * 构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      allVisible: false,
      seatList: null,
      pageSize: 10,
      pageIndex: 1,
      dataSource: [],
      tableBodyH: '100%',
      pageCount: 0,
      IsMockTest: false,
      importExamDataProgress: 0,
      progressVisible: false
    };
    this.getSeatList();

    window.updateImportSeatingArrange = this.updateImportSeatingArrange;
  }

  /**
   * 组件渲染完成
   */
  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight);
  }

  /**
   * 组件从 DOM 中移除之前立刻被调用
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  /**
   * 获取座位表数据
   */
  getSeatList = () => {
    const {pageIndex, pageSize} = this.state;

    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.GetSeatList({
      payload: {
        "PageSize": pageSize,
        "PageIndex": pageIndex
      }
    }).then(data => {
      layer.close(loading);

      if (data.ReturnEntity) {
        if (data.ReturnEntity.SeatList && data.ReturnEntity.SeatList.length) {
          this.setState({
            seatList: data.ReturnEntity.SeatList,
            pageCount: data.ReturnEntity.PageCount,
          }, this.exchangeData)
        } else {
          this.isFirstPage(pageIndex);
        }
      }
    })
  };

  /**
   * 如果不是第一页没有数据时自动跳转到第一页
   * @param pageIndex 当前页吗
   */
  isFirstPage = (pageIndex) => {
    if (pageIndex !== 1) {
      this.setState({
        pageIndex: 1
      }, () => {
        this.getSeatList();
      });
    } else {
      this.setState({
        seatList: [],
      })
    }
  };

  /**
   * 重置表格数据
   */
  exchangeData = () => {
    const {seatList} = this.state;
    let data = [];
    for (let i = 0; i < seatList.length; i++) {
      data.push({
        key: i,
        SeatNumber: seatList[i].SeatNumber,
        MacAddress: seatList[i].MacAddress,
        StatusFlag: this.statusDom(seatList[i].StatusFlag, seatList[i].SeatNumber, seatList[i].MacAddress),
      });
    }

    this.setState({dataSource: data}, function () {
      this.setTableHeight()
    })
  };
  /**
   *座位表状态DOM
   * @return {XML}
   */
  statusDom = (StatusFlag, SeatNumber, MacAddress) => {
    return (
      StatusFlag === 1 && <a seatId={SeatNumber} onClick={() => {
        this.seatUnlockFun(2, SeatNumber, MacAddress)
      }}>解锁</a>
    )
  };

  /**
   * 全部解锁提示
   */
  unlockAll = (data) => {
    if (data.length) {
      this.setState({visible: true})
    } else {
      this.setState({allVisible: true})
    }
  };


  /**
   * 解锁座位
   * @param type 1:全部解锁 2：单个解锁
   * @param SeatNumber 座位号
   * @param MacAddress mac地址
   */
  seatUnlockFun = (type, SeatNumber, MacAddress) => {
    let params = {};
    if (type === 1) {
      params = {
        "UnlockType": 1,
        "SeatInfo": {
          "MacAddress": "",
          "SeatNumber": "",
          "Ip": ""
        }
      };
    } else {
      params = {
        "UnlockType": 2,
        "SeatInfo": {
          "MacAddress": MacAddress,
          "SeatNumber": SeatNumber,
          "Ip": ""
        }
      };
    }
    service.SeatUnlock({
      payload: params
    }).then(data => {
      this.setState({visible: false});
      if (data.ReturnEntity === 1) {
        layer.msg('解锁成功', {icon: 1, time: 2000}, () => {
          this.setState({
            pageIndex: 1,
            pageSize: 10
          }, () => {
            this.getSeatList()
          })
        });
      } else {
        layer.msg('解锁失败', {icon: 2, time: 2000});
      }
    })
  };

  /**
   * 设置表格的高度
   */
  setTableHeight = () => {
    if (this.state.dataSource.length) {
      let bodyH = document.body.offsetHeight,
        heH = document.querySelector('.header-box').offsetHeight,
        fotterH = document.querySelector('.footer-box').offsetHeight,
        tabHeder = document.querySelector('.teacher-layout .ant-table-header').offsetHeight,
        seatBarH = document.querySelector('.seat-bar').offsetHeight,
        speacH = 10,
        PageH = 37;
      let tabBodyH = bodyH - heH - fotterH - tabHeder - speacH - PageH - seatBarH - 30 - 15;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };

  /**
   * 修改第几页回调
   * @param e pageIndex
   */
  pageOnChange = (e) => {
    this.setState({
      pageIndex: e
    }, function () {
      this.getSeatList();
    });
  };

  /**
   * 关闭弹框
   */
  handleCancel = (flg) => {
    if (flg) {
      this.setState({visible: false});
    } else {
      this.setState({allVisible: false})
    }

  };

  /**
   * 点击弹框确认按钮
   */
  handleOk = (flg) => {
    if (flg) {
      this.seatUnlockFun(1);
    } else {
      this.handleCancel(0);
    }
  };

  /**
   * 下载模板
   */
  downloadTemplate = () => {
    let loading = layer.msg('正在下载模板...', {
      icon: 16,
      shade: 0.3,
      time: 0
    });
    service.DownloadTemplate({
      payload: {}
    }).then((response) => {
      layer.close(loading);

      if (response.ReturnEntity === 0) {
        layer.msg('下载失败', {icon: 2, time: 2000});
      } else {
        DownloadFile(response);
      }
    })
  };

  /**
   * 导出
   */
  exportTemplate = (data) => {
    if (data.length) {
      let loading = layer.msg('正在导出...', {
        icon: 16,
        shade: 0.3,
        time: 0
      });
      service.ExportTemplate({
        payload: {}
      }).then((response) => {
        layer.close(loading);

        if (response.ReturnEntity === 0) {
          layer.msg('导出失败', {icon: 2, time: 2000});
        } else {
          DownloadFile(response);
        }
      })
    } else {
      this.unlockAll(0);
    }

  };

  /**
   * 导入文档
   */
  updateImportSeatingArrange = (progress, response) => {
    const result = JSON.parse(response);
    if (result.ResultType !== 0) {
      this.setState({
        importExamDataProgress: progress,
        progressVisible: true
      });
      cef.updateImportSeatingArrange(progress, response);
      if (result.ResultType === 1) {
        if (result.ReturnEntity.Status === 1) {
          setTimeout(() => {
            this.setState({
              progressVisible: false,
              pageIndex: 1,
              pageSize: 10
            }, () => {
              this.getSeatList()
            })
          }, 2000)
        } else {
          setTimeout(() => {
            this.setState({progressVisible: false})
          }, 2000)
        }
      }
    } else {
      this.setState({progressVisible: false});
      cef.updateImportSeatingArrange(progress, response);
    }
  };

  /**
   * 更改进度条的显示
   */
  changePress = () => {
    this.setState({
      progressVisible: false,
      importExamDataProgress: 0
    }, () => {
      cef.importSeatingArrange();
    });
  };


  /**
   * 修改每页显示数量回调
   * @param current 第几页
   * @param size 没有显示数量
   */
  pageOnShowSizeChange = (current, size) => {
    this.setState({
      pageSize: size
    }, function () {
      this.getSeatList();
    });
  };

  /**
   * 渲染DOM
   * @return {XML}
   */
  render() {
    return (
      <div>
        <Header IsMockTest={this.state.IsMockTest}/>
        <Layout className={"teacher-layout h-all"}>
          <SiderNav />
          <Layout className={style.layoutBox}>
            <Content>
              <header>首页 / <em className="font-title">座位表设置</em></header>
              <Row className={classnames(style.seatBar, "seat-bar")} type="flex" justify="center"
                   style={{"border-bottom": this.state.seatList && this.state.seatList.length ? "" : "1px solid #e8e8e8"}}>
                <Col span={12}>
                  <div style={{"display": this.state.progressVisible ? "inline-block" : "none", "width": "100%"}}>
                    <span>正在导入的数据</span>
                    <Progress
                      percent={this.state.importExamDataProgress}/>
                  </div>
                </Col>
                <Col span={12} className={"text-r"}>
                  <Button type="primary" onClick={() => {
                    this.unlockAll(this.state.seatList)
                  }}>全部解锁</Button>
                  <Button type="primary" onClick={this.downloadTemplate}>模板下载</Button>
                  <Button type="primary" onClick={() => {
                    this.changePress();


                  }}>导入</Button>
                  <Button type="primary" onClick={() => {
                    this.exportTemplate(this.state.seatList)
                  }}>导出</Button>
                </Col>
              </Row>
              {
                this.state.seatList && this.state.seatList.length ? (
                  <div>
                    <Table className={style.examSceneListBox} columns={columns} dataSource={this.state.dataSource}
                           scroll={{x: 864, y: this.state.tableBodyH}}
                           pagination={false}
                    />
                    <LocaleProvider locale={zhCN}>
                      <Pagination
                        current={this.state.pageIndex}
                        defaultCurrent={this.state.pageIndex}
                        pageSize={this.state.pageSize}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        hideOnSinglePage={false}
                        onShowSizeChange={this.pageOnShowSizeChange}
                        total={this.state.pageCount}
                        onChange={this.pageOnChange}
                        showTotal={(total, range) => `${"显示  " + range[0]}-${range[1]}, 共  ${total} 记录`}
                        pageSizeOptions={['10', '20', '50', '100']}
                      />
                    </LocaleProvider>
                  </div>
                ) : (<DataNull data={this.state.seatList}/>)
              }
            </Content>
          </Layout>
        </Layout>
        <Footer/>
        <Modal
          visible={this.state.visible}
          title={"全部解锁"}
          okText={"确定"}
          cancelText={"取消"}
          width={480}
          onOk={() => {
            this.handleOk(1)
          }}
          onCancel={() => {
            this.handleCancel(1)
          }}
          wrapClassName="unlock-seat"
        >
          <p className="text-c font-title">全部解锁将清空座位表信息，请确认是否继续？</p>
        </Modal>
        <Modal
          visible={this.state.allVisible}
          title={"全部解锁"}
          okText={"确定"}
          cancelText={"取消"}
          width={480}
          onOk={() => {
            this.handleOk(0)
          }}
          onCancel={() => {
            this.handleCancel(0)
          }}
          wrapClassName="unlock-seat"
        >
          <p className="text-c font-title">没有可操作数据</p>
        </Modal>
      </div>
    )
  }
}
export default ExamSceneList;
