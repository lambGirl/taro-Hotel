import Taro, { Component } from '@tarojs/taro';
import { View,ScrollView,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, OrderDetailStatus, TzCardBox,MaskModel } from "../../common"
import './index.less';
import classnames from 'classnames'
import { baseUtil } from "../../utils";
import { Ts, JdMessageListItem,JdMessageFooterBtn,LineList} from './components'

@connect(({orderdetail}) => ({
  ...orderdetail,
}))

export default class Orderdetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            returntime:0,
            show: false
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

  //查看商家
  viewBusiness(index){
    //console.log("负责商家查看")
      this.setState({
          "show": index
      })
  }

  //查看房间
  viewRoom(){
    console.log("查看房间");
  }

  jdFooterbtnClick(index){
      //两个按钮， 根据index来判断具体是哪个按钮
      console.log("index--------", index);
  }

  render() {

    let top =  baseUtil.orderDetailStatus('book_succeed'), orderDetail = {state: 'book_succeed',totalPrice:'1.00'},
        orderStausChild = null,time = this.state.returntime, { show } =  this.state;
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
                  <View  className='cardBox-content-model'>
                      <JdMessageListItem leftName='爱丽思酒店' rightName='查看商家' onClick={this.viewBusiness.bind(this)}>
                          武侯区锦城大道666号奥克斯广场国际公馆5栋
                      </JdMessageListItem>
                      <JdMessageListItem mb={ true } leftName='商务标间' rightName='查看房型' onClick={this.viewRoom.bind(this)}>
                          入住：9-26（今天） 离店：9-27（明天）共1晚1间 双床 不含早 有宽带
                      </JdMessageListItem>
                      <JdMessageFooterBtn btns={['查看线路','联系商家']} onClick={this.jdFooterbtnClick.bind(this)}/>
                  </View>
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

          <MaskModel show={show} onClick={this.viewBusiness.bind(this)}>
              <View>我是详情</View>
          </MaskModel>
      </View>
    )
  }
}
