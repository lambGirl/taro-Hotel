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
  getData(x,y){
    let moveX=Number(x)-this.beforX,
        moveY=Number(y)-this.beforY,
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
    this.cacheMoveX=x||(this.cacheMoveX+this.moveX);
    this.cacheMoveY=y||(this.cacheMoveY+this.moveY);
    return {
      cacheMoveX:this.cacheMoveX,
      cacheMoveY:this.cacheMoveY,
    }
  }
}
export {Displacementer}
