import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, SelectBar } from "../../common"
import './index.less';
import classnames from 'classnames'

export default class HotelList extends Component{

    constructor(props){
        super(props);
        this.state = {
            outHeight: 90
        }
    }

    componentDidMount(){
        let { outHeight } = this.state;
        if(Taro.getEnv() === "WEAPP") {
            wx.getSystemInfo({
                success: res => {
                    //console.log("statusBarHeight",res.statusBarHeight,  headerHeight);
                    outHeight = res.statusBarHeight*2;
                    this.setState({
                        "outHeight":  outHeight
                    })
                }
            })
        }
    }
    render(){
        let { outHeight } =  this.state;
        return <View>
            <TzHeader  title='酒店列表' mode='gradient' type={process.env.TARO_ENV} />
            <SelectBar outHeight={outHeight}/>
        </View>
    }
}
