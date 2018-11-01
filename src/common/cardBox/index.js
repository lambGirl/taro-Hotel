import taro,{Component} from '@tarojs/taro'
import { View,Text } from "@tarojs/components"
import { baseUtil } from "../../utils"
import classnames  from 'classnames'
import './index.less'

export default  class CardBox extends Component{
    static defaultProps = {
        cardTitle:'默认题目',     //默认题目
        disabled: false,         //当前左右的竖线变灰色
        cardTitleIcon: true,     //需不需要Icon
        CardBoxDefault: true,
        cardCenterBottom: false, //需不需要底部的横线
        mb20:false,             //设置距离底部20像素

    }

    render(){
        let {cardTitleIcon, cardTitle,cardCenterBottom,disabled ,CardBoxDefault,mb} =  this.props;
        return <View className={classnames('card',{
            ['marginBottom20']: mb
        })}>
            <View className={classnames('card-Title',{
                ['borderBottom']:cardCenterBottom,
                ['CardBoxDefault']: CardBoxDefault
            })}>
                {/* {cardTitleIcon&&<div className={Styles['card-title-leftIcon']}></div>}*/}
                <View className={classnames('name',{
                    ['border_left']:cardTitleIcon,
                    ['disabled']:disabled
                })}>
                    <Text>{cardTitle}</Text>
                </View>
            </View>
            <View className={classnames('card-content',{
                ['noPadding']:this.props.noPadding}
            )}>
                {this.props.children}
            </View>
        </View>
    }
}
