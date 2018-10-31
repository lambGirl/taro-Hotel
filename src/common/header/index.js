import Taro, { Component } from '@tarojs/taro'
import { View, Text} from '@tarojs/components';
import classnames from 'classnames';
import { back }  from '../../utils'
import './index.less'

 class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            headerHeight: 0,
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
                    headerHeight = res.statusBarHeight*2;
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
        }
        return Icon
    }

    leftPropsClick(){
      let { defaultClick, onClick} = this.props;
      console.log(typeof  onClick);
      if(typeof  onClick === "function"){
          onClick();
          return;
      }
      defaultClick();
    }

    render(){
        let { title, type, mode } =  this.props, { headerHeight } =  this.state;
        let leftIcon =  this.leftIcon(mode), styles={
            "paddingTop":Taro.pxTransform(headerHeight)
        };
        //let heightVal = Taro.pxTransform(headerHeight);
        //console.log("heightVal",heightVal);
        //判断微信的header
        return <View  style={styles} className={classnames('header-parent',{
              [`${type}-header-${mode}`]:true,
            })}>
                <View className={classnames({
                    "header-common":true,
                })}>
                    <View className='left-header' onClick={this.leftPropsClick.bind(this)}>
                        <Text className={classnames(`headerleftIcon${leftIcon}`)}></Text>
                    </View>
                    <View className='center-header'>{title}</View>
                    <View className='right-header'></View>
                </View>
        </View>
    }
}

export default  Header
