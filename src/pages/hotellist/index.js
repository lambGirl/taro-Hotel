import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, SelectBar,HotelListItem } from "../../common"
import './index.less';
import classnames from 'classnames'
import Scroll from "../../common/scroll"

export default class HotelList extends Component{

    config = {
        "navigationBarTextStyle": "black",
    }

    constructor(props){
        super(props);
        this.state = {
            outHeight:90,
            page: 1,
            total:0
        }
    }

    componentDidMount(){
        let { outHeight } = this.state;
        if(Taro.getEnv() === "WEAPP") {
            wx.getSystemInfo({
                success: res => {
                    //console.log("statusBarHeight",res.statusBarHeight,  headerHeight);
                    outHeight +=res.statusBarHeight*2;
                    this.setState({
                        "outHeight":  outHeight
                    })
                }
            })
        }
    }

    onScrollToLower(e){

    }

    render(){
        let { outHeight, page, total } =  this.state;
        return <View>
            <TzHeader   mode='whiteBlue' type={process.env.TARO_ENV} rightText='地图'>
                <View className='timeHeaderSearchBar'>
                    <View className='left-section'>
                        <View className='date-choose'>
                            <View>住 <Text className='special-size'>09-18</Text></View>
                            <View>离 <Text className='special-size'>09-19</Text></View>
                        </View>
                        <View className='down-arrow'></View>
                        <View className='middel-line'></View>
                    </View>
                    <View className='right-section'>
                         <View className='search-bar-icon'></View>
                         <View className='InputBar'>
                             <Input ref="search"
                                    name="search"
                                    placeholder='酒店/地点/关键词'/>
                         </View>
                    </View>
                </View>
            </TzHeader>
            <SelectBar outHeight={outHeight} />
            <Scroll
                page={page}
                total={total}
                height='572px'
                needMore={true}
                onScrollToLower={this.onScrollToLower.bind(this)}
            >
                <View className='hotellist-realList-container'>
                    <HotelListItem />
                    <HotelListItem />
                    <HotelListItem />
                    <HotelListItem />
                    <HotelListItem />
                </View>
            </Scroll>
        </View>
    }
}
