/**
 * Created by hu on 2018/10/23.
 */
class Displacementer {
  constructor(cacheMoveX,cacheMoveY){
    this.beforX=0;
    this.beforY=0;
    this.moveX=0;
    this.moveY=0;
    this.distance=0;
    this.moveDirection='';
    this.isTap=false;
    this.cacheMoveX=cacheMoveX||0;
    this.cacheMoveY=cacheMoveY||0;
    this.frozen={x:0,y:0}
  }
  init(x,y){
      this.beforX=Number(x);
      this.beforY=Number(y);
      this.moveX=0;
      this.moveY=0;
      this.distance=0;
      this.moveDirection='';
      this.isTap=false;
  }
  frozenXY(xORy){this.frozen[xORy.toLowerCase()]=this["move"+xORy.toUpperCase()]}//冻结moveX/moveY
  thawXY(xORy){this.frozen[xORy.toLowerCase()]=""}//解冻moveX/moveY
  getData(x,y){
    let moveX=this.frozen.x||(Number(x)-this.beforX),
        moveY=this.frozen.y||(Number(y)-this.beforY),
        moveObj={x:0,y:0}
    ;

    if(!this.isTap){
      if(Math.abs(moveX)>=Math.abs(moveY)){
        if(moveX>0){
          this.moveDirection="right"
        }else {
          this.moveDirection="left"
        }
        moveObj.x=moveX
      }else {
        if(moveY>0){
          this.moveDirection="bottom"
        }else {
          this.moveDirection="top"
        }
        moveObj.y=moveY
      }
      this.isTap=true
    }
    this.distance=Math.sqrt(Math.pow(this.moveX,2)+Math.pow(this.moveY,2));
    this.moveX=moveX;
    this.moveY=moveY;
    this.directionData=moveObj;
    return {
      moveX:moveX,
      moveY:moveY,
      distance:this.distance,
      moveDirection:this.moveDirection,
      directionData:moveObj,
      cacheMoveX:this.cacheMoveX,
      cacheMoveY:this.cacheMoveY,
    }
  }
  save(x,y){
    this.cacheMoveX=x!='undefined'?x:(this.cacheMoveX+this.moveX);
    this.cacheMoveY=y!='undefined'?y:(this.cacheMoveY+this.moveY);
    this.moveX=0;
    this.moveY=0;
    return {
      cacheMoveX:this.cacheMoveX,
      cacheMoveY:this.cacheMoveY,
    }
  }
}
function formatCss(css) {
  if(!css){
    console.log("format css parameter error!");
    return {}
  }
  let styleObj={},cA;
  if(typeof css =="string"){
      cA=css.split(";").filter(function (f) {
        return /^\S+:\S+$/.test(f)
      });
  }else {
    cA=[];
    Object.keys(css).forEach(function (key) {
      if(key!=""){
        cA.push(key+":"+css[key])
      }
    })
  }
  cA.forEach(function (f) {
    let fAry=f.split(":"),key=fAry[0].split("-").map(function (keyF,i) {
      let kff=keyF;
      if(i!=0){
        kff=keyF.slice(0,1).toUpperCase()+keyF.slice(1)
      }
      return kff
    }).join("");
    styleObj[key]=fAry[1]
  });
  return styleObj
}
function mergeCssStr() {
  return formatCss(Object.assign.apply({},[].map.call(arguments,function (cssstr) {
    let obj={};
    cssstr.split(";").forEach(function (f) {
      if(/^\S+:\S+$/.test(f)){
        let fa=f.split(":");
        obj[fa[0]]=fa[1]
      }
    });
    return obj
  })))
}
export {Displacementer,formatCss,mergeCssStr}
