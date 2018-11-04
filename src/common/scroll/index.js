import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import  './index.less'

export default class Scroll extends Component{

  constructor(props){
    super(props);
  }
  onScrollToUpper(e){
    this.props.onScrollToUpper(e);
  }
  onScrollToLower(e){
    this.props.onScrollToLower(e);
  }
  render(){
    let {page, total} =  this.props;
    return <ScrollView
      className='scrollview'
      scrollY
      scrollWithAnimation
      scrollTop='0'
      style='height: 400px'
      lowerThreshold='20'
      upperThreshold='20'
      onScrollToUpper={this.onScrollToUpper.bind(this)}
      onScrollToLower={this.onScrollToLower.bind(this)}
    >
      <View>
        {this.props.children}
      </View>
      <View className='pagedown'>
        {page >= total? '加载完成...': '加载中...'}
      </View>
    </ScrollView>
  }
}
