import Taro from '@tarojs/taro';

export default {
  namespace: 'globle',
  state: {
    data:[]
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
