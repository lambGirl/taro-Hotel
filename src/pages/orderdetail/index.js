import Taro, { Component } from '@tarojs/taro';
import { View,ScrollView,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, OrderDetailStatus, TzCardBox } from "../../common"
import './index.less';
import classnames from 'classnames'
import { baseUtil } from "../../utils";
import { Ts, JdMessage,LineList} from './components'

@connect(({orderdetail}) => ({
  ...orderdetail,
}))

export default class Orderdetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            returntime:0,
        }
    }

  config = {
    navigationBarTitleText: '订单详情',
  };

  componentDidMount = () => {

  };
  renderTime(){
      var n = this.state.returntime;
      var m = parseInt(n / 60);
      var s = n % 60;
      return (baseUtil.convertNum(m)) + '分' + (baseUtil.convertNum(s)) + '秒';
  }

  render() {

    let top =  baseUtil.orderDetailStatus('book_succeed'), orderDetail = {state: 'book_succeed',totalPrice:'1.00'},
        orderStausChild = null,time = this.state.returntime;
    if(orderDetail.state === 'book_succeed'){
        let time = this.state.returntime;
        orderStausChild = time?<View>请在<Text>{this.renderTime()}</Text>内完成支付，逾期将自动取消订单哦~</View>:'超出支付期限，请重新购买!';
    }else if(orderDetail.state === 'sell_failed'||orderDetail.state === 'backed'){
        orderStausChild = <View>请耐心等待，票款将在<Text>7个工作日</Text>内返回您的帐上</View>;
    }
    else{
        orderStausChild = top.statusContent;
    }

    return (
      <View className='orderdetail-page'>
         <TzHeader  title='订单详情' mode='gradient' type={process.env.TARO_ENV} />
         <ScrollView
              className='scrollview'
              scrollY
              scrollWithAnimation
              scrollTop='0'
              style={{'height':'600px'}}
              lowerThreshold='20'
              upperThreshold='20'>
              <OrderDetailStatus top={top} orderDetail={orderDetail}>
                  {orderStausChild}
              </OrderDetailStatus>
              <TzCardBox  CardBoxDefault={true}
                        cardTitleIcon={true}
                        cardTitle='温馨提示'
                        mb={true}
              >
                  <Ts />
              </TzCardBox>
              <TzCardBox  CardBoxDefault={true}
                        cardTitleIcon={true}
                        cardTitle='酒店信息'
                        noPadding={true}
                        mb={true}
              >
                  <JdMessage />
              </TzCardBox>
             <TzCardBox  CardBoxDefault={true}
                         cardTitleIcon={true}
                         cardTitle='预订信息'
                         mb={true}
             >
                 <View className={classnames('line-list-cardContent','cardContent-bottom-padding')}>
                     <LineList doubleLine={true}/>
                 </View>
             </TzCardBox>
             <TzCardBox  CardBoxDefault={true}
                         cardTitleIcon={true}
                         cardTitle='订单信息'
                         mb={true}
             >
                 <View className={classnames('line-list-cardContent','cardContent-bottom-padding')}>
                     <LineList doubleLine={true} name='订单编号' content='10234892190938098918'/>
                 </View>
             </TzCardBox>
          </ScrollView>
          <View className='footer-btn'>
              <View>作废订单</View>
              <View>继续支付</View>
          </View>
      </View>
    )
  }
}
