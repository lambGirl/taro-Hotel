import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader } from "../../common"
import './index.less';
import config from "../../config/index"
import classnames from 'classnames'

export default class HotelList extends Component{

    config = {
        // "navigationBarTextStyle": "black",
    }

    constructor(props){
        super(props);
        this.state = {
            outHeight:90,
            page: 1,
            total:0
        }
    }

    componentDidMount(){

    }

    onScrollToLower(e){

    }

    render(){
        let { outHeight, page, total } =  this.state;
        return <View>
            <TzHeader
              mode='whiteBlue'
              type={process.env.TARO_ENV}
              boxStyle="background-color:transparent;position: absolute;left: 0;top:0;"
              iconStyle="border-color:#fff"
            > </TzHeader>
            <Image className="index-banner" mode="aspectFill" src={config.imgDomain+"/images/hotel_banner_01.png"}/>
        </View>
    }
}
