import Taro from '@tarojs/taro';

export default {
  namespace: 'globle',
  state: {
    data:[1,2,3,4],
    outHeight:0
  },
  //初始化
  subscriptions: {
      setup({ dispatch, history }) {
        //处理进入页面的时候去设置，outHeight
          if(Taro.getEnv() === "WEAPP") {
              wx.getSystemInfo({
                  success: res => {
                      dispatch({
                          type:'saveOutHeight',
                          payload:{
                              outHeight: res.statusBarHeight*2
                          }
                      })
                  }
              })
          }
      },
  },
  effects: {
      *load(payload, {call, put}) {

      },
  },

  reducers: {

    save(state, { payload }) {
      return { ...state, ...payload };
    },

    saveOutHeight(state, {payload}){
        return {
            ...state,
            ...payload
        }
    }
  },
};
