import taro,{Component} from '@tarojs/taro'
import { View,Text } from "@tarojs/components"
import { baseUtil } from "../../utils"
import classnames from 'classnames'
import './index.less'

class OrderDetailStatus extends Component{

    render(){
        let {top, orderDetail} = this.props;
       return <View className='orderDetail-status'>
            <View className={classnames('orderDetail-status-Content',{
                ['mangLine']:top.mangLine,
                ['singleLine']:top.singleLine,
            })}>
                <View className='status-text'>
                    <Text className={classnames('orderStatus',{
                        ["paying"]:top.icon === 'paying',
                        ["useing"]:top.icon === 'useing',
                        ["used"]:top.icon === 'used',
                        ["retired"]:top.icon === 'retired'
                    })}></Text>
                    <Text>{top.status}</Text>
                </View>
                <View className='price-detail'>
                    <Text>¥{baseUtil.numFixed1(orderDetail.totalPrice)}</Text>
                    <Text className='orderStatus-warning' ></Text>
                </View>
            </View>
            {top.mangLine?<View className='orderDetail-status-detail'>{this.props.children}</View>:""}
        </View>
    }
}

export default OrderDetailStatus;
