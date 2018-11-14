import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import classnames from 'classnames';
import './index.less';

export default class HostListItem extends Component{
    render(){
        return  <View className='hotelList-listItem'>
            <View className='image'></View>
            <View className='rightcontent'>
                <View className='top'>
                    <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                    <View className='scoreType'>
                        <View>4.8<Text>分</Text></View>
                        <View className={classnames("common",{
                                'level-HighGrade':false,
                                'level-luxury':true,
                                'level-general':false,
                            }
                        )}>
                            <Text>高档型</Text>
                        </View>
                    </View>
                    <View className='labelType'>
                        <View>蜜月出行</View>
                        <View>休闲情调</View>
                        <View>浪漫情侣</View>
                    </View>
                </View>
                <View className='bottom'>
                    <View className='fontSize26 color999'>双流，距我79km</View>
                    <View>
                        <Text className='fontSize20 colorF60'>¥</Text>
                        <Text className='fontSize50 colorF60'>668</Text>
                        <Text className='fontSize22 color999'>起</Text>
                    </View>
                </View>
            </View>
        </View>
    }
}
