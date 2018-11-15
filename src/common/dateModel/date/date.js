import Taro,{ Component }from '@tarojs/taro';
import {ScrollView, View, Text}  from '@tarojs/components';
import './common/rely.js';
import SelfYear from './common/Class.js';
import classNames from 'classnames'
import './date.less'

class DH extends Component {
    static defaultProps = {
        title:'日期选择器Dome',
        defaultDate:['2018-11-15'],
        startEndDate:['2018-11-15', '2018-11-20'],    //开始时间，结束时间
        middleDate:['2018-11-16','2018-11-17','2018-11-18','2018-11-19'],  //开始时间与结束时间之间相差的日期
        limitDate:150,
        holidays:[
            {
                date:"2018-11-15",
                id:3673,
                name:"国庆节",
                play:1,
                year:2018
            },
            {
                date:"2018-05-04",
                id:3673,
                name:"",
                play:1,
                year:2018
            },
            {
                date:"2018-03-30",
                id:3673,
                name:"国庆",
                play:1,
                year:2018
            }
        ],
        DateChange:null,
        chooseNumber:4,
        type:'more',
        model: 'common', //统一的样式 jpmp: 景区门票
        sellDetail:[]
    }

    constructor(props){
        let {FullYear,Month,date} = new Date().getLoactionTime();
        super(props)
        this.state = {
            week:['日','一','二','三','四','五','六'],
            activeDate:[],
            monthArr:this.Leap(FullYear,Month,date),
        }
    }

    componentWillMount(){
      //  console.log("props", this.props.holidays);
        let {FullYear,Month,date} = new Date().getLoactionTime();
        this.setState({
            activeDate:this.props.defaultDate
        });
    }

    //年处理
    Leap(FullYear,Month,date){
        let show_Month, //显示月份
            show_date, //显示天数
            {limitDate,holidays} = this.props,
            Today = Date.timeFormat(new Date().getLoactionTime().FullYear,new Date().getLoactionTime().Month,new Date().getLoactionTime().date),
            Tomorrow = Date.timeFormat(new Date().getLoactionTime().FullYear,new Date().getLoactionTime().Month,(new Date().getLoactionTime().date + 1));
        for(let i = 0,len = holidays.length; i < len; i++) {
            if (holidays[i].date == Today ){ //&& holidays[i].name
                this._changeText(holidays[i])
            }
        }

        /*当前年分是不是闰年*/
        let MONTH_DATE = Date.YEAR_NOT_LEAP;
        if (Date.isLeapYear(FullYear)){
            MONTH_DATE = Date.YEAR_LEAP;
        }
        /*现在当月还剩多少天*/
        show_date = parseInt(MONTH_DATE[Month - 1]) - parseInt(date) + 1;
        show_Month = 1;
        /*判断时候满足显示天数的显示*/
        while (show_date < limitDate) {
            show_date += parseInt(MONTH_DATE[(Month + show_Month - 1) % 12]);
            show_Month++;
        }
       // 构造年月
        let tepMnth = [];
        for(let j = 0; j < show_Month; j++) {
            tepMnth.push(new SelfYear((FullYear + ((Month + j)%12==0?((Month + j)/12-1):Math.floor((Month + j) / 12))),(Month + j) % 12 == 0 ? 12 : (Month + j) % 12,limitDate));
        }
       // console.log(tepMnth)
        return tepMnth;
    }

    //月份渲染
    renderMonth(monthArr){

    }

    /*active 算法*/
    _algorithm(date){
        let {activeDate} = this.state,results = false;
        for(let i = 0,len = activeDate.length; i < len; i++) {
            if (activeDate[i] == date){
                results = true
            }
        }
        return results
    }


