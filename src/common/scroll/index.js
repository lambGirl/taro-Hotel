import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';

import  './index.less'

export default class Scroll extends Component{
  constructor(props){
    super(props);
  }
  onScrollToUpper(e){
    this.props.onScrollToUpper?this.props.onScrollToUpper(e):'';
  }
  onScrollToLower(e){
      this.props.onScrollToLower?this.props.onScrollToLower(e):'';
  }
  render(){
    let {page, total,needMore,height} =  this.props;
    return <ScrollView
      className='scrollview'
      scrollY
      scrollWithAnimation
      scrollTop='0'
      style={{height: height}}
      lowerThreshold='40'
      upperThreshold='20'
      onScrollToUpper={this.onScrollToUpper.bind(this)}
      onScrollToLower={this.onScrollToLower.bind(this)}
    >
      <View>
        {this.props.children}
      </View>
        {
            needMore?<View className='pagedown'>
                {page >= total? '加载完成...': '加载中...'}
            </View>:null
        }
    </ScrollView>
  }
}
