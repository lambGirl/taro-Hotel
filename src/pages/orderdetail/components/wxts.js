import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './sectionCss.less'
export default class wxts extends Component{
    render(){
        return <View className="title-content-topDown">
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
    }
}
