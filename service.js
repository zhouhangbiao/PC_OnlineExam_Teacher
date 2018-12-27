const fs = require('fs');

const express = require('express'),
  timeout = require('connect-timeout'),
  app = express();

const API = {
  common: require('./api/common'),
  details: require('./api/details'),
  exam: require('./api/exam'),
  seat: require('./api/seat')
};

const PORT = '3000',
  TIME_OUT = 30 * 1e3;

app.set('port', PORT);

app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// 设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
  next();
});
// 1.1	获取考试详情信息
app.post('/ExamSceneInfo/GetExamInfo', API.details.GetExamInfo);
// 1.2	查询学科列表
app.post('/ExamSceneInfo/GetExamScaneCourses', API.details.GetExamScaneCourses);
// 1.3	开启考试
app.post('/ExamSceneInfo/OpenExam', API.details.OpenExam);
// 1.4	授权开启
app.post('/ExamSceneInfo/AuthorizeStartExam', API.details.AuthorizeStartExam);
// 1.5	延长考试时长
app.post('/ExamSceneInfo/ProlongExamSceneTime', API.details.ProlongExamSceneTime);
// 1.6	重考
app.post('/ExamSceneInfo/ResetExam', API.details.ResetExam);
// 1.7	关闭考试
app.post('/ExamSceneInfo/CloseExam', API.details.CloseExam);
// 1.8	答卷数据上传
app.post('/ExamSceneInfo/UploadExamData', API.details.UploadExamData);
// 1.9	选中考生延长时长
app.post('/Exam/ExtendStudentTime', API.details.ExtendStudentTime);
// 1.10	标记考生
app.post('/Exam/MarkStudent', API.details.MarkStudent);
// 1.11	强制交卷
app.post('/Exam/HandAllPapers', API.details.HandAllPapers);
// 1.12	查询在考试人数
app.post('/Exam/QueryExamingCount', API.details.QueryExamingCount);
// 1.13	查询数据上传数量
app.post('/Exam/QueryUploadCount', API.details.QueryUploadCount);

// （二期）1.14 查询数据下载
app.post('/BasicData/QueryDownloadData', API.details.QueryDownloadData);
// （二期）1.15 查询考生密码
app.post('/Student/FindPassword', API.details.FindPassword);
//  (二期) 1.16 考生登录设置
app.post('/Student/LoginSet', API.details.LoginSet);
//  (二期) 1.17 查询学科数据
app.post('/BasicData/QueryCourses', API.details.QueryCourses);
//  （二期）自动开启考试
app.post('/ExamSceneInfo/AutoOpenExam', API.details.AutoOpenExam);
//  （优化）重新开启
app.post('/ExamSceneInfo/ReOpen', API.details.ReOpen);
//  （优化）考试预加载
app.post('/ExamSceneInfo/LoadBasicData', API.details.LoadBasicData);
//  答卷数据上传
app.post('/ExamSceneInfo/ExportExamSceneData', API.details.ExportExamSceneData);


//获取系统配置信息
app.post('/Login/GetSystemInfo', API.common.GetSystemInfo);

//获取加密狗用户名
app.post('/Login/GetUserNameFormDog', API.common.GetUserNameFormDog);
//加密狗登录
app.post('/Login/DogLogin', API.common.DogLogin);
//脱机码登录登录
app.post('/Login/OfflineLogin', API.common.OfflineLogin);
//退出登录
app.post('/Login/Logout', API.common.Logout);
//缺考表
app.post('/Exam/AbsentRecords', API.common.AbsentRecords);
//监考表
app.post('/Exam/SuperviseRecords', API.common.SuperviseRecords);
//答卷数据表
app.post('/Exam/PaperData', API.common.PaperData);
//新增监管记录
app.post('/Exam/AddSuperviseRecord', API.common.AddSuperviseRecord);
//导出监管记录
app.post('/Exam/ExportSuperviseRecords', API.common.ExportSuperviseRecords);
//导出缺考表
app.post('/Exam/ExportAbsentRecords', API.common.ExportAbsentRecords);
//更换加密狗
app.post('/Login/CheckDogChange', API.common.CheckDogChange);
//获取秘钥
app.post('/Login/GetSecretKey', API.common.GetSecretKey);
//公告列表
app.post('/Exam/GetAnnouncementList', API.common.GetAnnouncementList);
//公告详情
app.post('/Exam/GetAnnouncementInfo', API.common.GetAnnouncementInfo);
//详情首页
app.post('/Exam/GetExamIndexInfo', API.common.GetExamIndexInfo);
//考生重考
app.post('/Student/StudentResetExam', API.common.StudentResetExam);
//错题上报 获取题型
app.post('/WrongQuestion/GetQuestionCategories', API.common.GetQuestionCategories);
//错题列表
app.post('/WrongQuestion/GetWrongQuestions', API.common.GetWrongQuestions);
//新增错题获取座位号
app.post('/WrongQuestion/GetSeatNumbers', API.common.GetSeatNumbers);
//新增错题获取考生信息
app.post('/WrongQuestion/GetStudentInfo', API.common.GetStudentInfo);
//新增错题获取题号信息
app.post('/WrongQuestion/GetQuestionOrderIndex', API.common.GetQuestionOrderIndex);
//新增错题获取错题图片
app.post('/WrongQuestion/GetPicture', API.common.GetPicture);
//新增错题获取错题类型
app.post('/WrongQuestion/GetWrongTypes', API.common.GetWrongTypes);
//错题上报
app.post('/WrongQuestion/Report', API.common.Report);
//新增错题错题上报
app.post('/WrongQuestion/SaveWrongQuestion', API.common.SaveWrongQuestion);
//导出错题
app.post('/WrongQuestion/ExportRecords', API.common.ExportRecords);
//查看错题上报详情
app.post('/WrongQuestion/GetWrongQuestionDetail', API.common.GetWrongQuestionDetail);


//数据下载初始化页面
app.post('/Exam/GetExamInitData', API.exam.GetExamInitData);
//点击数据下载
app.post('/Exam/GetExamData', API.exam.GetExamData);
//获取考试场次列表
app.post('/Exam/GetExamSceneList', API.exam.GetExamSceneList);
//获取座位表
app.post('/Seat/GetSeatList', API.seat.GetSeatList);
//座位表解锁
app.post('/Seat/SeatUnlock', API.seat.SeatUnlock);
//座位表下载模版
app.post('/Seat/DownloadTemplate', API.seat.DownloadTemplate);
//座位表导出模版
app.post('/Seat/ExportTemplate', API.seat.ExportTemplate);

app.listen(app.get('port'), () => {
});

