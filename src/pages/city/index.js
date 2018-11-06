import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text} from '@tarojs/components'
import { TzHeader } from '../../common'
import { connect } from '@tarojs/redux';
import './index.less'

@connect(({city}) => ({
   ...city,
}))
export default class Position extends Component {
    config = {
        enablePullDownRefresh:false,

    }

    constructor(props){
        super(props);
        this.state = {
            viewId:''
        }
    }

    componentDidMount () {
        //console.log("22222");
       /* this.props.dispatch({
            type:'city/fetchCity',
            payload:{}
        })*/
    }
    moveScroll(e){
        //console.log("e", e);
        let { id } =  e.target.dataset
        this.setState({
            "viewId": id
        },()=>{
           console.log("viewId", this.state.viewId)
        })
    }

    render () {
        let { cityList, shortcutList } =  this.props;
        //console.log("this.props", this.props);
        return (
            <View>
                <TzHeader title='选择城市' mode='white' type={process.env.TARO_ENV} />
                <ScrollView className='cityList'
                            scrollY
                            scrollWithAnimation
                            scrollTop='0'
                            scrollIntoView ={this.state.viewId}
                            style='height:500px'>
                    <View className='citylist-content'>
                        <View  className="list-group" id='dw'>
                            <View className="list-group-title" style={{"color":'#707070'}}>当前定位城市</View>
                            <View className='positionAdress'>
                                <View>成都</View>
                                <View className='icon'><View className="locationIocn"></View></View>
                            </View>
                        </View>
                        <View  className="list-group" id='firstA'>
                            <View className="list-group-title">A</View>
                            <View className='city-list-Item'>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View  className="list-group" id='firstB'>
                            <View className="list-group-title" >B</View>
                            <View className='city-list-Item'>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View  className="list-group">
                            <View className="list-group-title" id="firstA">A</View>
                            <View className='city-list-Item'>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View  className="list-group" id='firstC'>
                            <View className="list-group-title">C</View>
                            <View className='city-list-Item'>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View  className="list-group" id='firstD'>
                            <View className="list-group-title">D</View>
                            <View className='city-list-Item'>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                                <View className='list-group-item'>
                                    <View className='content'>
                                        <Text className='name'>绵阳</Text>
                                        <Text className='parentRegion'>四川</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View className="list-shortcut">
                    <View className="item" data-id='dw' onClick={this.moveScroll.bind(this)}>定位</View>
                    <View className="item" data-id='firstA'  onClick={this.moveScroll.bind(this)}>A</View>
                    <View className="item" data-id='firstB'  onClick={this.moveScroll.bind(this)}>B</View>
                    <View className="item" data-id='firstC'  onClick={this.moveScroll.bind(this)}>C</View>
                    <View className="item" data-id='firstD'  onClick={this.moveScroll.bind(this)}>D</View>
                </View>
            </View>
        )
    }
}
