/**
 * 数据下载初始化页面
 * Created by Administrator on 2018/8/18.
 */
import React from "React";
import {Layout, LocaleProvider, Pagination, Table, Tooltip} from "antd";
import UrlHelper from "js-url-helper";
import classnames from "classnames";
import style from "./TableList.less";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import SiderNav from "./layout/SiderNav.jsx";
import zhCN from "antd/lib/locale-provider/zh_CN";
import * as service from "../services/examServices";
import DataNull from "./DataNull.jsx";


const urlHelper = new UrlHelper(location);
const {Content} = Layout;
const columns = [{
  title: '考试场次',
  dataIndex: 'ExamSceneName',
}, {
  title: '科目',
  dataIndex: 'CourseId',
  width: 300
}, {
  title: '考试日期',
  dataIndex: 'ExamDate',
  width: 180

}, {
  title: '考试时间',
  dataIndex: 'ExamTime',
  width: 180

}, {
  title: '时长',
  dataIndex: 'TimeLength',
  width: 120

}, {
  title: '状态',
  dataIndex: 'Status',
  width: 120

}];

class ExamSceneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      examSceneList: null,
      pageSize: 10,
      pageIndex: 1,
      dataSource: [],
      tableBodyH: '100%',
      pageCount: 0,
      isMockTest: false
    };
    this.getExamSceneList()
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTableHeight)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTableHeight)
  }

  /**
   * 获取考试场次数据
   */
  getExamSceneList = () => {
    const t = this;
    let loading = layer.msg('加载中...', {
      icon: 16,
      shade: 0.3,
      time: 0
    });
    service.GetExamSceneList({
      payload: {
        "PageSize": this.state.pageSize,
        "PageIndex": this.state.pageIndex
      }
    }).then(data => {
      layer.close(loading);

      if (data.ReturnEntity) {
        if (data.ReturnEntity.ExaminationList && data.ReturnEntity.ExaminationList.length) {
          t.setState({
            examSceneList: data.ReturnEntity.ExaminationList,
            pageCount: data.ReturnEntity.PageCount,
            isMockTest: data.ReturnEntity.IsMockTest
          }, t.exchangeData)
        } else {
          this.isFirstPage(this.state.pageIndex, data);
        }
      }
    })
  };

  /**
   * 如果不是第一页没有数据时自动跳转到第一页
   * @param pageIndex 当前页吗
   */
  isFirstPage = (pageIndex, data) => {
    if (pageIndex !== 1) {
      this.setState({
        pageIndex: 1
      }, () => {
        this.getExamSceneList();
      });
    } else {
      this.setState({
        examSceneList: [],
        isMockTest: data.ReturnEntity.IsMockTest
      })
    }
  };

  /**
   * 重置表格数据
   */
  exchangeData = () => {
    const {examSceneList} = this.state;
    let data = [];

    for (let i = 0; i < examSceneList.length; i++) {
      data.push({
        key: examSceneList[i].ExamSceneId,
        ExamSceneName: <Tooltip className={style.litsName}
                                placement="topLeft"
                                title={examSceneList[i].ExamSceneName}><span>{examSceneList[i].ExamSceneName}</span></Tooltip>,
        CourseId: this.curseFun(examSceneList[i].CourseList),
        ExamDate: examSceneList[i].ExamDate,
        ExamTime: examSceneList[i].ExamTime,
        TimeLength: examSceneList[i].TimeLength + '分钟',
        Status: this.examStatusFun(examSceneList[i].Status),
      });
    }
    this.setState({dataSource: data}, function () {
      this.setTableHeight()
    })
  };

  /**
   * 遍历学科
   * @param curse 学科
   * @return {string}
   */
  curseFun = (course) => {
    let a = '';
    if (course && course.length) {
      course.map((item, i) => {
        if (i === course.length - 1) {
          a += item.CourseName;
        } else {
          a += item.CourseName + '、';
        }
      })
    }
    return a;
  };

  /**
   * 考试状态渲染
   * @param status
   * @return {*}
   */
  examStatusFun = (status) => {
    let statusTpl = {
      1: '未开启',
      2: '<span class="font-wrong">正在考试</span>',
      3: '已关闭',
      4: '已上传',
      5: '已导出'
    };
    return (
      <div dangerouslySetInnerHTML={{__html: statusTpl[status]}}/>
    )
  };

  /**
   * 设置表格的高度
   */
  setTableHeight = () => {
    if (this.state.dataSource.length) {
      const speacH = 10,
        PageH = 37;
      let bodyH = document.body.offsetHeight,
        heH = document.querySelector('.header-box').offsetHeight,
        fotterH = document.querySelector('.footer-box').offsetHeight,
        tabHeder = document.querySelector('.teacher-layout .ant-table-header').offsetHeight,
        tabBodyH = bodyH - heH - fotterH - tabHeder - speacH - PageH - 17;
      this.setState({
        tableBodyH: tabBodyH + 'px'
      })
    }
  };

  /**
   * 跳转考试详情
   * @param record  前场次相关信息
   */
  jumpLink = (record) => {
    let key = record.key;
    urlHelper.jump({
      path: '/onlineExamTeacher/testDetails.html',
      search: urlHelper.setSearchParam({
        examSceneId: key,
      })
    })
  };

  /**
   * 修改第几页回调
   * @param e pageIndex
   */
  pageOnChange = (e) => {
    this.setState({
      pageIndex: e
    }, function () {
      this.getExamSceneList();
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
      this.getExamSceneList();
    });
  };

  render() {
    return (
      <div>
        <Header IsMockTest={this.state.isMockTest}/>

        <Layout className="teacher-layout h-all">
          <SiderNav />
          <Layout className={classnames(style.layoutBox, style.exameBox)}>
            {
              this.state.examSceneList && this.state.examSceneList.length ? (
                <Content>
                  <Table
                    className={classnames(style.examSceneListBox, this.state.examSceneList && this.state.examSceneList.length >= 10 ? style.wrap : '')}
                    columns={columns} dataSource={this.state.dataSource}
                    pagination={false}
                    scroll={{x: 864, y: this.state.tableBodyH}}
                    onRow={(record) => {
                      return {
                        onClick: () => {
                          this.jumpLink(record)
                        },
                      };
                    }}
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
                </Content>
              ) : (<DataNull data={this.state.examSceneList}/>)}
          </Layout>
        </Layout>
        <Footer />
      </div>
    )
  }
}
export default ExamSceneList;
