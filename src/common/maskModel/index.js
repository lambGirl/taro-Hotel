import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text,Image } from '@tarojs/components';
import classnames from 'classnames'
import './index.less'
export default class MaskModel extends Component{
    static defaultProps = {
        show:false
    }

    close(){
        this.props.onClick(0);
    }

    render(){
        let { show } = this.props;
        return show?<View className={classnames('maskModel',{
           'action':show
        })}>
                <View className='mask'></View>
                <View className='model'>
                    <View className='close' onClick={this.close.bind(this)}>X</View>
                    { this.props.children }
                </View>
        </View>:null

    }
}
