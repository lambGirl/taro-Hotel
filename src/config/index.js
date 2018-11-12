// 请求连接前缀
export const baseUrl = 'https://wap.tz12306.com';

// 输出日志信息
export const noConsole = false;

export default {
  //接口请求域名
  // domain: "https://miniapp.scqcp.com",
  domain: "https://as.scqcp.com",
  // domain: "https://yanfa.tz12306.com",
  // 图片域名
  imgDomain: "https://miniapp.scqcp.com" ,
  //当前渠道
  channelCode: "wx_mini_program",
  scanChannelCode: "qr_program",//扫码购票渠道
  //模板消息推送ID
  templateMSGIds:{
    //购票成功
    already:"vLORq3h4NKkpyX19EM0vTxij-xneXESyMSK4ezOORhM",
    //待付款
    toBe:"tSEbDv1PmSlx05OAwMeio8J9SGM3BMjFvFTRxa7uJHw",
  },
  //当前可用的渠道集合
  _availableChannelCodes:{
    "wx_mini_program": { name: "团子汽车票", region:"成都,chengdu,cd"},
    "qr_program": { name: "扫码购票" },
    "sc_weixin_city": { name: "四川汽车票", region: "成都,chengdu,cd"},
    "gz_weixin_city": { name: "贵州汽车票", region: "贵阳,guiyang,gy"}
  },
  //暴露动态设置config方法
  setValue:function(key,value){
    this[key]=value
  }
}
