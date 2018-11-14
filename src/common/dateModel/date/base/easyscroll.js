import React from 'react'
import Styles  from './index.less'
import './index.less'
/**
 * Created by wolfs on 2016/8/24.
 */
class EasyScroll extends React.Component {
    constructor(props) {
        super();
        this.height=props.height||document.body.clientHeight+'px';
    }

    render() {
        return (<div className={Styles["ui-scroll"]} style={{position:'relative',overflowY:'auto',height:this.props.height||this.height,"paddingBottom":this.props.paddingBottom,"boxSize":this.props.boxSize}}>
            {this.props.children}
        </div>)
    }
}

module.exports=EasyScroll;
