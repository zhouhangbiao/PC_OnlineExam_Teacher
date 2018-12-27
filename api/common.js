const common = {

  GetSystemInfo: function (reg, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        SystemName: "江西省普通高中学业水平考试", //系统名称
        SystemLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA0qTwHgTmwVza1ZlZy6KggxMHzzAiyLqOGhHqq1MpFt7EioBIsJN7c2U/+vZsOrNhNAxkZzRlUFcAAAISSURBVEjH7dbZjpswFAbgQ8AOJFBI2IZ9X7Mn9fu/Wo2blMxAmWgiVdUo/wXWOfg7trgCXnnlH8eR9ELLXehjBqUtqWha7cNuEUgXvbm1V6nXNeYMG4Y7atF8iw85wywqsIQLwmJTvLN4/m0cY7plkyGHXJN23bNyreZw9ru1+OiE0KVYIp0W1uSWFgA08geLbJ11E0Onx7anVwgY5u+wTcfyQ7yuLM/ucUyb2hCTE2TkI1bZZeIec7T0R7AG1gAvoaBP7j1WR3AReSN49hi2KvJ1zPkP48VvvLrDswfxD+CewYv/FCsgv/BXcDmJ3Wn8NomjZ7DwDDbHcTyNOYZNN1HwAMfKEsS/4xnoDIeAXDOv9Tt8OO6FM8Dlc+wAi3vhr9hqEbAEn+JtJYotG9DyDCtRV4T5MVCn8S2xGrCTpBnx6KD1ruC79hSO6bl4kSh4Q8t5C2DjGWkALnF3I8myJG9LyHIcp1obsVJofExIDSfuIAGie6Vl4AINEoL0OI7Z68g0uwnrWiEpVPoRLHKQgSYyhYh9uTGsIjn1EwnzPF7YZQ4owJlR7P3kBJCXNod5D0uJn8pIHWKCPWypWiOLPzV/ziW1adRBXjeOWSXc3Nd2otxoqkV3kfdYJ4S3MwP1nbWxK+XQXJmhWO5O6/4FMjKbJ0TvO3ijGWO/GS64ewcGMbQN7qtsSKdjZPDKK985vwAxm+iuMKlJZQAAAABJRU5ErkJggg==", //系统logo,base64格式
        TerminalName: "教师端", //系统终端名称
        Copyright: "江西省考试院" //版权信息
      }
    })
  },

  /**
   * 获取加密狗用户名
   * @param req
   * @param res
   * @param next
   */
  GetUserNameFormDog: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        UserName: "sadsadasd"
      }
    });
  },
  /**
   * 加密狗登录
   * @param req
   * @param res
   * @param next
   */
  DogLogin: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "LoginStatus": 1, //登录状态：1：成功，2：其他
        "UserTrueName": "张三", //老师姓名
        "SchoolName": "南昌大学", //考点
        "RoomName": "A栋101", //考场
        "LoGo": "", //LOGO
        "ClientName": "无纸化考试系统", //客户端名称
        "Token": "", //用户TOKEN
        "AnnouncementNotReadNumber": "2" //未读公告数
      }

    });
  },
  /**
   * 脱机码登录
   * @param req
   * @param res
   * @param next
   */
  OfflineLogin: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "LoginStatus": 1, //登录状态：1：成功，2：其他
        "UserTrueName": "张三", //老师姓名
        "SchoolName": "南昌大学", //考点
        "RoomName": "A栋101", //考场
        "LoGo": "", //LOGO
        "ClientName": "无纸化考试系统", //客户端名称
        "Token": "", //用户TOKEN
        "AnnouncementNotReadNumber": "2" //未读公告数
      }
    });
  },
  /**
   * 更换加密狗
   * @param req
   * @param res
   * @param next
   */
  CheckDogChange: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "Status": 2, //状态：1：第一次登录或未更换狗登录，2:更换狗登录
        "LastDogId": "02121545", //上次登录狗id
        "NewDogId": "21345465", //本次登录狗id
      }
    });
  },
  /**
   * 获取秘钥
   * @param req
   * @param res
   * @param next
   */
  GetSecretKey: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "SecretKey": "EnohT5gQY9eBPrCqG1JvPnC8" //秘钥
      }
    });
  },
  /**
   * 退出登录
   * @param req
   * @param res
   * @param next
   */
  Logout: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 1
    });
  },
  /**
   * 新增监管记录
   * @param req
   * @param res
   * @param next
   */
  AddSuperviseRecord: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: 1
    });
  },
  /**
   * 导出监管记录
   * @param req
   * @param res
   * @param next
   */
  ExportSuperviseRecords: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: ""
    });
  },
  /**
   * 导出缺考表
   * @param req
   * @param res
   * @param next
   */
  ExportAbsentRecords: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: ""
    });
  },
  /**
   * 缺考表
   * @param req
   * @param res
   * @param next
   */
  AbsentRecords: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "TotalCount": 45, //总数
        "Records": [ {
          "StudentCode": "1010101010101", //准考证号
          "UserTrueName": "李四", //学生姓名
          "SeatNumber": "01", //座位号
          "AbsentCourses": "通用技术、科学技术" //缺考学科
        },
          {
            "StudentCode": "22222222222", //准考证号
            "UserTrueName": "李四1", //学生姓名
            "SeatNumber": "011", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "3333333333333101", //准考证号
            "UserTrueName": "李四2", //学生姓名
            "SeatNumber": "0111", //座位号
            "AbsentCourses": "通用技术、科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四3", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四4", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四5", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四7", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四8", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四9", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四10", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李11", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四12", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },
          {
            "StudentCode": "44444444444444444", //准考证号
            "UserTrueName": "李四13", //学生姓名
            "SeatNumber": "01111", //座位号
            "AbsentCourses": "科学技术" //缺考学科
          },

        ]
      }
    });
  },

  /**
   * 获取监考记录
   * @param req
   * @param res
   * @param next
   */
  SuperviseRecords: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "TotalCount": 14, //总数
        "Records": [
          {
            "StudentCode": "C1", //准考证号
            "UserTrueName": "李四", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "1212携带小抄", //说明
          },
          {
            "StudentCode": "C2", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "C3", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          },
          {
            "StudentCode": "123123123", //准考证号
            "UserTrueName": "李四6", //学生姓名
            "CourseNames": "信息技术、通用技术", //科目
            "CourseIds": "1,2", //科目ID
            "OperationType": 1, //操作类型 0请选择，1考场延时、2重考、3考生延时、4考试缩时、5标记考生、6强制交卷、7监考
            "SeatNumber": 1, //operationType为6时，该字段代表的意思有：1作弊、2抄袭、3扰乱秩序、4其他标记     operationType为1、2、3、4时，该字段代表的意思有：1断电、2网络异常、3考试系统异常、4其他
            "CreatedDateTime": "2018-1-1 16:14", //记录时间
            "Remark": "【作弊】携带小抄", //说明
          }
        ]
      }
    });
  },
  /**
   * 答卷数据
   * @param req
   * @param res
   * @param next
   */
  PaperData: function (req, res, next) {
    res.send({
      ResultType: 1,
      Message: "",
      ReturnEntity: {
        "Courses": [ {
          "MachineHandCount": 60, //机考交卷数
          "PaperHandCount": 60, //纸质交卷数
          "CourseName": "通用技术", //科目名称
          "IsNeedScantron": 1,//是否有纸质试卷，1 有 0 没有
          "TotalCount":84,//当前学科总数
        },
          {
            "MachineHandCount": 52, //机考交卷数
            "PaperHandCount": 70, //纸质交卷数
            "CourseName": "信息技术", //科目名称
            "IsNeedScantron": 0,//是否有纸质试卷，1 有 0 没有
            "TotalCount":85,//当前学科总数
          }
        ],
        "Records": [ {
          "key": "1",
          "StudentCode": "123123123123", //准考证号
          "UserTrueName": "张三", //姓名
          "SeatNumber": "10", //座位号
          "CoursesStatus": [ {
            "key": "3",
            "CourseName": "通用技术", //科目名称
            "HandResult": 4, //状态，1：未开始，2：考试中，3:已交卷
            "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
            "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
          }, {
            "key": "3",
            "CourseName": "通用技术", //科目名称
            "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
            "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
            "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
          },
          ]
        },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 2, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }
            ]
          },

          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          },
          {
            "key": "2",
            "StudentCode": "123123123123", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "CoursesStatus": [ {
              "key": "1",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 0, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 1 //纸质交卷数交卷状态：1：交卷，0：未交卷
            }, {
              "key": "3",
              "CourseName": "通用技术", //科目名称
              "HandResult": 1, //状态，1：未开始，2：考试中，3:已交卷
              "MachineHandResult": 1, //机考交卷状态：1：交卷，0：未交卷
              "PaperHandResult": 0 //纸质交卷数交卷状态：1：交卷，0：未交卷
            } ]
          }
        ],
        "TotalCount": 60
      }
    });
  },
  /**
   * 公告列表
   * @param req
   * @param res
   * @param next
   */
  GetAnnouncementList: function (req, res, next) {
    res.send({
      "ResultType": 1,
      "Message": "@string",
      "ReturnEntity": {
        "NotReadNumber": 3, //未读公告数量
        "TotalCount": 100, //公告总数
        "AnnouncementList": [ {
          "AnnouncementId": "1", //公告id，加密
          "AnnouncementTitle": "公告标告标题公告标题公告标题", //公告标题
          "CreateDateTime": "2018-12-12 12:13", //公告创建时间
          "Status": 1, //公告状态，1已读，0未读
        },
          {
            "AnnouncementId": "2", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:14", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "3", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:15", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "4", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:16", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "5", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:17", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "6", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:17", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "7", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:18", //公告创建时间
            "Status": 1, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "8", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:19", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:20", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          },
          {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:21", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:2122", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:22", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:23", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:24", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:25", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:12", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:12", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          }, {
            "AnnouncementId": "9", //公告id，加密
            "AnnouncementTitle": "公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题公告标题", //公告标题
            "CreateDateTime": "2018-12-12 12:12", //公告创建时间
            "Status": 0, //公告状态，1已读，0未读
          },

        ]
      }
    });
  },
  /**
   * 公告详情
   * @param req
   * @param res
   * @param next
   */
  GetAnnouncementInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": "公告标题公告标公告标题"// 公告内容，富文本
    });
  },
  /**
   * 首页详情
   * @param req
   * @param res
   * @param next
   */
  GetExamIndexInfo: function (req, res, next) {
    res.send({
      "ResultType": 1,
      "Message": "@string",
      "ReturnEntity": {
        "IsMockTest": true, //是否为模拟考试
        "IsAllowStudentLogin": true, //是否允许学生登录
        "IsSeatingPlanEnabled": 1, //是否启用座位号 1：启用 0：禁用
        "ExaminationList": [ {
          "ExamSceneName": "2018年5月30日第一场", //考试场次名称
          "ExamSceneId": "121", //考试场次ID
          "CourseList": [ {
            "CourseId": "12", //科目ID
            "CourseName": "语文" //科目
          }, {
            "CourseId": "13", //科目ID
            "CourseName": "数学" //科目
          } ],
          "ExamDate": "2018-12-12", //考试日期
          "ExamTime": "08:12", //考试时间
          "TimeLength": 1200, //时长 秒
          "Status": 5, //1.未开启2.正在考试3.已关闭4.已上传
          "ButtonStatus": 1 //查看，2进入考试

        }, {
          "ExamSceneName": "2018年5月30日第二场", //考试场次名称
          "ExamSceneId": "122", //考试场次ID
          "CourseList": [ {
            "CourseId": "12", //科目ID
            "CourseName": "语文" //科目
          }, {
            "CourseId": "13", //科目ID
            "CourseName": "数学" //科目
          } ],
          "ExamDate": "2018-12-12", //考试日期
          "ExamTime": "08:1", //考试时间
          "TimeLength": 600, //时长 秒
          "Status": 2, //1.未开启2.正在考试3.已关闭4.已上传
          "ButtonStatus": 1 //查看，2进入考试

        }, {
          "ExamSceneName": "2018年5月30日第三场", //考试场次名称
          "ExamSceneId": "123", //考试场次ID
          "CourseList": [ {
            "CourseId": "12", //科目ID
            "CourseName": "语文" //科目
          }, {
            "CourseId": "13", //科目ID
            "CourseName": "数学" //科目
          } ],
          "ExamDate": "2018-12-12", //考试日期
          "ExamTime": "08:14", //考试时间
          "TimeLength": 360, //时长 秒
          "Status": 3, //1.未开启2.正在考试3.已关闭4.已上传
          "ButtonStatus": 2 //查看，2进入考试

        }, {
          "ExamSceneName": "2018年5月30日第四场", //考试场次名称
          "ExamSceneId": "124", //考试场次ID
          "CourseList": [ {
            "CourseId": "12", //科目ID
            "CourseName": "语文" //科目
          }, {
            "CourseId": "13", //科目ID
            "CourseName": "数学" //科目
          } ],
          "ExamDate": "2018-12-12", //考试日期
          "ExamTime": "08:15", //考试时间
          "TimeLength": 6000, //时长 秒
          "Status": 4, //1.未开启2.正在考试3.已关闭4.已上传
          "ButtonStatus": 1 //查看，2进入考试

        }, {
          "ExamSceneName": "2018年5月30日第五场", //考试场次名称
          "ExamSceneId": "126", //考试场次ID
          "CourseList": [ {
            "CourseId": "12", //科目ID
            "CourseName": "数学" //科目
          }, {
            "CourseId": "13", //科目ID
            "CourseName": "数学" //科目
          } ],
          "ExamDate": "2018-12-12", //考试日期
          "ExamTime": "08:12", //考试时间
          "TimeLength": 60, //时长 秒
          "Status": 1, //1.未开启2.正在考试3.已关闭4.已上传
          "ButtonStatus": 2 //查看，2进入考试
        }

        ]
      }
    });
  },
  /**
   * 考生重考
   * @param req
   * @param res
   * @param next
   */
  StudentResetExam: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": 1 //状态, 1成功，2失败，3已关闭考试，4考生未开始，5考生已经交卷,6该授权码无效
    });
  },
  /**
   * 获取题型
   * @param req
   * @param res
   * @param next
   */
  GetQuestionCategories: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证

      "ReturnEntity": {
        "QuestionCategories": [ {
          "QuestionCategoryName": "单选题",
          "QuestionCategoryId": "MNGbWBaYQkw="
        }, {
          "QuestionCategoryName": "诗歌鉴赏",
          "QuestionCategoryId": "QFj8iFVHqL8="
        }, {
          "QuestionCategoryName": "语言表达",
          "QuestionCategoryId": "5s96fdDTjV8="
        }, {
          "QuestionCategoryName": "名著导读",
          "QuestionCategoryId": "k0cg1LxkubM="
        }, {
          "QuestionCategoryName": "默写",
          "QuestionCategoryId": "Z3ouwoirXb4="
        }, {
          "QuestionCategoryName": "作文",
          "QuestionCategoryId": "CH5+Q2fmZLM="
        }, {
          "QuestionCategoryName": "填空题",
          "QuestionCategoryId": "ey74fkZ3M/o="
        }, {
          "QuestionCategoryName": "七选五",
          "QuestionCategoryId": "oGDxgI5PSJ0="
        }, {
          "QuestionCategoryName": "解答题",
          "QuestionCategoryId": "byyQdVadjnI="
        }, {
          "QuestionCategoryName": "单词拼写",
          "QuestionCategoryId": "ldPXTM2LlOA="
        }, {
          "QuestionCategoryName": "阅读理解",
          "QuestionCategoryId": "oWaanCgrr80="
        }, {
          "QuestionCategoryName": "完形填空",
          "QuestionCategoryId": "wOqh9ABGNRA="
        }, {
          "QuestionCategoryName": "画图题",
          "QuestionCategoryId": "iYCUMz/hiPQ="
        }, {
          "QuestionCategoryName": "不定项选择题",
          "QuestionCategoryId": "Dye51XYjYSQ="
        }, {
          "QuestionCategoryName": "判断题",
          "QuestionCategoryId": "tdvx9Xvr/+A="
        } ]
      },

    });
  },
  /**
   * 错题列表
   * @param req
   * @param res
   * @param next
   */
  GetWrongQuestions: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "TotalCount": 100, //列表数据总数
        "Entities": //错题数组
          [
            {
              "ReportingExamSceneName": "2018年5月21日第一场(10:30-11:31)", //考试场次
              "CourseName": "数学", //学科
              "ReportingExamSceneId": "1",
              "StudentCode": "360111112", //准考证号
              "UserTrueName": "张三", //姓名
              "SeatNumber": "10", //座位号
              "QuestionIndex": "1", //题号
              "QuestionCategoryName": "多选题", //题型
              "CreatedTime": "2018-07-22 8:01", //创建时间
              "Status": 1, //状态，1未处理、2已导出、3已上报
              "WrongQuestionId": "1", //错题记录Id
              "CourseId": "2",//科目Id
              "QuestionCategoryId": "1",//题型Id
            }, {
            "ReportingExamSceneName": "2", //考试场次
            "ReportingExamSceneId": "2",
            "CourseName": "语文", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三1", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "2", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 2, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "3",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "3", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 3, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "4",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "4", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "5",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "5", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "6",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "6", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "7",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "7", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "8",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "8", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "9",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "9", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "10",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "1", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "ReportingExamSceneId": "11",
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "1", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          }, {
            "ReportingExamSceneName": "1", //考试场次
            "CourseName": "数学", //学科
            "StudentCode": "360111112", //准考证号
            "UserTrueName": "张三", //姓名
            "SeatNumber": "10", //座位号
            "QuestionIndex": "1", //题号
            "QuestionCategoryName": "多选题", //题型
            "CreatedTime": "2018-07-22 8:01", //创建时间
            "Status": 1, //状态，1未处理、2已导出、3已上报
            "WrongQuestionId": "1", //错题记录Id
            "CourseId": "2",//科目Id
            "QuestionCategoryId": "1",//题型Id
          },
          ]
      }
    });
  },
  /**
   * 新增错题座位号
   * @param req
   * @param res
   * @param next
   */
  GetSeatNumbers: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "SeatNumbers": //座位号
          [
            1,
            2,
            3,
            4,

          ]
      }
    });
  },
  /**
   * 新增错题考生信息
   * @param req
   * @param res
   * @param next
   */
  GetStudentInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "StudentInfo": "36012412121 张三", //考生信息
      }
    });
  },
  /**
   * 新增错题题号信息
   * @param req
   * @param res
   * @param next
   */
  GetQuestionOrderIndex: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "QuestionIndex": //题号
          [
            1,
            2,
            3,
            5,
            6
          ]
      }
    });
  },
  /**
   * 新增错题图片
   * @param req
   * @param res
   * @param next
   */
  GetPicture: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QkQxMzk0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QkQxM0E0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQzZCRDEzNzQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQzZCRDEzODQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAfQB9AMBEQACEQEDEQH/xABsAAEAAgIDAQEAAAAAAAAAAAAACAkFBgQHCgMLAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAcBAAEEAQQBBQEAAAAAAQIDBAUGBwgJERITFBUhIhgKIzEyJCUWJhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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"
    });
  },
  /**
   * 新增错题类型
   * @param req
   * @param res
   * @param next
   */
  GetWrongTypes: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "QuestionWrongTypes": //错题题型数组
          [ {
            "QuestionWrongTypeName": "你猜1", //错题题型型名称
            "QuestionWrongTypeId": "1", //错题题型Id
          },
            {
              "QuestionWrongTypeName": "你猜2", //错题题型型名称
              "QuestionWrongTypeId": "2", //错题题型Id
            },
            {
              "QuestionWrongTypeName": "你猜3", //错题题型型名称
              "QuestionWrongTypeId": "3", //错题题型Id
            }, {
            "QuestionWrongTypeName": "你猜4", //错题题型型名称
            "QuestionWrongTypeId": "4", //错题题型Id
          }
          ]
      }
    });
  },
  /**
   * 错题上报
   * @param req
   * @param res
   * @param next
   */
  Report: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "ReportStatus": 4,//上报状态,1脱机码登录时，不允许上报,2网络未连接，无法上报,3 只允许上报未处理的数据,4 上报成功，0上报失败
      }
    });
  },
  /**
   * 新增错题保存
   * @param req
   * @param res
   * @param next
   */
  SaveWrongQuestion: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": 1,//1成功,2请勿重复添加相同数据，0失败
    });
  },
  /**
   * 导出
   * @param req
   * @param res
   * @param next
   */
  ExportRecords: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": 1,//1成功,2请勿重复添加相同数据，0失败
    });
  },
  /**
   * 查看错题上报详情s
   * @param req
   * @param res
   * @param next
   */
  GetWrongQuestionDetail: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1, //1成功,2验证失败,3错误，已知的错误,4错误，写在try catch中的错误,5权限验证
      "ReturnEntity": {
        "QuestionPic": "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMqaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUM2QkQxMzk0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUM2QkQxM0E0OUU1MTFFOEE3M0M4NzlCQTc1OTExNDEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxQzZCRDEzNzQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQzZCRDEzODQ5RTUxMUU4QTczQzg3OUJBNzU5MTE0MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAfQB9AMBEQACEQEDEQH/xABsAAEAAgIDAQEAAAAAAAAAAAAACAkFBgQHCgMLAQEAAAAAAAAAAAAAAAAAAAAAEAEAAAcBAAEEAQQBBQEAAAAAAQIDBAUGBwgJERITFBUhIhgKIzEyJCUWJhEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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",//错题题型数组
        "QuestionWrongTypeId": "2",//错题类型ID
        "QuestionWrongType": "题干与选项不符",//错题题型数组
        "ReportingComment": "*****错误，题干与选项不符合",//错题题型数组
        "ExamSceneId": 12,//场次名称
        "CourseName": "我",
        "ReportingExamSceneName": "你",
        "QuestionCategoryName": "他",
        "CourseId": 12,//科目名称
        "SeatNumber": 0,//座位号
        "StudentInfo": "12",//考生信息
        "QuestionCategoryId": "12",//题型名称
        "QuestionIndex": 0//题号
      }
    });
  },
};

module.exports = common;
