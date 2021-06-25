// 对 axios 进行进一步封装  面向自己的 axios 进行开发

import originAxios from "axios";

export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: "http://152.136.185.210:7878/api/m5",
      timeout: 8000
    });

    // 配置请求拦截
    instance.interceptors.request.use(config => config, err => err);

    // 响应拦截
    instance.interceptors.response.use(
      response => response.data,
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权的访问";
              break;
          }
        }
        return err;
      }
    );

    instance(option)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
