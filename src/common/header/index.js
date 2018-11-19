import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components';
import classnames from 'classnames';
import { back }  from '../../utils'
import './index.less'
import {mergeCssStr,formatCss}from '../common'
 class Header extends Component{
    constructor(props){
        props.boxStyle=props.boxStyle||'';
        props.iconStyle=props.iconStyle||'';
        super(props);
        this.state = {
            headerHeight: 90,
        }
    }
    static defaultProps = {
        defaultClick:()=>{back()}
    }

    componentDidMount(){
        let { headerHeight } = this.state;
        if(Taro.getEnv() === "WEAPP") {
            wx.getSystemInfo({
                success: res => {
                    //console.log("statusBarHeight",res.statusBarHeight,  headerHeight);
                    headerHeight += res.statusBarHeight*2;
                    this.setState({
                       "headerHeight":  headerHeight
                    })
                }
            })
        }
    }

    leftIcon(mode){
        let Icon = "White";
        switch(mode){
            case 'white':Icon =  "Black"; break;
            case 'gradient':Icon =  "White"; break;
            case 'whiteBlue':Icon =  "WhiteBlue"; break;
        }
        return Icon
    }

    leftPropsClick(){
      let { defaultClick, onClick} = this.props;
     // console.log(typeof  onClick);
      if(typeof  onClick === "function"){
          onClick();
          return;
      }
      defaultClick();
    }

    render(){
        let { title, type, mode, rightText,boxStyle,iconStyle } =  this.props, { headerHeight } =  this.state;
        let leftIcon =  this.leftIcon(mode), styles={
            "paddingTop":Taro.pxTransform(headerHeight)
        };

        let heightVal = Taro.pxTransform(headerHeight);
        //判断微信的header
        return <View  style={mergeCssStr(boxStyle,"height:"+heightVal)} className={classnames('header-parent',{
              [`${type}-header-${mode}`]:true,
            })}>
                <View className={classnames({
                    "header-common":true,
                })}>
                    <View className='left-header' onClick={this.leftPropsClick.bind(this)}>
                        <View className="header-icon"  style={formatCss(iconStyle)} > </View>
                        {/*<Text className={classnames(`headerleftIcon${leftIcon}`)}> </Text>*/}
                    </View>
                    <View className='center-header'>{this.props.children}</View>
                    <View className='right-header'>
                        {rightText||''}
                    </View>
                </View>
        </View>
    }
}

export default  Header
