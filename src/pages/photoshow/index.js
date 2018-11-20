import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {TzHeader, Date} from "../../common"
import  {baseUtil} from "../../utils";
import classnames from 'classnames';
import './index.less'

@connect(({globle})=>({
    globle
}))
export default class PhotoShow extends Component {
    constructor(props){
        super(props);
        this.state = {
            defaultIndex:{
                actionIndex: 0,
                parentIndex:0
            },
            photoList:[
                {
                    typeName: '全部',
                    typeId: '1',
                },
                {
                    typeName: '大厅',
                    typeId: '1',
                    photolistImg: [
                        'http://p0.meituan.net/tdchotel/677e5f0e408f4e362ea337b08899e1d669255.jpg',
                        'http://p1.meituan.net/tdchotel/1b243073f2994b367ca862a1b4ce359795256.jpg',
                        'http://p0.meituan.net/tdchotel/ca1b3f4498ee7ef9b11217fd2931e78b82338.jpg',
                        'http://p0.meituan.net/tdchotel/341e671670b73d90bdf64d74e7e31ff185193.jpg',
                        'http://p0.meituan.net/tdchotel/5d6e9d0dba331ff5a9de48a4bc66c3fa54500.jpg',
                        'http://p0.meituan.net/tdchotel/79e8d998f27c50b5d7b2c5c0260e0ec455208.jpg',
                        'http://p0.meituan.net/tdchotel/4688c7224bf24a35e4e2c61327a1221c63062.jpg',
                        'http://p1.meituan.net/tdchotel/c96d598f1b286ed632326522677612cb70311.jpg',
                        'http://p0.meituan.net/tdchotel/8958727b8bf68c4f48cc1c78acb007e455095.jpg',
                        'http://p0.meituan.net/tdchotel/335da40c24a481302a14e178408fe67643619.jpg',
                    ]
                },
                {
                    typeName:'外观',
                    photolistImg:[
                        'http://p0.meituan.net/tdchotel/32c7eb95119a339f40cddc876ef41fe752357.jpg',
                        'http://p1.meituan.net/tdchotel/79a6f6a0ae545f72b76e86632e05d5e794807.jpg',
                        'http://p1.meituan.net/tdchotel/70a63bc2fa5b236f929beb29734c25a760677.jpg',
                        'http://p0.meituan.net/tdchotel/35a4a5bb988355c34a6e30df716e38ed55951.jpg',
                        'http://p1.meituan.net/tdchotel/3bb47bb2521c0328f7407fee9ca2816340476.jpg',
                        'http://p0.meituan.net/tdchotel/72801dee79fe67a4e6e24e15c2a4499042101.jpg',
                        'http://p0.meituan.net/tdchotel/1154657de29008bcab9de8c3291bfdd255274.jpg',
                        'http://p1.meituan.net/tdchotel/70a63bc2fa5b236f929beb29734c25a760677.jpg',
                        'http://p1.meituan.net/tdchotel/794cdf8b2cfb9686409eaf63f76b5d7364679.jpg',
                        'http://p1.meituan.net/tdchotel/b9506cbad54b3260de4c6e19aa5212d351166.jpg',
                        'http://p1.meituan.net/tdchotel/6f089f287fa81e02b8d30ca605bbeeed60005.jpg'
                    ]
                }
            ]
        }
    }
    //页面渲染
    render() {
        let { outHeight } =  this.props.globle,
            { photoList, defaultIndex } =  this.state;

        return <View className='photo-show'>
            <TzHeader  mode='white' type={process.env.TARO_ENV} >商家相册</TzHeader>
            <View className='photo-show-container' style={{"height":`calc(100% - ${baseUtil.calcHeightWeappH5(88+outHeight)})`}}>
                <View className='scroll-hotel-type' style={{
                    height: baseUtil.calcHeightWeappH5(100),
                    "line-height":baseUtil.calcHeightWeappH5(100)
                }}>
                    <ScrollView
                        scrollX
                        style={{"width":"100%"}}>
                        {
                            photoList.map(function(item, index){
                                return  <View className={classnames('type-btn',{
                                    'active': index === defaultIndex.parentIndex
                                })}>{item.typeName}</View>
                            })
                        }
                    </ScrollView>
                </View>
                <View className='photo-show-content' style={{"height":`calc(100% - ${baseUtil.calcHeightWeappH5(100)})`}}>
                    <ScrollView
                        scrollY
                        style={{"height":'100%'}}>
                        <View className='content'>
                        {
                            photoList.map(function(item, index){
                                if(index === 0){
                                    return <View id={'photolist'+index} key={'photolist'+index} ></View>
                                }
                                if(index !== 0){
                                    return <View className='photo-list-item' id={'photolist'+index} key={'photolist'+index}>
                                        <View className='title'>{`${item.typeName}(${item.photolistImg.length})`}</View>
                                        <View className='photo-list-single'>
                                            {
                                                item.photolistImg.map(function(imgItem){
                                                    return <View key={'photolistImg'+imgItem}>
                                                        <Image src={imgItem}/>
                                                    </View>
                                                })
                                            }
                                        </View>
                                    </View>
                                }
                            })
                        }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    }
}
