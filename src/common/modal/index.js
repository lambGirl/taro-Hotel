/**
 * Created by hu on 2018/10/23.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components';
import {Displacementer}from '../common'

import './index.less'
/*
 scaleItem:{
    label:"一百",
    value:100
 }
*/

class BSTSlider extends Component {
  constructor(props){
    props.value=props.value||[];
    props.scale=props.scale||[];
    props.mode=props.mode||'ratio';

    super(props);
    this.types=['range','default'];
    this.modes=['ratio','custom'];
    if(this.modes.indexOf(this.props.mode)==-1){
        throw new Error("slider 参数错误（mode）"+this.props.mode)
    }

    this.Dl=new Displacementer(props.value[0]);
    this.Dr=new Displacementer(props.value[1]);

    this.lineWidth=0;
    this.isSlid=false;//是否可以滑动
    this.nowTouch='';//当前点击的手柄

    this.state={
      leftMaskWidth:props.value[0]||0,
      rightMaskWidth:props.value[1]||0,
    }
  }
  componentDidMount () {
    this.lineWidth=this.refs.line.vnode.dom.offsetWidth;
    if(this.props.mode=='custom'){
      let unitLength=this.lineWidth/(this.props.scale.length-1);
      this.unitLength=unitLength;
      this.scale=this.props.scale.map(function (item,index) {
        item.scaleValue=unitLength*index;
        return item
      })
    }

    console.log(this.lineWidth,Taro.getEnv(),"-------------")
  }

  componentDidShow () { }

  componentDidHide () { }
  handleTouchstart(pt,e){
    // console.log("touch",e)
    if(e.touches.length==1){
      let
        self=this,
        touch=e.touches[0];
      this.isSlid=true;
      this.nowTouch=pt;
      switch (this.nowTouch){
        case 'left':self.Dl.init(touch.clientX,touch.clientY);break;
        case 'right':self.Dr.init(touch.clientX,touch.clientY);break;
      }
    }
  }
  boxTouchmove(e){
    // console.log("move",e)
    if(this.isSlid&&(e.touches.length==1)){
      let
        self=this,
        touch=e.touches[0],
        stateObj={};
      switch (this.nowTouch){
        case 'left':
          var touchData=self.Dl.getData(touch.clientX,touch.clientY);
          stateObj={leftMaskWidth:(touchData.cacheMoveX+touchData.moveX)+"px"}
          ;break;
        case 'right':
          var touchData=self.Dr.getData(touch.clientX,touch.clientY);
          stateObj={rightMaskWidth:(touchData.cacheMoveX+touchData.moveX)+"px"}
          ;break;
      }
      this.setState(stateObj)
    }
  }
  handleTouchend(pt,e){
      this.isSlid=false;
      let ratio=0;
      if(this.props.mode=='custom'){//如果滑动方式为自定义
        let
          self=this,
          unitLength=this.unitLength;
        ;
        switch (this.nowTouch){
          case 'left':
            var moveX=this.Dl.cacheMoveX;
                ratio=moveX%unitLength>=(unitLength/2)?Math.ceil(moveX/unitLength):Math.floor(moveX/unitLength);//占比
             var endMoveX=ratio*unitLength;
                self.setState({leftMaskWidth:endMoveX+"px"});
            break;
          case 'right':
            var moveX=this.Dr.cacheMoveX;
                ratio=moveX%unitLength>=(unitLength/2)?Math.ceil(moveX/unitLength):Math.floor(moveX/unitLength);//占比
            var endMoveX=ratio*unitLength;
                self.setState({rightMaskWidth:endMoveX+"px"});
        }
        this.props.onChange&&this.props.onChange.call(this,this.scale[ratio])
      }else {
        ratio=this[this.nowTouch=='left'?'Dl':'Dr'].save().cacheMoveX/this.lineWidth*100+"%";
        this.props.onChange&&this.props.onChange.call(this,ratio)
      }

    this.nowTouch='';
  }
  render(){
    return <View className='bst-slider-box' onTouchMove={this.boxTouchmove.bind(this)} >
              <View className='bst-slider-content' ref="line">
                <View className='bst-slider-handle left-handle'
                      style={{left:this.state.leftMaskWidth}}
                      onTouchStart={this.handleTouchstart.bind(this,'left')}
                      onTouchEnd={this.handleTouchend.bind(this)}
                />
                {
                  this.props.type=='range'&&
                  <View className='bst-slider-handle right-handle'
                        style={{right:rightMaskWidth}}
                        onTouchStart={this.handleTouchstart.bind(this,'right')}
                        onTouchEnd={this.handleTouchend.bind(this)}
                  />
                }
                <View className='bst-sliderMask-left' style={{width:this.state.leftMaskWidth}}/>
                {this.props.type=='range'&&<View className='bst-sliderMask-right' style={{width:this.state.rightMaskWidth}}/>}
              </View>
            </View>

  }
}
var
  A=[104.065723,30.578051],
  B=[104.05927,30.571832];
function toRad(d) {  return d * Math.PI / 180; }
function getDisance(lat1, lng1, lat2, lng2) { //#lat为纬度, lng为经度, 一定不要弄错
  var dis = 0;
  var radLat1 = toRad(lat1);
  var radLat2 = toRad(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRad(lng1) - toRad(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
}

export { BSTSlider}
