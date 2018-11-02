import Taro, {Component} from  '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import './sectionCss.less';

export default class jdMessage extends Component{
    static  defaultProps = {
         mb:false,
         leftName:'商务标间',
         rightName: '查看房型'
    }

    ItemClick(){
        this.props.onClick(1);
    }

    render(){
        let {mb, leftName,rightName } = this.props;
        return  <View className={classnames('model2',{
                'np-mb':mb
            })} onClick={this.ItemClick.bind(this)}>
                <View className='header'>
                    <View className='header-line'>
                        { leftName }
                    </View>
                    <View className='header-right'>
                        <View>{ rightName }</View>
                        <View className='icon'></View>
                    </View>
                </View>
                <View className='content'>
                    { this.props.children }
                </View>
        </View>
    }
}
