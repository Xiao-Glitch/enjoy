import http from "wechat-http";

// 设置全局默认请求地址
http.baseURL = 'https://live-api.itheima.net';

// 设置响应拦截器

http.intercept.response = (res) => {

  console.log('响应被我拦截到了', res);
  
  return res.data
}


// 到出

export default http