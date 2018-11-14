// eslint-disable-next-line
import './rely';
class SelfYear {
    constructor(year,month,limit){
        this.FullYear = year
        this.Month = month
        this.date = SelfYear.getMonthDay(year,month,limit).result;
        this.week = SelfYear.getWeekBlank(year,month) // 每月一号值周几
    }

    static getWeekBlank(year,month){
        let rect = []
        //确定每月第一天是星期几 - 空出几个空白区域
        let firstWeek = Date.timeFormat(year,month,'01')
        let weekNum = new Date(Date.parse(firstWeek.replace(/-/g,'/'))).getDay()
        for(let i = 0; i < weekNum; i++) {
            rect.push('week_blank')
        }
        return rect
    }

    static   getMonthDay(year,month,limit){
        let result = [],active = [];
        /*今天*/
        let {FullYear,Month,date} = new Date().getLoactionTime();
        let today = Date.timeFormat(FullYear,Month,date);
        let INNER_MONTH_DATE = Date.YEAR_NOT_LEAP;
        //判断是否是渲染当前年是非闰年
        if (Date.isLeapYear(this.year)){
            INNER_MONTH_DATE = Date.YEAR_LEAP;
        }
        /*得到这个月有多少天*/
        for(let i = 1; i <= INNER_MONTH_DATE[month - 1]; i++) {
            let loop_date = Date.timeFormat(year,month,i);
            result.push({
                date:i,
                allow:Date.daysBetween(loop_date,today) >= 0 && Date.daysBetween(loop_date,today) < limit ? true : false,
                tip:specialDate(loop_date),
                week:new Date(Date.parse(loop_date.replace(/-/g,'/'))).getDay()
            })
        }
        return {
            result
        }
    }
}
function specialDate(loop_date){

    for(let i = 0,len = Date.specialDate.length; i < len; i++) {
        if (loop_date == Date.specialDate[i].date){
            return Date.specialDate[i].text
        }
    }
}
export  default SelfYear
