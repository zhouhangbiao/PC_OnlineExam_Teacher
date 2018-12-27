//考试相关接口
const exam = {
  /**
   * 获取考试场次列表
   * @param req
   * @param res
   * @param next
   */
  GetExamSceneList: function (req, res, next) {
    res.send({
        ResultType: 1,
        Message: "",
        ReturnEntity: {
          "IsMockTest": true, //是否为模拟考试
          "PageCount": 200, //页码总数
          "ExaminationList": [
            {
              "ExamSceneName": "考", //考试场次名称
              "ExamSceneId": "49781", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-11-6", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 5 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试", //考试场次名称
              "ExamSceneId": "49782", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 2 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场", //考试场次名称
              "ExamSceneId": "49783", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 3 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次", //考试场次名称
              "ExamSceneId": "49784", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 4 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名", //考试场次名称
              "ExamSceneId": "49785", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 5 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "2018年12月12日第10场 ", //考试场次名称
              "ExamSceneId": "49786", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 2 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称6", //考试场次名称
              "ExamSceneId": "49787", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 3 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称5", //考试场次名称
              "ExamSceneId": "4978800", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 4 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称4", //考试场次名称
              "ExamSceneId": "49780000", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 1 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称3", //考试场次名称
              "ExamSceneId": "4978000", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 2 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称2", //考试场次名称
              "ExamSceneId": "497800", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 3 //1.未开启2.正在考试3.已关闭4.已上传
            },
            {
              "ExamSceneName": "考试场次名称1", //考试场次名称
              "ExamSceneId": "49780", //考试场次ID
              "CourseList": [
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                },
                {
                  "CourseId": "789", //科目ID
                  "CourseName": "科目" //科目
                }
              ],
              "ExamDate": "2018-05-25", //考试日期
              "ExamTime": "78", //考试时间
              "TimeLength": 60,  //时长
              "Status": 4 //1.未开启2.正在考试3.已关闭4.已上传
            }
          ]
        }
      }
    )
  },
  /**
   * 数据下载初始化页面
   * @param req
   * @param res
   * @param next
   */
  GetExamInitData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "ExamTypeId": 1 //1.正式考试 2.模拟考试 3所有模式
      }
    });
  },

  /**
   * 点击数据下载
   * @param req
   * @param res
   * @param next
   */
  GetExamData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 1 //1.成功2.失败
    });
  },
};

module.exports = exam;
