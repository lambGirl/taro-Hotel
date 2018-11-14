import React,{ Component }from 'react';
import  BScroll from 'better-scroll';
class Scroll extends Component {
    static defaultProps = {
        probeType:1,
        click:true,
        listenScroll:false,
        data:[],
        pullup:false,
        beforeScroll:false,
        refreshDelay:20,
        wrapperClass:'',
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this._initScroll();
        window.addEventListener('resize',() =>{
            this.refresh();
        })
    }

    componentWillUpdate(){
        this.refresh()
    }

    componentDidUpdate(){
        this.refresh()
    }

    _initScroll(){
        let {probeType,click,listenScroll,pullup,beforeScroll} = this.props;
        let {wrapper} = this.refs;
        let self = this
        if (!wrapper){
            return;
        }
        this.scroll = new BScroll(wrapper,{
            probeType:probeType,
            click:click
        });
        if (listenScroll){
            this.scroll.on('scroll',(pos) =>{
                self.props.scrollFun && self.props.scrollFun(pos)
            })
        }
        if (pullup){
            this.scroll.on('scrollEnd',() =>{
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)){
                    self.props.scrollEndFun && self.props.scrollEndFun()
                }
            })
        }
        if (beforeScroll){
            this.scroll.on('beforeScrollStart',() =>{
                self.props.beforeScrollStartFun && self.props.beforeScrollStartFun()
            })
        }
    }

    enable(){
        this.scroll && this.scroll.enable()
    }

    refresh(){
        this.scroll && this.scroll.refresh()
    }

    scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    }

    scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }

    render(){
        let {children,wrapperClass,data} = this.props;
        return (
            <div ref="wrapper" className={wrapperClass}>
                {children}
            </div>
        )
    }
}
export default  Scroll;
