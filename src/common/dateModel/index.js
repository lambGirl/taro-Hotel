import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components';
import DateDetail from './date/date'
import classnames from 'classnames';
import './index.less'
export default class Date extends Component{
    static  defaultProps ={
        title:'选择日期'
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        let { title } =  this.props;
        return <View className='weappH5-date'>
            <View className='model'></View>
            <View className='content' >
                <View  className='header'>
                    <View>{title}</View>
                    <View className='close'></View>
                </View>
                <View >
                    <DateDetail  model='dateMiddle'/>
                </View>
            </View>
        </View>
    }
}
