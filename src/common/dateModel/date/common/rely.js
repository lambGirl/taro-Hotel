// eslint-disable-next-line
/*获取当前系统时间 格式：2017-01-21*/
Date.prototype.getLoactionTime = function(){
    return {
        FullYear:this.getFullYear(),
        Month:parseInt(this.getMonth()) + 1,
        date:this.getDate(),
        week:this.getDay()
    }
};
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/*判断是不是闰年*/
Date.isLeapYear = function(year){
    return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
};
/*平年 -每月对应的天数*/
Date.YEAR_NOT_LEAP = [31,28,31,30,31,30,31,31,30,31,30,31];
/*闰年 -每月对应的天数*/
Date.YEAR_LEAP = [31,29,31,30,31,30,31,31,30,31,30,31];
/*时间格式化处理函数 2017-12-1*/
Date.timeFormat = function(FullYear,Month,date){
    return [FullYear,Month < 9 ? '0' + Month : Month,date < 9 ? '0' + date : date].join('-')
};

//求两个时间的天数差 日期格式为 YYYY-MM-dd
Date.daysBetween = function(DateOne,DateTwo){
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf('-') + 1);
    var OneYear = DateOne.substring(0,DateOne.indexOf('-'));
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf('-') + 1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf('-'));
    var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
    return cha;
}
//把时间格式如 2017-02-02-->['2017','2','2']
Date.StringToArr = function(str){
    let Arr = str.split('-');
    return [parseInt(Arr[0]),parseInt(Arr[1]),parseInt(Arr[2])]
};

/*特殊日期*/
/*{
        date:Date.timeFormat(new Date().getLoactionTime().FullYear,new Date().getLoactionTime().Month,new Date().getLoactionTime().date),
        text:'今天'
    }*/
Date.specialDate = [
    {
        date:Date.timeFormat(new Date().getLoactionTime().FullYear,new Date().getLoactionTime().Month,new Date().getLoactionTime().date),
        text:''
    }
];




