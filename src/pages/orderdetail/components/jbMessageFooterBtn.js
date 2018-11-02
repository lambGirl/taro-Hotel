import Taro, {Component} from  '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import './sectionCss.less';

export default class jdMessage extends Component{
    static  defaultProps = {
        btns: ['查看线路', '联系商家']
    }

    btnClick(index){
        this.props.onClick(index);
    }

    render(){
        let { btns } =  this.props;
        return <View className='btn-double'>
                <View className='btn' onClick={this.btnClick.bind(this, 0)}>
                    <View className='address'>
                        <Text>{ btns[0] }</Text>
                    </View>
                </View>
                <View className='btn' onClick={this.btnClick.bind(this, 1)}>
                    <View className='phone'>
                        <Text>{ btns[1] }</Text>
                    </View>
                </View>
            </View>
    }
}