    /*切换日期,多选择*/
    toggleDate(date){
        let {activeDate} = this.state,results = [],temp = [],{DateChange,chooseNumber} = this.props;
        let index = activeDate.indexOf(date)
        if (index > -1){  /*选择日期在当前选择数组中时候---取消选择*/
            activeDate.splice(index,1)
            temp = activeDate
        } else {  /*选择日期没有在当前选择数组中时候---选择*/
            let now_time = new Date(Date.parse(date.replace(/-/g,"/"))).getTime();
            const TIME_INTERVAL = 24 * 60 * 60 * 1000;
            temp = [date];
            let lastNum = chooseNumber - 1;
            results[lastNum] = date;
            for(let i = 1; i < chooseNumber; i++) {
                let NextTime = now_time + i * TIME_INTERVAL,
                    PrevTime = now_time - i * TIME_INTERVAL,
                    NextDate = new Date(NextTime),
                    PrevDate = new Date(PrevTime);
                results[lastNum + i] = this.formatDateTime(NextDate);
                results[lastNum - i] = this.formatDateTime(PrevDate);
            }
            activeDate.forEach((item) =>{
                if (results.indexOf(item) > -1){
                    temp.push(item)
                }
            })
        }
        this.setState({
            "activeDate":temp
        },function(){
            DateChange && DateChange(temp.sort())
        })
        //let sortDate = temp.sort()
        //console.log(now_time)
    }
    chooseSingle(date, tag){
        let {DateChange} = this.props, temp= [date];

        this.setState({
            "activeDate":temp
        },function(){
            DateChange && DateChange(temp.sort(),tag);
        })

    }
    //改变今天明天的显示文字
    _changeText(holiday){
        let _special = Date.specialDate;
       // console.log(Date.specialDate,"outer/*8*")
        for(let i = 0,len = _special.length; i < len; i++) {
          //  console.log(_special[i])
            if (_special[i].date == holiday.date){
                Date.specialDate[i].text = holiday.name; //holiday.name;
            }
        }
    }

    formatDateTime(date){
        let Year = date.getFullYear(),
            Month = date.getMonth() + 1,
            day = date.getDate();
        Month = Month < 10 ? ('0' + Month) : Month;
        day = day < 10 ? ('0' + day) : day;
        return [Year,Month,day].join('-')
    };

    _BreakData(dataStr){
        let {holidays} = this.props,rest = false,tip, playContent = "";
        /*今天--*/
        let {FullYear,Month,date} = new Date().getLoactionTime();
        for(let i = 0,len = holidays.length; i < len; i++) {
            if(dataStr == holidays[i].date){
                playContent = holidays[i].name||holidays[i].play == "1"&&"休"||holidays[i].play=="0"&&"班"||""
            }
            /*if ((holidays[i].play == "1"||!holidays[i].play) && (dataStr == holidays[i].date)){
                rest = true
                playContent = holidays[i].play == "1"?!holidays[i].name&&"休"||holidays[i].name:"班"
            }
            if (holidays[i].name&& (dataStr == holidays[i].date)){
                tip = holidays[i].name
            }*/
        }

        return {playContent};
    }
    //显示与隐藏区域此时的sellDetail，争对景区门票而言
    _BreakSellDetial(dataStr){
        let {sellDetail} = this.props, _BreakSellDetial ={tag:false, content:''};
        for(let i = 0,len = sellDetail.length; i < len; i++) {
            if(dataStr == sellDetail[i].sellDate){
                _BreakSellDetial = {
                    tag:true,
                    content:sellDetail[i].sellPrice
                }
                break;
            }
        }
        return _BreakSellDetial;
    }

