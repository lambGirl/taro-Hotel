import Taro from '@tarojs/taro';

export default {
  namespace: 'globle',
  state: {
    data:[1,2,3,4]
  },

  effects: {
      *load(payload, {call, put}) {
          console.log("111111111");
      },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
