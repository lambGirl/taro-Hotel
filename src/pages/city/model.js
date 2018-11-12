import Taro from '@tarojs/taro'
import { getAllCity }  from "./service"
import { redetailSingleData, shortcutListData } from '../../utils'
export default {

    namespace: 'city',
    state:{
        "hotCitys":[1,2,3,4],
        "citys":[],
        cityList:[],    //加工后的数据列表
        shortcutList:[],    //city层面显示的右边的shortKey
    },
    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects:{
        *fetchCity({ payload }, { call, put,select }) {
            let  cityList =  yield call(getAllCity, payload);
            if(cityList.pubResponse.code === '0000'){
                yield put({
                    type: 'setInitCity',
                    payload: {
                        hotCitys :cityList.body.hotCitys,
                        citys:cityList.body.citys
                    }
                });
            }

        }
    },

    reducers:{
        setInitCity(state, {payload}){
          //  console.log(action);
            //设置城市
            state.citys =  payload.citys;
            state.cityList = redetailSingleData(payload.citys);
            //设置右边的悬浮条
            state.shortcutList =  shortcutListData(state.cityList);
            return {
                ...state,
            }
        }
    }
}
