import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text,Image } from '@tarojs/components';
import classnames from 'classnames';
import  "./index.less"

export default class orderItem extends Component{

    OrderItemClick(){
      this.props.onClick();
    }

    render(){
        return <View className={classnames("orderItem-container")} onClick={this.OrderItemClick.bind(this)}>
            <View className="top">已取消</View>
            <View className="middle">
                <View className='left'>
                    <Image />
                    <View className="content">
                        <View className="content1">
                            <View>威斯凯尔酒店</View>
                            <Text>1间，商务标间</Text>
                        </View>
                        <View className="content2">使用时间: 07月19日 10:10</View>
                    </View>
                </View>
                <View className="priceShow">
                    <Text>¥150</Text>
                </View>
            </View>
            <View className="bottom">
                <View className="con_btn del">删除</View>
            </View>
        </View>
    }
}
