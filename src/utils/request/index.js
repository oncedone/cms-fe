import cookies from 'browser-cookies';
import { message } from 'antd';
import axios from 'axios';
import qs from 'query-string'
import _ from 'lodash';
const _request = (opts) => {
  let relativeUrl = true
  if(opts.url.indexOf('http') >= 0) {
    relativeUrl = false
  }
  opts.url = `${relativeUrl ? SERVER : ''}` + opts.url
  opts.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'none' })
  };
  return axios(opts).catch(error => {
    console.error(error);
    message.destroy();
    if (/timeout/.test(error.message)) {
      message.error('请求服务端超时');
    }
    // TODO log
    const { response: { data } = {} } = error;
    return { ...data };
  })
}

const csrfSafeMethod = method => {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/i.test(method));
}

axios.interceptors.request.use(config => {
  // 移除空字段
  config.params = _.omitBy(config.params, val => !_.isNumber(val) && _.isEmpty(val));
  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  if (process.env.NODE_ENV === 'production') {
    const csrfToken = cookies.get('csrfToken');
    if (!csrfSafeMethod(config.method)) {
      config.headers['csrfToken'] = csrfToken;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(resp => {
  const { data, data: { code = '0', error_message = '', message: messageInfo = '', status: innerStatus = 200 }, status } = resp;
  if (code !== '0' || innerStatus !== 200) {
    if(code === '000000007') {
      message.error('登录信息过期请刷新重新登录');
    }
    console.error(messageInfo, error_message);
    const errMsg = (code > 500 && code < 600) ? '服务器内部错误' : error_message;
    console.error({
      component: 'request',
      method: 'axios.interceptors.response.error',
      message: _.max([error_message, messageInfo]),
      requestUrl: resp.config.url,
      requestMethod: resp.config.method
    });
    message.error(_.max([error_message, messageInfo]))
    return {
      error: {
        ...data,
        ...{ code: code, message: _.max([error_message, messageInfo]), error_message: errMsg,  status }
      }
    };
  } else {
    // TODO 服务端并非所有成功返回都带有data字段
    if (!data.data) {
      data.data = true;
    }
  }
  return data;
}, error => {
  return Promise.reject(error);
});

export default async function request(opts) {
  opts.timeout = 15000;
  return _request(opts)
}
