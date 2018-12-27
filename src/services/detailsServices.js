import request from '../utils/request';
import cookie from '../utils/cookie';

const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');


/**
 *  获取考试详情信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamInfo(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/GetExamInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 *  查询学科列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamScaneCourses(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/GetExamScaneCourses',
    method: "POST",
    data: params.payload
  });
}

/**
 *  开启考试
 * @param params
 * @return {Promise.<Object>}
 */
export async function OpenExam(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/OpenExam',
    method: "POST",
    data: params.payload
  });
}

/**
 *  授权开启
 * @param params
 * @return {Promise.<Object>}
 */
export async function AuthorizeStartExam(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/AuthorizeStartExam',
    method: "POST",
    data: params.payload
  });
}

/**
 *  延长考试时长
 * @param params
 * @return {Promise.<Object>}
 */
export async function ProlongExamSceneTime(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/ProlongExamSceneTime',
    method: "POST",
    data: params.payload
  });
}

/**
 *  重考
 * @param params
 * @return {Promise.<Object>}
 */
export async function ResetExam(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/ResetExam',
    method: "POST",
    data: params.payload
  });
}

/**
 *  关闭考试
 * @param params
 * @return {Promise.<Object>}
 */
export async function CloseExam(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/CloseExam',
    method: "POST",
    data: params.payload
  });
}

/**
 *  答卷数据上传
 * @param params
 * @return {Promise.<Object>}
 */
export async function UploadExamData(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/UploadExamData',
    method: "POST",
    data: params.payload
  });
}

/**
 *  选中考生延长时长
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExtendStudentTime(params) {
  return request({
    url: ApiHost + '/Exam/ExtendStudentTime',
    method: "POST",
    data: params.payload
  });
}

/**
 *  标记考生
 * @param params
 * @return {Promise.<Object>}
 */
export async function MarkStudent(params) {
  return request({
    url: ApiHost + '/Exam/MarkStudent',
    method: "POST",
    data: params.payload
  });
}

/**
 *  强制交卷
 * @param params
 * @return {Promise.<Object>}
 */
export async function HandAllPapers(params) {
  return request({
    url: ApiHost + '/Exam/HandAllPapers',
    method: "POST",
    data: params.payload
  });
}

/**
 *  查询在考试人数
 * @param params
 * @return {Promise.<Object>}
 */
export async function QueryExamingCount(params) {
  return request({
    url: ApiHost + '/Exam/QueryExamingCount',
    method: "POST",
    data: params.payload
  });
}

/**
 *  查询数据上传数量
 * @param params
 * @return {Promise.<Object>}
 */
export async function QueryUploadCount(params) {
  return request({
    url: ApiHost + '/Exam/QueryUploadCount',
    method: "POST",
    data: params.payload
  });
}

/**
 *  查询数据下载
 * @param params
 * @return {Promise.<Object>}
 */
export async function QueryDownloadData(params) {
  return request({
    url: ApiHost + '/BasicData/QueryDownloadData',
    method: "POST",
    data: params.payload
  });
}

/**
 *  查询考生密码
 * @param params
 * @return {Promise.<Object>}
 */
export async function FindPassword(params) {
  return request({
    url: ApiHost + '/Student/FindPassword',
    method: "POST",
    data: params.payload
  });
}

/**
 *  考生登录设置
 * @param params
 * @return {Promise.<Object>}
 */
export async function LoginSet(params) {
  return request({
    url: ApiHost + '/Student/LoginSet',
    method: "POST",
    data: params.payload
  });

}

/**
 *  查询学科数据
 * @param params
 * @return {Promise.<Object>}
 */
export async function QueryCourses(params) {
  return request({
    url: ApiHost + '/BasicData/QueryCourses',
    method: "POST",
    data: params.payload
  });
}

/**
 * 自动开启考试
 * @param params
 * @return {Promise.<Object>}
 */
export async function AutoOpenExam(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/AutoOpenExam',
    method: "POST",
    data: params.payload
  });
}

/**
 * 重新开启
 * @param params
 * @return {Promise.<Object>}
 */
export async function ReOpen(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/ReOpen',
    method: "POST",
    data: params.payload
  });
}

/**
 * 预加载数据
 * @param params
 * @return {Promise.<Object>}
 */
export async function LoadBasicData(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/LoadBasicData',
    method: "POST",
    data: params.payload
  });
}

/**
 * 答卷数据导出
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExportExamSceneData(params) {
  return request({
    url: ApiHost + '/ExamSceneInfo/ExportExamSceneData',
    method: "POST",
    data: params.payload,
    responseType: "blob"
  });
}
