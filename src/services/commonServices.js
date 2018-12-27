import request from '../utils/request';
import cookie from '../utils/cookie';
const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取配置信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSystemInfo(params) {
  return request({
    url: ApiHost + '/Login/GetSystemInfo',
    method: "POST",
    data: params.payload
  });
}
/**
 * 获取秘钥
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSecretKey(params) {
  return request({
    url:ApiHost+'/Login/GetSecretKey',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取学科列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function getMarkingTasksList(params) {
  return request({
    url:ApiHost+'/ExamSceneInfo/getMarkingTasksList',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取加密狗用户名
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetUserNameFormDog(params) {
  return request({
    url: ApiHost + '/Login/GetUserNameFormDog',
    method: "POST",
    data: params.payload
  });
}
/**
 * 更换加密狗
 * @param params
 * @return {Promise.<Object>}
 */
export async function CheckDogChange(params) {
  return request({
    url: ApiHost + '/Login/CheckDogChange',
    method: "POST",
    data: params.payload
  });
}
/**
 * 加密狗登录
 * @param params
 * @return {Promise.<Object>}
 */
export async function DogLogin(params) {
  return request({
    url: ApiHost + '/Login/DogLogin',
    method: "POST",
    data: params.payload
  });
}
/**
 * 脱机码登录
 * @param params
 * @return {Promise.<Object>}
 */
export async function OfflineLogin(params) {
  return request({
    url: ApiHost + '/Login/OfflineLogin',
    method: "POST",
    data: params.payload
  });
}
/**
 * 退出登录
 * @param params
 * @return {Promise.<Object>}
 */
export async function Logout(params) {
  return request({
    url: ApiHost + '/Login/Logout',
    method: "POST",
    data: params.payload
  });
}
/**
 * 缺考表
 * @param params
 * @return {Promise.<Object>}
 */
export async function AbsentRecords(params) {
  return request({
    url: ApiHost + '/Exam/AbsentRecords',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取监考记录
 * @param params
 * @return {Promise.<Object>}
 */
export async function SuperviseRecords(params) {
  return request({
    url: ApiHost + '/Exam/SuperviseRecords',
    method: "POST",
    data: params.payload
  });
}
/**
 * 新增监考记录
 * @param params
 * @return {Promise.<Object>}
 */
export async function AddSuperviseRecord(params) {
  return request({
    url: ApiHost + '/Exam/AddSuperviseRecord',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取答卷数据
 * @param params
 * @return {Promise.<Object>}
 */
export async function PaperData(params) {
  return request({
    url: ApiHost + '/Exam/PaperData',
    method: "POST",
    data: params.payload
  });
}

/**
 * 导出监管数据
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExportSuperviseRecords(params) {
  return request({
    url: ApiHost + '/Exam/ExportSuperviseRecords',
    method: "POST",
    data: params.payload,
    responseType: "blob"
  });
}
/**
 * 导出缺考表
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExportAbsentRecords(params) {
  return request({
    url: ApiHost + '/Exam/ExportAbsentRecords',
    method: "POST",
    data: params.payload,
    responseType: "blob"
  });
}
/**
 * 公告列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetAnnouncementList(params) {
  return request({
    url: ApiHost + '/Exam/GetAnnouncementList',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 公告详情
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetAnnouncementInfo(params) {
  return request({
    url: ApiHost + '/Exam/GetAnnouncementInfo',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 详情首页
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamIndexInfo(params) {
  return request({
    url: ApiHost + '/Exam/GetExamIndexInfo',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 详情首页
 * @param params
 * @return {Promise.<Object>}
 */
export async function StudentResetExam(params) {
  return request({
    url: ApiHost + '/Student/StudentResetExam',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 获取题型
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetQuestionCategories(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetQuestionCategories',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 错题列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetWrongQuestions(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetWrongQuestions',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 新增错题座位号
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSeatNumbers(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetSeatNumbers',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 新增错题考生信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetStudentInfo(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetStudentInfo',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 新增错题题号信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetQuestionOrderIndex(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetQuestionOrderIndex',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 新增错题图片
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetPicture(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetPicture',
    method: "POST",
    data: params.payload,
  });
}
/**
 * 错题类型
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetWrongTypes(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetWrongTypes',
    method: "POST",
    data: params.payload,
  });

}
  /**
 * 错题上报
 * @param params
 * @return {Promise.<Object>}
 */
export async function Report(params) {
  return request({
    url: ApiHost + '/WrongQuestion/Report',
    method: "POST",
    data: params.payload,
  });
}
  /**
 * 错题上报
 * @param params
 * @return {Promise.<Object>}
 */
export async function SaveWrongQuestion(params) {
  return request({
    url: ApiHost + '/WrongQuestion/SaveWrongQuestion',
    method: "POST",
    data: params.payload,
  });
}
  /**
 * 导出错题
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExportRecords(params) {
  return request({
    url: ApiHost + '/WrongQuestion/ExportRecords',
    method: "POST",
    data: params.payload,
    responseType: "blob"  
  });
}
  /**
 * 查看错题详情
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetWrongQuestionDetail(params) {
  return request({
    url: ApiHost + '/WrongQuestion/GetWrongQuestionDetail',
    method: "POST",
    data: params.payload,
  });
}