function getObjectURL(file) {
  let url;
  if (window.createObjcectURL !== undefined) {
    url = window.createOjcectURL(file);
  } else if (window.URL !== undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 文件下载（导出）
 * @param {Object} response
 * @constructor
 */
function DownloadFile(response) {
  if (!response.headers) {
    return;
  }

  let fileName = response.headers["content-disposition"] ?
    response.headers["content-disposition"].split(";")[1].split("filename=")[1].replace(/"/g, "") :
    response.headers["Content-Disposition"].split(";")[1].split("filename=")[1].replace(/"/g, "");

  fileName = decodeURIComponent(fileName);

  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(new Blob([response.data]), fileName);
  } else {
    let a = document.createElement('a');
    a.download = fileName;
    a.href = getObjectURL(new Blob([response.data]));
    $("body").append(a);
    a.click();
    $(a).remove();
  }
}

export default DownloadFile;
