import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components';
import DateDetail from './date/date'
import classnames from 'classnames';
import './index.less'
export default class Date extends Component{
    static  defaultProps ={
        title:'日期'
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("dateDetail", this.refs.dateDetail.vnode.dom.clientHeight);
    }

    render(){
        let { title } =  this.props;
        return <View className='weappH5-date'>
            <View className='model'></View>
            <View className='content' ref='dateDetail'>
                <View>
                    <View>{title}</View>
                    <View>X</View>
                </View>
                <View >
                    <DateDetail />
                </View>
            </View>
        </View>
    }
}
