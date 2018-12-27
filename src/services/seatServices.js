import request from '../utils/request';
import cookie from '../utils/cookie';
const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取座位表
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSeatList(params) {
  return request({
    url: ApiHost + '/Seat/GetSeatList',
    method: "POST",
    data: params.payload
  });
}

/**
 * 座位表解锁
 * @param params
 * @return {Promise.<Object>}
 */
export async function SeatUnlock(params) {
  return request({
    url: ApiHost + '/Seat/SeatUnlock',
    method: "POST",
    data: params.payload
  });
}

/**
 * 座位表下载模版
 * @param params
 * @return {Promise.<Object>}
 */
export async function DownloadTemplate(params) {
  return request({
    url: ApiHost + '/Seat/DownloadTemplate',
    method: "POST",
    data: params.payload,
    responseType: "blob"
  });
}

/**
 * 座位表导出模版
 * @param params
 * @return {Promise.<Object>}
 */
export async function ExportTemplate(params) {
  return request({
    url: ApiHost + '/Seat/ExportTemplate',
    method: "POST",
    data: params.payload,
    responseType: "blob"
  });
}
