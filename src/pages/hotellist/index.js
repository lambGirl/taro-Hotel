import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, SelectBar,HotelListItem } from "../../common"
import './index.less';
import classnames from 'classnames'
import Scroll from "../../common/scroll"
import { baseUtil } from "../../utils";

@connect(({globle})=>({
    globle
}))
export default class HotelList extends Component{

    config = {
        "navigationBarTextStyle": "black",
    }

    constructor(props){
        super(props);
        this.state = {
            page: 1,
            total:0
        }
    }

    componentDidMount(){
    }

    onScrollToLower(e){

    }

    render(){

        let { page, total } =  this.state, {outHeight} =  this.props.globle;
        let Height =  outHeight + 100 + 88, SelectBarHeight = outHeight+88;
        return <View className='hotellist'>
            <TzHeader   mode='whiteBlue' type={process.env.TARO_ENV} rightText='地图' ref='header'>
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
            <SelectBar outHeight={SelectBarHeight} ref='SelectBar'/>
            <View className="hotel-list-scroll-content" style={{"height":`calc(100% - ${baseUtil.calcHeightWeappH5(Height)})`}}>
                <Scroll
                    page={page}
                    total={total}
                    height='100%'
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
        </View>
    }
}
