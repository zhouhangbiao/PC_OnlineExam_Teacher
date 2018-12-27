import request from '../utils/request';
import cookie from '../utils/cookie';
const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取考试场次列表
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamSceneList(params) {
  return request({
    url: ApiHost + '/Exam/GetExamSceneList',
    method: "POST",
    data: params.payload
  });
}

/**
 * 数据下载初始化页面
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamInitData(params) {
  return request({
    url: ApiHost + '/Exam/GetExamInitData',
    method: "POST",
    data: params.payload
  });
}


/**
 * 点击数据下载
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamData(params) {
  return request({
    url: ApiHost + '/Exam/GetExamData',
    method: "POST",
    data: params.payload
  });
}
