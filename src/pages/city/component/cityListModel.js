import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView} from '@tarojs/components'
import './index.less'

export default class CityListModel extends Component{
    constructor(props){
        super(props);
        this.state = {
            outHeight:0,
            defaultTop: 200,

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
        let { defaultTop,  outHeight } =  this.state;
        let  top =  Taro.pxTransform(defaultTop+outHeight);
        let { filterData,noLocal  } =  this.props;
        var v = noLocal, datas =filterData, itemss = [], hot1, hot, hotc;
        if(datas.length){
            var c1 = [], c2 = [], c3 = [];
            datas.map((item, index)=>{
                itemss[ index ] = []
                if ( (item.shortName.indexOf(v) === 0 && item.shortName.length === v.length) || item.cityName.indexOf(v) === 0 ) {
                    hot = item.cityName.substr(0, v.length)
                    hotc = item.cityName.substr(v.length, item.cityName.length)
                    hot1 = ""
                } else if ( item.cityName.indexOf(v) !== 0 && item.cityName.indexOf(v) !== -1 ) {
                    hot1 = item.cityName.substr(0, item.cityName.indexOf(v));
                    hot = item.cityName.substr(item.cityName.indexOf(v), v.length);
                    hotc = item.cityName.substr(item.cityName.indexOf(v) + v.length, item.cityName.length);
                } else if ( item.fullName === v ) {
                    hotc = "";
                    hot = item.cityName
                    hot1 = "";
                } else if ( item.fullName.indexOf(v) !== -1 ) {
                    hotc = item.cityName;
                    hot = "";
                    hot1 = ""
                } else {
                    hotc = item.cityName
                    hot = "";
                    hot1 = "";
                }
                var cityNames = item.parentRegionName;
                if (item.cityName.indexOf(v) !== 0 && item.cityName.indexOf(v) !== -1 ) {
                    c2.push( <View className='city'>
                        {`${hot1}`}<i>{`${hot}`}</i>{`${hotc}`}
                        <Text className="cityName_car">{cityNames}</Text>
                    </View>)
                } else if ( (item.cityName.indexOf(v) === 0 || item.fullName === v || item.fullName.indexOf(v) !== -1 || item.shortName.indexOf(v) === 0) ) {
                    c1.push( <View className='city'>
                        {`${hot1}`}<i>{`${hot}`}</i>{`${hotc}`}
                        <Text className="cityName_car">{cityNames}</Text>
                    </View>)
                } else if (item.cityName.indexOf(v) === -1 && (item.fullName !== v || item.fullName.indexOf(v) === -1) && item.shortName.indexOf(v) !== 0 ) {
                    c3.push(<View className='city'>{item.cityName}</View>)
                }
            })
            c1.concat(c2,c3);
        }
       // console.log("cd1", c1);

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

                </ScrollView>
            </View>
        </View>
    }
}
