import Taro, {Component} from  '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import './sectionCss.less';

export default class jdMessage extends Component{
    render(){
        return <View  className='cardBox-content-model'>
            <View className='model2'>
                <View className='header'>
                    <View className='header-line'>
                        爱丽思酒店
                    </View>
                    <View className='header-right'>
                        <View>查看商家</View>
                        <View className='icon'></View>
                    </View>
                </View>
                <View className='content'>
                    武侯区锦城大道666号奥克斯广场国际公馆5栋
                </View>
            </View>
            <View className={classnames('model2',{
                'np-mb':true
            })}>
                <View className='header'>
                    <View className='header-line'>
                        商务标间
                    </View>
                    <View className='header-right'>
                        <View>查看房型</View>
                        <View className='icon'></View>
                    </View>
                </View>
                <View className='content'>
                    入住：9-26（今天） 离店：9-27（明天）共1晚1间 双床 不含早 有宽带
                </View>
            </View>
            <View className='btn-double'>
                <View className='btn'>
                    <View className='address'>
                        <Text>查看线路</Text>
                    </View>
                </View>
                <View className='btn'>
                    <View className='phone'>
                        <Text>联系商家</Text>
                    </View>
                </View>
            </View>
        </View>
    }
}
