import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components';
import DateDetail from './date/date.js'
import classnames from 'classnames';
import './index.less'
export default class Date extends Component{
    static  defaultProps ={
        title:'选择日期',

    }

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }
    DateStatus(){
        this.props.onHiddenClick(false);
    }
    getDate(){
        let {startEndDate} =  this.refs.date.state;
        this.props.onGetDate(startEndDate);
    }

    render(){
        let { title, dateShow,initDate } =  this.props;
        return <View className='weappH5-date' style={{"display":dateShow?'block':'none'}}>
            <View className='model' onClick={this.DateStatus.bind(this)}></View>
            <View className='content model-show' >
                <View  className='header'>
                    <View>{title}</View>
                    <View className='close' onClick={this.DateStatus.bind(this)}></View>
                </View>
                <View>
                    <DateDetail  model='dateMiddle' ref='date' initDate={initDate}/>
                </View>
                <View className='footer'>
                    <View onClick={this.DateStatus.bind(this)}>取消</View>
                    <View onClick={this.getDate.bind(this)}>确认</View>
                </View>
         </View>
        </View>
    }
}
