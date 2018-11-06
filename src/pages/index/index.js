import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import {BSTSlider}from '../../common/modal/index'
import {TzHeader} from "../../common"

import './index.less'

@connect(({globle}) => ({
    ...globle,
}))
class Index extends Component {

    config = {
        "navigationBarTextStyle": "black",
  }
  constructor(props){
      super(props);
      this.state={
        sliderScale:[
          {label:"10块",value:10},
          {label:"50块",value:50},
          {label:"70块",value:70},
          {label:"100块",value:100}
        ]
      }
  }

  componentWillReceiveProps (nextProps) {
    //console.log(this.props, nextProps)
  }

  componentDidMount() {
      this.props.dispatch({
          type:'globle/load'
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  testalert(abc){
      // 跳转到目的页面，打开新页面
      Taro.navigateTo({
          url: '/pages/city/index'
      })
  }
  sliderChange(e){
    console.log(e)
  }
  render () {
    return (
      <View className='index'>
          <TzHeader title='首页' mode='white' type={process.env.TARO_ENV} />

        <AtButton type='primary' onClick={this.testalert.bind(this,123)}>按钮文案</AtButton>
        <BSTSlider mode='custom' scale={this.state.sliderScale} onChange={this.sliderChange} />
        {/*<BSTSlider />*/}
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