    //处理选中的日期的颜色
    _BreakDateMiddle(dataStr){

        let {startEndDate,middleDate} = this.props, _DateMiddle ={tag:false, middle:false, content:''};

        if(startEndDate.length){
            for(let i = 0,len = startEndDate.length; i < len; i++) {
                if(dataStr == startEndDate[i]){
                    _DateMiddle = {
                        tag:true,
                        middle: false,
                        content: i === 0 ?'始':'终'
                    }
                    break;
                }
            }

            if(middleDate.length){
                for(let i = 0,len = middleDate.length; i < len; i++) {
                    if(dataStr == middleDate[i]){
                        _DateMiddle = {
                            tag:false,
                            middle: true,
                            content:''
                        }
                        break;
                    }
                }
            }
        }
        return _DateMiddle;
    }
    render(){
        let {title, model} = this.props;
        let {week,monthArr} = this.state;
        return (
            <View className={classNames("DH-main",[this.props.defineClass])}>

                    <View className={"DH-week"}>
                        {
                            week.map((item,index) =>{
                                return (
                                    <View key={item.toString()} className={`DH-week-item ${index=="0"||index=="6"?` colorFC5151`:''}`}>{item}</View>
                                )
                            })
                        }
                    </View>
                    {
                        monthArr.length === 0?'':<View className={classNames('scroll-content')}>
                        <ScrollView
                        className='scrollview'
                        scrollY
                        scrollWithAnimation
                        scrollTop='0'
                        lowerThreshold='40'
                        upperThreshold='20'
                        style={{"height":'100%'}}
                        >
                                <View className="DH-month-main">
                                    {
                                        monthArr.map((item,index) =>{
                                            //console.log("monthArr",monthArr);
                                            let str = `${item.FullYear}年${item.Month < 9 ? '0' + item.Month : item.Month}月`
                                            return (
                                                <View className="DH-month" key={index + "_/*"}>
                                                    <View className={new Date().getLoactionTime()["FullYear"]==item.FullYear&&item.Month==new Date().getLoactionTime()["Month"]?`DH-month-title`:classNames(`DH-month-title`,`color3E3E3E`)}>{str}</View>
                                                    <View className="DH-month-date">
                                                        {
                                                            item.week.map((n,wekkindex) =>{
                                                                return (<View key={wekkindex.toString() + '_data'}></View>)
                                                            })
                                                        }
                                                        {

                                                            item.date.map((day,daIndex) =>{

                                                                let {FullYear,Month} = item;
                                                                    let ClassStr,
                                                                        dataStr = `${FullYear}-${Month < 10 ? ('0' + Month) : Month}-${day.date < 10 ? '0' + day.date : day.date}`,
                                                                        classActiveStr, _BreakSellDetial= '',
                                                                        allow = day.allow, active = false,middle = false;

                                                                    //这里是针对类似于景区门票那种多选，带有价格显示的
                                                                    if(model === 'showtip'){
                                                                        _BreakSellDetial =  this._BreakSellDetial(dataStr);
                                                                        allow = _BreakSellDetial.tag;
                                                                    }

                                                                    //这里是针对酒店这种需要选择起始时间，并且画出起始时间与结束时间中间的时间计算
                                                                    if(model === 'dateMiddle'){
                                                                        _BreakSellDetial =  this._BreakDateMiddle(dataStr);
                                                                        active = _BreakSellDetial.tag;
                                                                        middle =  _BreakSellDetial.middle
                                                                    }

                                                                    //allow && ( ClassStr = 'DH-month-date-allow');
                                                                    //allow && (classActiveStr = 'DH-active-date');
                                                                    let _BreakData = this._BreakData(dataStr); //allow = _BreakData.playContent;
                                                                    return (
                                                                        <View className={classNames({
                                                                            "DH-month-date-allow": allow
                                                                        })} key={daIndex + '_day*/'}
                                                                             onClick={allow ? this.props.type=="common"&&this.toggleDate.bind(this,dataStr)||this.chooseSingle.bind(this, dataStr,_BreakSellDetial) : null}>
                                                                            <View className={classNames({
                                                                                "DH-active-date": active,
                                                                                "DH-active-middle-date": middle
                                                                            })}>
                                                                                <View className={"tip"}>{_BreakData.playContent}</View>
                                                                                {dataStr == new Date().format("yyyy-MM-dd")?<View className="cn_fontSize">今天</View>:<View className="en_fontSize">{day.date}</View>}
                                                                                <View className="remark">{_BreakSellDetial.content?`¥${_BreakSellDetial.content}`:''}</View>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                            )}
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    }
                  {/*{this.renderMonth(monthArr)}*/}
            </View>
        )
    }
}
export default DH;
