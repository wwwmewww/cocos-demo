// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Sprite)
  hero: cc.Sprite = null;

  @property(cc.Component.EventHandler)
  eventHandle: Array<cc.Component.EventHandler> = [];

  @property(cc.Integer)
  touchCount: cc.Integer = 0;
  // LIFE-CYCLE CALLBACKS:
  start() {
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  }

  onDestroy() {
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  }

  onLoad() {
    // cc.Component.EventHandler.emitEvents(this.eventHandle, {});
  }

  // update (dt) {}

  _onTouchEnded (event) {
    // console.log(event)
    this.move(event.touch.getLocation());
    event.stopPropagation();
  },

  getAngle(touchPos,heroPos) {
    if(touchPos.x > heroPos.x && touchPos.y < heroPos.y) {
      return Math.atan((heroPos.y - touchPos.y)/(touchPos.x - heroPos.x))*180/Math.PI - 180
    } else if(touchPos.x < heroPos.x && touchPos.y < heroPos.y) {
      return Math.atan((heroPos.x - touchPos.x)/(heroPos.y - touchPos.y))*180/Math.PI - 90;
    } else if(touchPos.x < heroPos.x && touchPos.y > heroPos.y) {
      return Math.atan((touchPos.y - heroPos.y)/(heroPos.x - touchPos.x))*180/Math.PI;
    } else if(touchPos.x > heroPos.x && touchPos.y > heroPos.y) {
      return Math.atan((touchPos.x - heroPos.x)/(touchPos.y - heroPos.y))*180/Math.PI + 90;
    }
  }

  move(p) {
    this.touchCount++;
    const { node } = this.hero;
    const script = this.hero.node.getComponent('hero');
    script.walk();

    const position = this.hero.node.parent.convertToNodeSpaceAR(p);
    const a = this.getAngle(position, cc.v2(node.x,node.y));
    if((a < 22.5 && a >= 0) || (a < 0 && a >= -22.5)) {
      script.lbtn(); //左
    } else if (a < 67.5 && a >= 22.5) {
      script.ulbtn(); //左上
    } else if (a < 112.5 && a >= 67.5) {
      script.ubtn(); //上
    } else if (a < 157.5 && a >= 112.5) {
      script.urbtn(); //右上
    } else if (a < -157.5 || a >= 157.5) {
      script.rbtn(); //右
    } else if (a < -112.5 && a >= -157.5) {
      script.brbtn(); //右下
    } else if (a < -67.5 && a >= -112.5) {
      script.bbtn(); //下
    } else if (a < -22.5 && a >= -67.5) {
      script.blbtn(); //左下
    }

    cc.tween(node)
    .to(2, { position })
    .call(()=>{
      this.touchCount--;
      if(this.touchCount === 0){
        script.stand()
      }
    })
    .start()
  }
}
