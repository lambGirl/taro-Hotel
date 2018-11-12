import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton ,AtInput} from 'taro-ui'
import {BSTSlider,BSTFlexbox}from '../../common/BST-trao-components/index'
import {TzHeader} from "../../common"
import config from "../../config/index"

import './index.less'

@connect(({globle}) => ({
    ...globle,
}))
class Index extends Component {

    config = {
        "navigationBarTextStyle": "black",
  }
  constructor(props){
      super(props);
      this.state={
        hotelKeyWord:"dsadada",
        sliderScale:[
          {label:"10块",value:10},
          {label:"50块",value:50},
          {label:"70块",value:70},
          {label:"100块",value:100}
        ]
      }
  }

  componentWillReceiveProps (nextProps) {
    //console.log(this.props, nextProps)
  }

  componentDidMount() {
      this.props.dispatch({
          type:'globle/load'
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  queryHotel(){
      // 跳转到目的页面，打开新页面
      Taro.navigateTo({
          url: '/pages/city/index'
      })

  }
  goOrderList(e){
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
        url: '/pages/orderlist/index'
    })
  }
  hotelInputChange(value){
    // this.setState({hotelKeyWord:value});
  }
  render () {
    return (
      <View className='container'>
        <TzHeader title='首页' mode='white' type={process.env.TARO_ENV} />
        <Image className="index-banner" mode="aspectFill" src={config.imgDomain+"/images/hotel_banner_01.png"}/>
        <View className="pd-15">
          <View className="index-form">
            <BSTFlexbox end="100px" boxClass="index-form-line" endClass="index-line-end text-r">
              <View className="index-address">
                <View className="index-address-name">{"久宜祥酒店附近"}</View>
                <View className="second-line">{"成都市武侯区锦城大道附近"}</View>
              </View>
              <View className="index-location">
                <Image mode="aspectFill" src={config.imgDomain+"/images/location-icon.png"}/>
                <View>我的位置</View>
              </View>
            </BSTFlexbox>
            <BSTFlexbox  end="100px" boxClass="index-form-line"  endClass="index-line-end text-r">
              <View className="text-ellipsis">
                <View className="index-time-start">
                  <View><Text className="line-date-number">9.14</Text><Text>今天</Text></View>
                  <View className="second-line second-line-icon-left">入住时间</View>
                </View>
                <View className="index-time-end">
                  <View><Text className="line-date-number">9.15</Text><Text>明天</Text></View>
                  <View  className="second-line second-line-icon-right">离店时间</View>
                </View>
              </View>
              <View className="line-date-end"><Text>共1晚</Text></View>
            </BSTFlexbox>
            <AtInput
              className="index-form-line index-hotel-name"
              clear
              placeholder={"酒店/关键词"}
              value={this.state.hotelKeyWord}
              onChange={this.hotelInputChange.bind(this)}
            />
            <AtInput className="index-form-line index-hotel-start" clear="clear" placeholder={"价格/星级"}/>
            <AtButton circle className="hotel-button index-submit" onClick={this.queryHotel.bind(this)}>查找酒店</AtButton>
            <AtButton circle onClick={this.goOrderList.bind(this)}>进入订单列表</AtButton>
          </View>
        </View>

        <Image mode="aspectFill"  className="index-logo" src={config.imgDomain+"/images/tz-logo.png"}/>



        {/*<BSTSlider type="range" mode='custom' scale={this.state.sliderScale} onChange={this.sliderChange} />*/}
        {/*<BSTSlider />*/}
        {/*<View><Text>Hello, World</Text></View>*/}
      </View>
    )
  }
}

export default Index
