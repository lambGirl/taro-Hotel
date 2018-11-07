import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Input} from '@tarojs/components'
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
            viewId:'',
            scrollTop:0,
            env: process.env.TARO_ENV
        }
    }

    componentDidMount () {
        //console.log("22222");
        this.props.dispatch({
            type:'city/fetchCity',
            payload:{}
        })
    }
    moveScroll(e){
        //console.log("e", e);
        let { id } =  e.target.dataset, { env } =  this.state;
        // 如果是小程序环境
        if(env === 'weapp'){
          this.setState({
            "viewId": id
          });
        }

        //如果是其他环境
        this.setState({
            scrollTop: this.refs[id].vnode.dom.offsetTop-44
        })
    }

    getAddress(item){
        console.log("item", item);
    }

    render () {
        let { cityList, shortcutList } =  this.props, { env } =  this.state;
        //console.log("this.props", cityList);
        return (
            <View>
                <TzHeader title='选择城市' mode='white' type={env} />
                <View  className="city-search">
                    <View className="icon-search">
                        <Text className="search-icon"></Text>
                    </View>
                    <Input ref="search"
                           name="search"
                           placeholder='成都，chengdu，cd'/>
                </View>
                <ScrollView className='cityList'
                            scrollY
                            scrollWithAnimation={true}
                            scrollTop={this.state.scrollTop}
                            scrollIntoView ={this.state.viewId}
                            style='height:500px'>
                    <View className='citylist-content'>
                        <View  className="list-group" id='dw'  ref='dw'>
                            <View className="list-group-title" style={{"color":'#707070'}}>当前定位城市</View>
                            <View className='positionAdress'>
                                <View>成都</View>
                                <View className='icon'><View className="locationIocn"></View></View>
                            </View>
                        </View>
                        {
                            cityList.map((itemList,ParentIndex)=>{
                                return <View  key={'cityList'+ParentIndex} className="list-group" ref={`first${itemList.title}`} id={`first${itemList.title}`} >
                                    <View className="list-group-title">{itemList.title}</View>
                                    <View className='city-list-Item'>
                                        {
                                            itemList.items.map((item,sonIndex)=>{
                                                return <View className='list-group-item' key={'cityList'+ParentIndex+"itemList"+sonIndex} onClick={this.getAddress.bind(this, item)}>
                                                    <View className='content'>
                                                        <Text className='name'>{item.cityName}</Text>
                                                        <Text className='parentRegion'>{item.parentRegionName}</Text>
                                                    </View>
                                                </View>
                                            })
                                        }
                                    </View>
                                </View>
                            })
                        }

                    </View>
                </ScrollView>
                <View className="list-shortcut">
                    {
                        shortcutList.map((item , index)=>{
                            if(item === "定位"){
                                return <View className="item" data-id='dw' onClick={this.moveScroll.bind(this)}>{item}</View>
                            }
                            return <View className="item" data-id={`first${item}`}  onClick={this.moveScroll.bind(this)}>{item}</View>
                        })
                    }

                </View>
            </View>
        )
    }
}
