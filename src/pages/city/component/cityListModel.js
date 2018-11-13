import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Text} from '@tarojs/components'
import './index.less'
import { baseUtil } from "../../../utils";

export default class CityListModel extends Component{
    constructor(props){
        super(props);
        this.state = {
            outHeight:0,    //微信顶部的高度
            defaultTop: 200,    //滚动顶部的高度
        }
    }

    componentDidMount(){
        let { outHeight } = this.state;
        if(Taro.getEnv() === "WEAPP") {
            wx.getSystemInfo({
                success: res => {
                    outHeight = res.statusBarHeight*2;
                    this.setState({
                        "outHeight":  outHeight
                    })
                }
            })
        }
    }


    render(){
        let { defaultTop,  outHeight } =  this.state;
        let  top =  Taro.pxTransform(defaultTop+outHeight);
        let { filterData,noLocal  } =  this.props;
        var v = noLocal,c1 = [], c2 = [], c3 = [];
        if(filterData.length&&noLocal){
            filterData.map((item)=>{
                if (item.cityName.indexOf(v) !== 0 && item.cityName.indexOf(v) !== -1 ) {
                    c2.push(item);
                } else if ( (item.cityName.indexOf(v) === 0 || item.fullName === v || item.fullName.indexOf(v) !== -1 || item.shortName.indexOf(v) === 0) ) {
                    c1.push(item);
                } else if (item.cityName.indexOf(v) === -1 && (item.fullName !== v || item.fullName.indexOf(v) === -1) && item.shortName.indexOf(v) !== 0 ) {
                   c3.push(item)
                }
            })
        }

        return <View className='city-list-showModel' style={{"top":top}}>
            <View className='content' >
                <ScrollView
                    className='scrollview'
                    scrollY
                    scrollWithAnimation
                    scrollTop='0'
                    style='height: 500px;'
                    lowerThreshold='20'
                    upperThreshold='20'>
                    {
                        c1.length?c1.map((item,index)=>{
                            let {hotc, hot1, hot} =  baseUtil.filterData(item, noLocal);
                            return <View className='city' key={'city-list-c1'+index}>
                                {`${hot1}`}<Text className='high-light'>{`${hot}`}</Text>{`${hotc}`}
                                <Text className="cityName_car">{item.parentRegionName}</Text>
                            </View>
                        }):''
                    }
                    {
                        c2.length?c2.map((item,index)=>{
                            let {hotc, hot1, hot} =  baseUtil.filterData(item, noLocal);
                            return <View className='city' key={'city-list-c2'+index}>
                                {`${hot1}`}<Text className='high-light'>{`${hot}`}</Text>{`${hotc}`}
                                <Text className="cityName_car">{item.parentRegionName}</Text>
                            </View>
                        }):''
                    }
                    {
                        c3.length?c3.map((item, index)=>{
                            return <View className='city' key={'city-list-c3'+index}>
                                {item.cityName}
                                <Text className="cityName_car">{item.parentRegionName}</Text>
                            </View>
                        }):''
                    }
                </ScrollView>
            </View>
        </View>
    }
}
