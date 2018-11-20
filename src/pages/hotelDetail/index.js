import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader } from "../../common"
import { BSTAdsorbent } from "../../common/BST-trao-components/index"
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
          <View className="hotel-detail-box">
            <View className="hotel-name">
              <View>高档型</View>
              <View>田园山水酒店（成都环球中心店</View>
            </View>
            <View className="bst-flex-box">
              <View className="hotel-detail-address">
                <View>高档型</View>
                <View>田园山水酒店（成都环球中心店</View>
              </View>
              <View className=" hotel-detail-mapBtn">地图/导航 <View className="icon-right"/> </View>
            </View>
            <View className="bst-flex-box">
              <View className=" hotel-detail-facilities">
                <View>2018年装修</View>
                <View>情侣约会</View>
                <View>度假胜地</View>
              </View>
              <View>详情/设施<View className="icon-right"/></View>
            </View>
            <View className="date-line">

            </View>
            <View className="filter-option">
              <View>度假胜地</View>
            </View>
            <BSTAdsorbent/>
          </View>
        </View>
    }
}
