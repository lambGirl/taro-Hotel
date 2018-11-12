import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classnames from 'classnames'
import './index.less'

export default class SelectBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            defaultHeight:100,  //默认的高度
            contentShow:false,
            selectConfig:{
                currentIndex:'',
                barData:[
                    {
                        name:'全城',
                        key:'all',
                        chooseKey:'all',
                        type:0, //单条 验证值是否相同
                        footer: false
                    },
                    {
                        name:'价格/星级',
                        chooseKey:'',
                        type:1, //就表示是否有值
                        footer: true
                    },
                    {
                        name:'距离优先',
                        key:'1',
                        chooseKey:'1',
                        type:0, //单条 验证值是否相同
                        footer: false
                    },
                    {
                        name:'筛选',
                        chooseKey:'',
                        type:1, //就表示是否有值
                        footer: true
                    },
                ]
            }
        }
    }

    barshowhidden(contentShow, index){
        let { selectConfig } =  this.state;
        selectConfig.currentIndex =  index;
        this.setState({
            contentShow: contentShow,
            selectConfig: selectConfig
        })
    }

    render(){
        let { contentShow, selectConfig, defaultHeight } = this.state, { outHeight } =  this.props,
            top =  Taro.pxTransform(defaultHeight+outHeight);
        return <View className='selectBarContent'>
            <View className='selectBar'>
                {
                    selectConfig.barData.map((item,index)=>{
                        let { key,chooseKey,type } = item;
                        //let down =  selectConfig.currentIndex === index;
                        let up_active =selectConfig.currentIndex === index;
                        let down_active = type===0? key !== chooseKey: (type===1 ? chooseKey:false);
                        return <View className="selectBarItem" onClick={this.barshowhidden.bind(this,true, index)}>
                            <View>{item.name}</View>
                            <View className={classnames("trangle", {
                                ["down"]:true,
                                ["up-active"]:up_active,
                                ["down-active"]:down_active,
                            })}></View>
                        </View>
                    })
                }
            </View>

            {contentShow?<View className={classnames("content")}  style={{"top": top}}>
                <View className='model' onClick={this.barshowhidden.bind(this, false,'')}></View>
                <View className='selectContent-container'>
                    <View className='mainContent'></View>
                    {selectConfig.currentIndex !== ""&&selectConfig.barData[selectConfig.currentIndex].footer?<View className='btns'>
                        <View>重置</View>
                        <View>确认</View>
                    </View>:null}
                </View>
            </View>:null}
        </View>
    }
}
