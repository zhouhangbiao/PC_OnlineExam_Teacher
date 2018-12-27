//座位表相关接口
const seat = {
  /**
   * 获取座位表
   * @param req
   * @param res
   * @param next
   */
  GetSeatList: function (req, res, next) {
    res.send({
        ResultType: 1,
        Message: "",
        ReturnEntity: {
          "PageCount": 200, //页码总数
          "SeatList": [
            {
              "SeatNumber": "7891", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7892", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7893", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7894", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7895", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7896", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7897", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7898", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "7899", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            }, {
              "SeatNumber": "789", //座位号
              "MacAddress": "4978", //考试机mac地址
              "StatusFlag": 1  //操作状态
            },
          ]
        }
      }
    )
  },

  /**
   * 座位表解锁
   * @param req
   * @param res
   * @param next
   */
  SeatUnlock: function (req, res, next) {
    res.send({
        ResultType: 1,
        Message: "",
        ReturnEntity: 1  //1成功 2失败
      }
    )
  },

  /**
   * 座位表下载模版
   * @param req
   * @param res
   * @param next
   */
  DownloadTemplate: function (req, res, next) {
    res.send({
        ResultType: 1,
        Message: "",
        ReturnEntity: 0//下载失败
      }
    )
  },

  /**
   * 座位表导出模版
   * @param req
   * @param res
   * @param next
   */
  ExportTemplate: function (req, res, next) {
    res.send({
        ResultType: 1,
        Message: "",
        ReturnEntity: 0//下载失败
      }
    )
  },

};



module.exports = seat;
