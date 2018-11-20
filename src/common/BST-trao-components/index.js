/**
 * Created by hu on 2018/11/7.
 */
/**
 * Created by hu on 2018/10/23.
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components';
import {Displacementer,mergeCssStr,formatCss}from '../common'

import './index.less'
/*

滑动条
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
      leftA:"none",//动画
      rightA:"none",
      leftSlidingRange:[],
      rightSlidingRange:[],
    }
  }
  componentDidMount (e) {
    let
      self=this,
      line=this.refs.line;
    switch (Taro.getEnv()){
      case "WEB":
        //此处有坑，获取到的实际dom宽度为渲染之前的宽度；需异步获取
        setTimeout(function () {
          self.lineWidth=line.vnode.dom.offsetWidth;
          self.customSet();
        });
        break;
      case "WEAPP":
        line.boundingClientRect(function (resut) {
          self.lineWidth=resut.width;
          self.customSet()
        }).exec();
        break;
    }
  }
  customSet(){
    let rangeStateObj={leftSlidingRange:[0,this.lineWidth]};
    console.log(this.lineWidth,"this.lineWidth")
    if(this.props.type=='range'){
      this.lineWidth=this.lineWidth-30;
      rangeStateObj={
        leftSlidingRange:[0,this.lineWidth],
        rightSlidingRange:[-this.lineWidth,0],
      }
    }
    console.log(rangeStateObj,"rangeStateObj")
    if(this.props.mode=='custom'){
      let unitLength=this.lineWidth/(this.props.scale.length-1);
      this.unitLength=unitLength;//单位长度
      this.scale=this.props.scale.map(function (item,index) {
        item.scaleValue=unitLength*index;
        return item
      })
    }
    this.setState(rangeStateObj)
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
        case 'left':self.Dl.init(touch.clientX,touch.clientY);self.setState({leftA:"none"});break;
        case 'right':self.Dr.init(touch.clientX,touch.clientY);self.setState({rightA:"none"});break;
      }
    }
  }
  boxTouchmove(e){
    // console.log("move",e)
    if(this.isSlid&&(e.touches.length==1)){
      let
        self=this,
        touch=e.touches[0],
        touchData={},//计算后的touch对象
        moveX=""//移动的绝对距离
      ;
      switch (this.nowTouch){
        case 'left':
          touchData=self.Dl.getData(touch.clientX,touch.clientY);
          moveX=touchData.cacheMoveX+touchData.moveX;
          self.rangeSwitch(moveX,self.state.leftSlidingRange,{
            left:function (value) {self.isSlid=false},
            right:function (value) {self.isSlid=false},
            common:function (value) {
              self.setState({leftMaskWidth:value+"px"});
            }
          });
          ;break;
        case 'right':
          touchData=self.Dr.getData(touch.clientX,touch.clientY);
          moveX=touchData.cacheMoveX+touchData.moveX;
          self.rangeSwitch(moveX,self.state.rightSlidingRange,{
            left:function (value) {self.isSlid=false},
            right:function (value) {self.isSlid=false},
            common:function (value) {
              self.setState({rightMaskWidth:Math.abs(value)+"px"});
            }
          });
          ;break;
      }
    }
  }
  handleTouchend(pt,e){
    this.isSlid=false;
    let
      self=this,
      ratio=0;
    if(this.props.mode=='custom'){//如果滑动方式为自定义
      let
        unitLength=this.unitLength;
      switch (this.nowTouch){
        case 'left':
          var moveX=this.Dl.cacheMoveX+this.Dl.moveX;
          ratio=moveX%unitLength>=(unitLength/2)?Math.ceil(moveX/unitLength):Math.floor(moveX/unitLength);//占比
          ratio=ratio<0?0:ratio;
          var
            endMoveX=ratio*unitLength
          ;
          self.rangeSwitch(endMoveX,self.state.leftSlidingRange,{
            common:function (value) {
              self.setState({
                leftMaskWidth:value+"px",leftA:"all 0.2s ease-out",
                rightSlidingRange:[endMoveX-this.lineWidth,self.state.rightSlidingRange[1]]
              });
              self.Dl.save(value);
            }
          });
          break;
        case 'right':
          var moveX=Math.abs(this.Dr.cacheMoveX+this.Dr.moveX);
          ratio=moveX%unitLength>=(unitLength/2)?Math.ceil(moveX/unitLength):Math.floor(moveX/unitLength);//占比
          ratio=ratio<0?0:ratio;
          var
            endMoveX=-ratio*unitLength
          ;
          self.rangeSwitch(endMoveX,self.state.rightSlidingRange,{
            common:function (value) {
              self.setState({
                rightMaskWidth:Math.abs(value)+"px",rightA:"all 0.2s ease-out",
                leftSlidingRange:[self.state.leftSlidingRange[0],this.lineWidth+endMoveX]
              });
              self.Dr.save(value);
            }
          });
          ratio=this.scale.length-ratio-1;
          break;
      }
      this.props.onTouchend&&this.props.onTouchend(this.scale[ratio])
    }else {
      ratio=this[this.nowTouch=='left'?'Dl':'Dr'].save().cacheMoveX/this.lineWidth*100;
      self.rangeSwitch(ratio,[0,100],{
        common:function (value) {
          self.setState({rightMaskWidth:value+"px",rightA:"all 0.2s ease-out"});
          self[this.nowTouch=='left'?'Dl':'Dr'].save(value);
        }
      });
      this.props.onTouchend&&this.props.onTouchend(this,ratio)
    }

    this.nowTouch='';
  }
  rangeSwitch(value,rangeAry,boundary){
    // console.log(value,rangeAry,"----------")
    if(value<rangeAry[0]){boundary.left&&boundary.left.call(this,rangeAry[0]);boundary.common&&boundary.common.call(this,rangeAry[0])}
    if(value>rangeAry[1]){boundary.right&&boundary.right.call(this,rangeAry[1]);boundary.common&&boundary.common.call(this,rangeAry[1])}
    if(value>=rangeAry[0]&&value<=rangeAry[1]){boundary.center&&boundary.center.call(this,value);boundary.common&&boundary.common.call(this,value)}
  }
  testClick(){
    this.props.onClick()

  }
  render(){
    return <View className='bst-slider-box' onTouchMove={this.boxTouchmove.bind(this)}>
      <View className='bst-slider-content' ref="line">
        <View className='bst-slider-handle left-handle'
              style={{left:this.state.leftMaskWidth,transition:this.state.leftA}}
              onTouchStart={this.handleTouchstart.bind(this,'left')}
              onTouchEnd={this.handleTouchend.bind(this)}
        />
        {
          this.props.type=='range'&&
          <View className='bst-slider-handle right-handle'
                style={{right:this.state.rightMaskWidth,transition:this.state.rightA}}
                onTouchStart={this.handleTouchstart.bind(this,'right')}
                onTouchEnd={this.handleTouchend.bind(this)}
          />
        }
        <View className='bst-sliderMask-left' style={{width:this.state.leftMaskWidth,transition:this.state.leftA}}/>
        {this.props.type=='range'&&<View className='bst-sliderMask-right' style={{width:this.state.rightMaskWidth,transition:this.state.rightA}}/>}
      </View>
    </View>

  }
}
class BSTHeader extends Component {
  constructor(props){
    props.boxStyle=props.boxStyle||"";
    props.leftStyle=props.leftStyle||"";
    props.centerStyle=props.centerStyle||"";
    props.backWidth=props.backWidth||"50px";
    props.backZindex=props.backZindex||"5";
    props.noBack=props.hasOwnProperty("noBack");
    super(props);
    this.state={
      height:parseInt(formatCss(props.boxStyle).height)||45,
      boxPaddingTop:0
    }
  }
  componentDidMount(){
    this.getStateLineHeight()

  }
  getStateLineHeight(callback){
    let {height}=this.state;
    let self=this;
    switch (Taro.getEnv()){
      case "WEAPP":

          wx.getSystemInfo({
            success:function (res) {
              height += res.statusBarHeight;
              self.setState({
                height:  height,
                boxPaddingTop:res.statusBarHeight+"px"
              });
              callback&&callback(height)
            }
          });
        break;
    }
  }
  render(){
    let {boxStyle,leftStyle,centerStyle,backWidth,backZindex,noBack}=this.props;
    return <View className="bst-nav-bar" style={mergeCssStr(
                boxStyle||"",
                "height:"+this.state.height+"px;padding-top:"+this.state.boxPaddingTop
            )}>
                {
                  !noBack&&<View
                    className="bst-nav-left"
                    style={mergeCssStr(leftStyle,"width:"+backWidth+";margin-right:-"+backWidth+";z-index:"+backZindex)}
                    onTap={this.navback.bind(this)}
                  > </View>
              }
              <View
                className="bst-nav-center"
                style={mergeCssStr("padding-right:"+backWidth,centerStyle,"padding-left:"+backWidth)}
              >{this.props.children}</View>
            </View>
  }
  navback(){
    let
      backFun=this.props.backFun,
      flag=false
    ;
    if(backFun){
      flag=this.props.backFun()
    }
    !flag&&Taro.navigateBack()
  }
}
class BSTAdsorbent extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    console.log(this,"----dsadsaas--------");

  }
  render(){
    return <View className="bst-adsorbent-box">
      <View className="bst-adsorbent-content">{this.props.children}</View>
    </View>
  }
}
export { BSTSlider,BSTHeader,BSTAdsorbent}
