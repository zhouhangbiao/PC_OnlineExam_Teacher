import axios from 'axios';

export default function request(options) {
  let statusCode;
  let errCode;
  let formData;
  let defaults = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    withCredentials: true,
    validateStatus: function (status) {
      if (status >= 200 && status < 300) {
        return true
      } else {
        statusCode = status;
        if (statusCode === 401) {
          location.href = '/onlineExamTeacher/login.html';
        }
        return false;
      }
    }
  };

  options = Object.assign(defaults, options);
  formData = options.data;
  options.data = "param=" + JSON.stringify(formData);

  return axios.request(options)
    .then(response => {
      if (response.headers["content-disposition"] || response.headers["Content-Disposition"]) {
        return response;
      } else {
        if (response.data && response.data.ResultType && response.data.ResultType !== 1) {
          layer.msg(response.data.Message, { icon: 2, time: 2000 });
        } else {
          if (response.headers["message"]) {
            layer.msg(decodeURIComponent(response.headers["message"]), { icon: 2, time: 2000 });
          }
        }
        return response.data;
      }
    })
    .catch(() => {
      console.log(errCode)
    });
}
