import Taro, {Component} from  '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import './sectionCss.less';
export default class LineListCardContent extends Component{
    static  defaultProps = {
        doubleLine: false,
        name:'杨超',
        content:'180081006669',

    }
    render(){
        let {name, doubleLine, content} =  this.props;
        return <View className='line-list-item'>
            <View className="name">{name}</View>
            {
              !doubleLine?<View className="content">{content}</View>:<View className="content doubleLine" style={{"WebkitBoxOrient":"vertical","boxOrient":'vertical',"MozBoxOrient":"vertical","msboxOrient":'vertical'}}>
                  {content}
              </View>
            }
        </View>
    }
}
