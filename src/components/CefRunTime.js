/**
 * 导入考试数据
 */
export function importExamData() {
  try {
    localFunction.importExamData();
    layer.msg('导入考试数据中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 下载考试数据
 */
export function downloadExamData() {
  try {
    localFunction.downloadExamData();
    layer.msg('下载考试数据中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 答卷数据上传
 * @param {String} examSceneId 考试场次Id
 */
export function uploadExamSceneData(examSceneId) {
  try {
    localFunction.uploadExamSceneData(examSceneId);
    layer.msg('答卷数据上传中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 数据清理
 */
export function clearExamData() {
  try {
    localFunction.clearExamData();
    layer.msg('数据清理中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 导入座位表
 */
export function importSeatingArrange() {
  try {
    localFunction.importSeatingArrange();
    layer.msg('导入座位表中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 导入错题数据
 */
export function importWrongQuestion() {
  try {
    localFunction.importWrongQuestion();
    layer.msg('导入错题数据中...', {
      icon: 16,
      shade: 0.01,
      time: 0
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * 处理结果
 */
function handleResult(response) {
  let result = JSON.parse(response);
  if ( result.ResultType === 1 ) {
    let returnEntity = result.ReturnEntity;
    if ( returnEntity.Status === 1 ) {
      layer.alert("处理结果：成功" + "，信息:" + returnEntity.Message, {icon: 6});
    } else {
      layer.alert("处理结果：失败" + "，信息:" + returnEntity.Message, {icon: 5});
    }
  } else if ( result.ResultType === 0 ) {
    layer.closeAll();
  } else {
    layer.closeAll();
  }
}
/**
 *处理结果
 */
function handleResultClear(response,progress) {
  let result = JSON.parse(response);
  if ( result.ResultType === 1 ) {
    let returnEntity = result.ReturnEntity;
    if ( returnEntity.Status === 1 ) {
      layer.alert("处理结果：成功" + "，信息:" + returnEntity.Message, {
        btn: ['确定']
        ,icon: 6
        ,yes:function(){
          window.location.reload()
        },cancel: function(){
          window.location.reload()
        }
      });
    } else {
      layer.alert("处理结果：失败" + "，信息:" + returnEntity.Message, {
        btn: ['确定']
        ,icon: 5
        ,yes:function(){
          window.location.reload()
        },cancel: function(){
          window.location.reload()
        }
      });
    }
  } else if ( result.ResultType === 0 ) {
    layer.closeAll();
  } else {
    layer.closeAll();
  }
}

/**
 * cef 回调函数：更新导入考试数据
 * @param progress
 * @param response
 */
export function updateImportExamData(progress, response) {
  if ( response ) {
    handleResultClear(response,progress);
  }
}

/**
 * cef 回调函数：更新下载考试数据
 * @param progress
 * @param response
 */
export function updateDownloadExamData(progress, response) {
  if ( response ) {
    handleResultClear(response);
  }
}

/**
 * cef 回调函数：更新答卷数据上传
 * @param progress
 * @param response
 */
export function updateUploadExamSceneData(progress, response) {
  if ( response ) {
    handleResultClear(response);
  }
}

/**
 * cef 回调函数：更新数据清理
 * @param progress
 * @param response
 */
export function updateClearExamData(progress, response) {
  if ( response ) {
    handleResultClear(response);
  }
}

/**
 * cef 回调函数：更新导入座位表
 * @param progress
 * @param response
 */
export function updateImportSeatingArrange(progress, response) {
  if ( response ) {
    handleResult(response);
  }
}

/**
 * cef 回调函数：更新导入错题数据
 * @param progress
 * @param response
 */
export function updateImportWrongQuestion(progress, response) {
  if ( response ) {
    handleResultClear(response);
  }
}
