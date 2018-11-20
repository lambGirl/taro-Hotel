import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less'
import  {baseUtil} from "../../utils";

class Tab extends Component{
    static defaultProps = {
        tabItem: ["default1","default2","default3"],
        tabActive: 0,
        onClick:(index)=>{console.log("index", index)}
    }

    tabClickSelf(index, name){
       this.props.onClick(index,name);
    }

    render(){
        let { tabItem,  tabActive, height} =  this.props;
        return <View className='tab-content' style={{"height":`calc(100% - ${baseUtil.calcHeightWeappH5(height)})`}}>
            <View className='tab'>
                {tabItem.map((name, index)=>{
                    return <View key={index+name}  onClick={this.tabClickSelf.bind(this,index, name)}  className={classnames('tab_item',{['active']: index === tabActive})}>{ name }</View>
                })}
            </View>
            <View className="content" style={{'height':`calc(100% -  ${baseUtil.calcHeightWeappH5(80)})`}}>
                {this.props.children}
            </View>
        </View>
    }
}

Tab.propTypes = {
    tabItem: PropTypes.array,
    tabActive:PropTypes.number,
};

export default Tab;
