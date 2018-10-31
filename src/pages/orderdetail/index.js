import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, OrderDetailStatus, CardBox } from "../../common"
import './index.less';
import { baseUtil } from "../../utils";

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
        orderStausChild = null;
    /*if(orderDetail.state === 'book_succeed'){
        let time = this.state.returntime;
        orderStausChild = time&&<View>请在<Text>{this.renderTime()}</Text>内完成支付，逾期将自动取消订单哦~</View>||'超出支付期限，请重新购买!';
    }else if(orderDetail.state === 'sell_failed'||orderDetail.state === 'backed'){
        orderStausChild = <View>请耐心等待，票款将在<Text>7个工作日</Text>内返回您的帐上</View>;
    }
    else{
        orderStausChild = top.statusContent;
    }*/
    return (
      <View className='orderdetail-page'>
          <TzHeader  title='订单详情' mode='gradient' type={process.env.TARO_ENV} />
          <OrderDetailStatus top={top} orderDetail={orderDetail}>
              1111
          </OrderDetailStatus>
          <CardBox  CardBoxDefault={true}
                    cardTitleIcon={true}
                    cardTitle="使用凭证"
                    disabled={false}
          >
              <View className="title-content-topDown">
                    <View className="title-content-item">
                        <View className='title'>入住说明</View>
                        <View className='height-width-auto'>
                            请携带所有入住人有效身份证，报入住人姓名，于9月13日1
                            2:00办理入住并与9月14日12:00前退房，如需提前入住或延
                            迟退房请联系酒店前台
                        </View>
                    </View>
                    <View className="title-content-item">
                        <View className='title'>入住说明</View>
                        <View className='height-width-auto'>
                            请携带所有入住人有效身份证，报入住人姓名，于9月13日1
                            2:00办理入住并与9月14日12:00前退房，如需提前入住或延
                            迟退房请联系酒店前台
                        </View>
                    </View>
              </View>
          </CardBox>
      </View>
    )
  }
}
