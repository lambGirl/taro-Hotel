import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Text, Input} from '@tarojs/components'
import { TzHeader } from '../../common'
import { connect } from '@tarojs/redux';
import CityListModel from './component/cityListModel'
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
            env: process.env.TARO_ENV,
            noLocal:'',
            showModel:false,
            filterData:[],  //过滤后的数据
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
        //console.log("id", id);
        // 如果是小程序环境
        if(env === 'weapp'){
          this.setState({
            "viewId": id
          });
          return;
        }

        //如果是其他环境
        this.setState({
            scrollTop: document.getElementById(id).offsetTop-document.getElementsByClassName("list-group-title")[0].clientHeight*2-this.refs.searchBar.vnode.dom.offsetHeight
        })
    }

    getAddress(item){
        console.log("item", item);
    }

    refValue(node){
        console.log(node);
    }

    //数据的改变
    keywordChange(e){
        //过滤数据
        if(e.target.value){
            //return;
            //console.log("newCity",this.props);
            let { citys } =  this.props, val =  e.target.value.toLowerCase();

            if(!citys.length){
                return;
            }

            let newCity =  citys.filter(function(product){
                //console.log("product",product);
                return Object.keys(product).some(function(item){
                    return product['shortName'].indexOf(val) == 0 ||
                        product['fullName'].indexOf(val) == 0 ||
                        product['cityName'].indexOf(val) != -1
                })
            });

            this.setState({
                "filterData":newCity.sort(this.localeCompare),
            })
        }
        this.setState({
            "noLocal":  e.target.value,
            "showModel":  e.target.value&&true||false
        })

    }

    //清空
    inputClear(){
        this.setState({
            "noLocal":'',
            "showModel": false
        })
    }

    render () {
        let { cityList, shortcutList } =  this.props, { env,showModel, filterData} =  this.state;
       // console.log("this.props", viewId);
        return (
            <View>
                <TzHeader title='选择城市' mode='white' type={env} />
                <View  className="city-search" ref="searchBar">
                    <View className="icon-search">
                        <Text className="search-icon"></Text>
                    </View>
                    <Input ref="search"
                           name="search"
                           value={this.state.noLocal}
                           placeholder='成都，chengdu，cd' onInput={this.keywordChange.bind(this)} />
                    {showModel?<View className='icon-clear' onClick={this.inputClear.bind(this)}>
                    <Text className="search-icon-clear"></Text>
                </View>:''}
                    {showModel?<CityListModel filterData={filterData} noLocal={this.state.noLocal}/>: ''}
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
                                return <View  key={'cityList'+ParentIndex} className="list-group"  id={`first${itemList.title}`} >
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
                            return <View key={"shortcutList"+index} className="item" data-id={item === "定位"?"dw":"first"+item}  onClick={this.moveScroll.bind(this)}>{item}</View>
                        })
                    }
                </View>
            </View>
        )
    }
}
