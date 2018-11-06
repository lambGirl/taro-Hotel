import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

const request_data = {
   channelTokenName: '',
   _p_from: '',
};

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return Taro.request({
    url: options.url,
    data: {
      ...request_data,
      ...options.data
    },
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
      const { statusCode, data } = res;
      //console.log('data',data);
      if (statusCode >= 200 && statusCode < 300) {
           if(data.data.pubResponse.code !== '0000'){
                Taro.showToast({
                    title: `${data.data.pubResponse.msg}`,
                    icon: 'none',
                    mask: true,
                });
        }
        return data.data;
      } else {
          throw new Error(`网络请求错误，状态码${statusCode}`);
      }


  })
}
