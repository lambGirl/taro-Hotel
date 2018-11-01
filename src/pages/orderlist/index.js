import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { OrderItem, TzHeader, TabItem } from  '../../common'
import './index.less';
import { back }  from '../../utils'

@connect(({orderlist}) => ({
  ...orderlist,
}))

export default class Orderdetail extends Component {
  config = {
      "navigationBarTextStyle": "white"
  };

  constructor(props){
      super(props);
      this.state = {
          tabActive:0,
      }
  }

  componentDidMount = () => {

  }

  onScrollToUpper = (e) => {
      console.log("e----onScrollToUpper",e);
  }

  onScrollToLower = (e) => {
      console.log("e----onScrollToLower",e);
  }

  tabPropsClick(index){
      this.setState({
          "tabActive": index
      });
  }

  headerLeftClick(){
    back();
  }
  OrderItemClick(){
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: '/pages/orderdetail/index'
    });
  }

  render() {
    let { tabActive } = this.state;

    return (
      <View className='orderDetail-page'>
          <TzHeader  title='酒店订单' mode='gradient' type={process.env.TARO_ENV} onClick={this.headerLeftClick.bind(this)}/>
          <TabItem tabItem={["全部","未使用","已使用"]} onClick={this.tabPropsClick.bind(this)} tabActive={tabActive}>
              <ScrollView
                  className='scrollview'
                  scrollY
                  scrollWithAnimation
                  scrollTop='0'
                  style='height: 600px'
                  lowerThreshold='20'
                  upperThreshold='20'
                  onScrollToUpper={this.onScrollToUpper}
                  onScrollToLower={this.onScrollToLower}>
                  <OrderItem  onClick={this.OrderItemClick.bind(this)} />
                  <OrderItem />
              </ScrollView>
          </TabItem>
      </View>
    )
  }
}
