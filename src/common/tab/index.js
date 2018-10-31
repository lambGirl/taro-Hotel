import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less'

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
        let { tabItem,  tabActive} =  this.props;
        return <View className='tab-content'>
            <View className='tab'>
                {tabItem.map((name, index)=>{
                    return <View key={index+name}  onClick={this.tabClickSelf.bind(this,index, name)}  className={classnames('tab_item',{['active']: index === tabActive})}>{ name }</View>
                })}
            </View>
            <View className="content">
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
