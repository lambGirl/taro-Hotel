import Request from '../../utils/request';

/*获取城市*/
const getAllCity =  data => Request({
    url:'/api?server=trip_getAllCitys',
    method:'post',
    data : {}
})

export {
    getAllCity
}
