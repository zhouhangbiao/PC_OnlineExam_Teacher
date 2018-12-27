const details = {
  /**
   * 1.1  获取考试详情信息
   * @param req
   * @param res
   * @param next
   */
  GetExamInfo: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "LeftTimeLength": 605,
        "RemindTimeLength": '600',
        "ExamSceneName": "第一场",
        "ExamCourses":
          [
            {
              "CourseName": "通用技术",
              "CourseId": "123",
            }, {
            "CourseName": "信息技术",
            "CourseId": "1234",
          }
          ],
        "ExamInstruction": "说明",
        "ExamType": 1,
        "TimeLength": 900,
        "ExamTime": "考试时间",
        "MissExamTimeLength": "60",
        "IsNeedAuthorization": false,
        "IsAllowDelayExam":true,
        "IsAllowReexamination":true,
        "Status": 2,
        "AutoOpenExam":true,
        "AutoOpenTimeLength":10,
        "IsNeedAuthorizationReOpen":true,//是否需要授权重新开启，true需要授权，false不需要授权
      }
    });
  },

  /**
   * 1.2  查询学科列表
   * @param req
   * @param res
   * @param next
   */
  GetExamScaneCourses: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "StudentTotalNumber": 25,
        "HandedStudentNumber": 56,
        "TotalCount": 100,
        "StudentInfos": [
          {
            "StudentCode": "2010201250352012521",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 255,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 4801,
            "Status": 3,
            "AnswerProgress":12/50

          }, {
            "StudentCode": "2010201250352012522",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 210,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 4500,
            "Status": 2,
            "AnswerProgress":12/50
          }, {
            "StudentCode": "2010201250352012523",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 210,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 5400,
            "Status": 3,
            "AnswerProgress":12/50
          }, {
            "StudentCode": "2010201250352012524",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 150,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 119,
            "Status": 2,
            "AnswerProgress":12/50
          }, {
            "StudentCode": "2010201250352012525",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 420,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 3,
            "AnswerProgress":12/50
          }, {
            "StudentCode": "2010201250352012526",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 130,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 1,
            "AnswerProgress":"12/50"
          }, {
            "StudentCode": "2010201250352012527",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 710,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 55,
            "Status": 2,
            "AnswerProgress":"12/50"
          }, {
            "StudentCode": "2010201250352012528",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 120,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          }, {
            "StudentCode": "2010201250352012529",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 160,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          }, {
            "StudentCode": "2010201250352012510",
            "UserTrueName": "姓名",
            "SeatNumber": "10",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 150,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          }, {
            "StudentCode": "2010201250352012511",
            "UserTrueName": "姓名",
            "SeatNumber": "101",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 430,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          }, {
            "StudentCode": "2010201250352012512",
            "UserTrueName": "姓名",
            "SeatNumber": "101",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 430,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          }, {
            "StudentCode": "2010201250352012513",
            "UserTrueName": "姓名",
            "SeatNumber": "101",
            "BeginTime": "2018-07-22 8:01",
            "LeftTimeLength": 430,
            "EndTime": "2018-07-22 8:40",
            "ConsumerTimeLength": 74,
            "Status": 2
          },
        ]
      }
    });
  },

  /**
   * 1.3  开启考试
   * @param req
   * @param res
   * @param next
   */
  OpenExam: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 1
    });
  },

  /**
   * 1.4  授权开启
   * @param req
   * @param res
   * @param next
   */
  AuthorizeStartExam: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 1
    });
  },

  /**
   * 1.5  延长考试时长
   * @param req
   * @param res
   * @param next
   */
  ProlongExamSceneTime: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 0
    });
  },

  /**
   * 1.6  重考
   * @param req
   * @param res
   * @param next
   */
  ResetExam: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 3
    });
  },

  /**
   * 1.7  关闭考试
   * @param req
   * @param res
   * @param next
   */
  CloseExam: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 3
    });
  },

  /**
   * 1.8  答卷数据上传
   * @param req
   * @param res
   * @param next
   */
  UploadExamData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 2
    });
  },

  /**
   * 1.9  选中考生延长时长
   * @param req
   * @param res
   * @param next
   */
  ExtendStudentTime: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "选中考生的剩余时长为N分钟，无法进行缩短操作，请重新设置时长！",
      ReturnEntity: {
        "ExtendResult": 1
      }
    });
  },

  /**
   * 1.10  标记考生
   * @param req
   * @param res
   * @param next
   */
  MarkStudent: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "MarkResult": 3
      }
    });
  },

  /**
   * 1.11  强制交卷
   * @param req
   * @param res
   * @param next
   */
  HandAllPapers: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "HandResult": 1
      }
    });
  },

  /**
   * 1.12  查询在考试人数
   * @param req
   * @param res
   * @param next
   */
  QueryExamingCount: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 10
    });
  },

  /**
   * 1.13  查询数据上传数量
   * @param req
   * @param res
   * @param next
   */
  QueryUploadCount: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "Courses":
          [
            {
              "CourseName": "通用技术",
              "MachineCount": 30,
              "MachineUploadCount": 25,
              "PaperCount": 40,
              "PaperUploadCount": 40,
            },
            {
              "CourseName": "信息技术",
              "MachineCount": 30,
              "MachineUploadCount": 20,
              "PaperCount": 40,
              "PaperUploadCount": 25,
            }
          ]
      }
    });
  },

  /**
   * 1.14  查询数据下载
   * @param req
   * @param res
   * @param next
   */
  QueryDownloadData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "IsConnectInternet": 1,
        "LastTimeDownloaded": "2018-08-01 11:12",
      }
    });
  },

  /**
   * 1.15  查询考生密码
   * @param req
   * @param res
   * @param next
   */
  FindPassword: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "UserFace": "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QkQxMzk0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QkQxM0E0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQzZCRDEzNzQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQzZCRDEzODQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAfQB9AMBEQACEQEDEQH/xABsAAEAAgIDAQEAAAAAAAAAAAAACAkFBgQHCgMLAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAcBAAEEAQQBBQEAAAAAAQIDBAUGBwgJERITFBUhIhgKIzEyJCUWJhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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",
        "UserTrueName": "周航标",
        "UserSex": "男",
        "StudentCode": "1254625",
        "CardNo": "362502158601244759",
        "CourseName": "科学技术",
        "ExamScene": "南昌大学 G栋805",
        "SeatNumber": "10",
        "Password": "123456"
      }
    });
  },

  /**
   * 1.16  考生登录设置
   * @param req
   * @param res
   * @param next
   */
  LoginSet: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      "ReturnEntity": 1
    });
  },

  /**
   * 1.17  查询学科数据
   * @param req
   * @param res
   * @param next
   */
  QueryCourses: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      "ReturnEntity": [ {
        "CourseId": "1",
        "CourseName": "高中英语",
      }, {
        "CourseId": "2",
        "CourseName": "高中数学",
      }, {
        "CourseId": "3",
        "CourseName": "高中语言",
      } ]
    });
  },

  /**
   * （二期）自动开启考试
   * @param req
   * @param res
   * @param next
   */
  AutoOpenExam: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      "ReturnEntity": 1
    });
  },
  /**
   * （优化）重新开启
   * @param req
   * @param res
   * @param next
   */
  ReOpen: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      "ReturnEntity": 1//处理状态,0失败，1成功，2请使用授权码进行开启，3授权码无效
    });
  },
  /**
   * （优化）数据预加载
   * @param req
   * @param res
   * @param next
   */
  LoadBasicData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      "ReturnEntity": 1//处理状态,0失败，1成功，
    });
  },
  /**
   * 答卷数据上传
   * @param req
   * @param res
   * @param next
   */
  ExportExamSceneData: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,//1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": 0//下载失败
    });
  },
};

module.exports = details;
