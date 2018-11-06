import Taro from "@tarojs/taro";
let headerHeight = 45;

class Singer{
    constructor({cityNo,cityName,parentRegionName,childrens,shortName}) {
        this.cityNo = cityNo;
        this.cityName = cityName,
            this.shortName = shortName,
            this.parentRegionName = parentRegionName,
            this.childrens = childrens||[]
    }
}

function back(){
   // console.log("WEAPP",Taro.getEnv() )
    if(Taro.getEnv() === "WEAPP"){
        Taro.navigateBack();
        return;
    }
    history.back();

}
//按照汉字排序
var localeCompare =  function(a,b){
    if(!a&&!b){
        return;
    }
    return a.shortName.localeCompare(b.shortName);
}
//得到城市数据
const redetailSingleData = (list)=>{


    let map = {
        other: {
            title: '其他',
            items: []
        }
    };

   // console.log("list", list.entries());
    //return;

    for (let [index,item] of list.entries()) {
        var first =  item.shortName.substr(0,1).toLocaleUpperCase()
        if (!map[first]) {
            map[first] = {
                title: first,
                items: []
            }
        }
        if (/[a-zA-Z]/.test(first)) {
            map[first].items.push(new Singer({
                cityNo: item.cityNo,
                cityName: item.cityName,
                shortName:item.shortName,
                parentRegionName: item.parentRegionName,
                childrens:item.childrens||[]
            }));
        } else {
            map.other.items.push(new Singer({
                cityNo: item.cityNo,
                cityName: item.cityName,
                shortName:item.shortName,
                parentRegionName: item.parentRegionName,
                childrens:item.childrens||[]
            }))
        }
    }
    let ret = [];
    for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
            val.items.sort(localeCompare);
            // console.log("item", val.items);
            ret.push(val)
        }
    }

    ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    });
    // ret.sort().sort().sort()
    return [...ret];
}

//得到大小写数据
const shortcutListData = (list)=>{
    let List = ["定位"];
    let ListArry = list.map(group => {return group.title.substr(0,1)});
    //   console.log("ListArry",ListArry);
    return List.concat(ListArry);
}

const baseUtil = {
    numFixed:function(v,n){
        return n=n||2,n=Math.pow(10,n),Math.round(v*n)/n;
    },
    numFixed1:function(v){
        var newv=this.numFixed(v,1);
        return parseInt(newv)==newv?newv+".0":newv;
    },
    //格式化时间
    convertNum(v){
        return v < 10 ? "0" + v : v;
    },
    orderDetailStatus(status){
        var detail = ""
        switch(status){
            case "booking":detail = {
                singleLine:true,
                mangLine: false,
                statusColor:'#3E3E3E',
                status:'下单中',
                doubleBtn:false,
                singleBtn:false,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "book_succeed":detail = {
                status:'待支付',
                singleLine:false,
                statusColor:'#FF6137',
                mangLine: true,
                doubleBtn:true,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        pay: true,
                        delete: false
                    }
                }
            };break;
            case "selling":detail = {
                status:'购票中',
                singleLine:false,
                statusColor:'#3E3E3E',
                mangLine: true,
                doubleBtn:false,
                singleBtn:false,
                statusContent:"请耐心等待，抢到票后会第一时间告诉你",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "sell_failed":detail = {
                status:'购票失败',
                singleLine:false,
                statusColor:'#ACACAC',
                mangLine: true,
                singleBtn:true,
                doubleBtn:false,
                statusContent:"",
                pz:false,   //凭证模块是否显示
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }

            };break;
            case "sell_succeed":detail = {
                status:'待使用',
                singleLine:true,
                statusColor:'#3E3E3E',
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                pz:true,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                statusContent:"",
                refundMoney:true,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: true
                    }
                }
            };break;
            case "consume_succeed":detail = {
                status:'已使用',
                singleLine:true,
                statusColor:'#ACACAC',
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'used',
                statusContent:"",
                refundMoney:false,
                icon:'used',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        pay: false,
                        delete: true
                    }
                }
            };break;
            case "backed":detail = {
                status:'已退款',
                singleLine:false,
                mangLine: true,
                statusColor:'#ACACAC',
                singleBtn:false,
                doubleBtn:false,
                statusContent:"7个工作日内退款返还至您的账户，请耐心等待~",
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'backed',
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:true,
                    btnList:{
                        payment: false, delete:true
                    }
                }
            };break;
            case "backing":detail = {
                status:'退票中',
                singleLine:false,
                statusColor:'#3E3E3E',
                mangLine: true,
                singleBtn:false,
                doubleBtn:false,
                statusContent:"请耐心等待，正在为您退票",
                pz:true,   //凭证模块是否显示
                pzDisable: true, //凭证模块是否颜色禁用
                pzClass:'backing',
                refundMoney:false,
                icon:'paying',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "sell_fail":detail = {
                status:'退票失败',
                singleLine:true,
                mangLine: false,
                singleBtn:true,
                doubleBtn:false,
                statusColor:'#3E3E3E',
                statusContent:"",
                pz:true,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                refundMoney:false,
                icon:'retired',
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
            case "cancelled":detail = {
                status:'已取消',
                singleLine:true,
                mangLine: false,
                singleBtn:false,
                doubleBtn:false,
                statusColor:'#ACACAC',
                statusContent:"",
                refundMoney:false,
                icon:'retired',
                pz:false,   //凭证模块是否显示
                pzDisable: false, //凭证模块是否颜色禁用
                orderListGroupBtn:{
                    show:false,
                    btnList:{
                        pay: false,
                        delete: false
                    }
                }
            };break;
        }
        return detail;
    }
}

export {
    back,
    baseUtil,
    redetailSingleData,
    shortcutListData
}
