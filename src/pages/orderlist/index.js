import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { OrderItem, TzHeader, TabItem,Scroll } from  '../../common'
import './index.less';
import { back }  from '../../utils'

@connect(({orderlist, globle }) => ({
    ...orderlist,
    globle
}))

export default class Orderdetail extends Component {
    config = {
        "navigationBarTextStyle": "white"
    };

    constructor(props){
        super(props);
        this.state = {
            tabActive:0,
            listData: [0,1,2,3],
            page: 1,
            total: 5
        }
    }

    componentDidMount = () => {
        //这个页面的高度还需要得到当前设备的高度,然后减去header的高度， 减去bar的高度

    }

    onScrollToUpper = (e) => {
       // console.log("e----onScrollToUpper",e);
    }

    onScrollToLower = (e) => {
        //console.log("e----onScrollToLower",e);
        //执行加载并且设置数据
        let data = [1,2,3,4,5], {listData, page, total} =  this.state
        page += 1;
        if(page > total){
            return;
        };

        this.setState({
            "listData": listData.concat(data),
            'page': page
        })
    }

    tabPropsClick(index){
        this.setState({
            "tabActive": index,
            page:1,
            total:5
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
        let { tabActive, listData, page, total} = this.state;
        let {outHeight} =  this.props.globle;
        return (
            <View className='orderDetail-page'>
                <TzHeader   mode='gradient' type={process.env.TARO_ENV} onClick={this.headerLeftClick.bind(this)}>
                    酒店订单
                </TzHeader>
                <TabItem height={outHeight+88} tabItem={["全部","未使用","已使用"]} onClick={this.tabPropsClick.bind(this)} tabActive={tabActive}>
                    {tabActive == 0?<Scroll
                        page={page}
                        total={total}
                        needMore={true}
                        height='100%'
                        onScrollToUpper={this.onScrollToUpper.bind(this)}
                        onScrollToLower={this.onScrollToLower.bind(this)}
                    >
                        <View>
                            {
                                listData.map((item,index)=>{
                                    return  <OrderItem  key={"listData0"+index} onClick={this.OrderItemClick.bind(this)} />
                                })
                            }
                        </View>
                    </Scroll>:null}
                    {tabActive == 1?<Scroll
                        page={page}
                        total={total}
                        height='100%'
                        needMore={true}
                        onScrollToUpper={this.onScrollToUpper.bind(this)}
                        onScrollToLower={this.onScrollToLower.bind(this)}
                    >
                        <View>
                            {
                                listData.map((item,index)=>{
                                    return  <OrderItem key={"listData1"+index}  onClick={this.OrderItemClick.bind(this)} />
                                })
                            }
                        </View>
                    </Scroll>:null}
                    {tabActive == 2?<Scroll
                        page={page}
                        total={total}
                        needMore={true}
                        height='100%'
                        onScrollToUpper={this.onScrollToUpper.bind(this)}
                        onScrollToLower={this.onScrollToLower.bind(this)}
                    >
                        <View>
                            {
                                listData.map((item, index)=>{
                                    return  <OrderItem  key={"listData2"+index} onClick={this.OrderItemClick.bind(this)} />
                                })
                            }
                        </View>
                    </Scroll>:null}
                </TabItem>
            </View>
        )
    }
}
