import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TzHeader, SelectBar } from "../../common"
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
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='hotelList-listItem'>
                        <View className='image'></View>
                        <View className='rightcontent'>
                            <View className='top'>
                                <View className='title'>威斯凯尔酒店(新会展中心店)</View>
                                <View className='scoreType'>
                                    <View>4.8<Text>分</Text></View>
                                    <View className={classnames("common",{
                                            'level-HighGrade':false,
                                            'level-luxury':true,
                                            'level-general':false,
                                        }
                                    )}>
                                        <Text>高档型</Text>
                                    </View>
                                </View>
                                <View className='labelType'>
                                    <View>蜜月出行</View>
                                    <View>休闲情调</View>
                                    <View>浪漫情侣</View>
                                </View>
                            </View>
                            <View className='bottom'>
                                <View className='fontSize26 color999'>双流，距我79km</View>
                                <View>
                                    <Text className='fontSize20 colorF60'>¥</Text>
                                    <Text className='fontSize50 colorF60'>668</Text>
                                    <Text className='fontSize22 color999'>起</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Scroll>
        </View>
    }
}
