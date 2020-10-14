// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

enum Dir {
  r = 1, //右
  ur = 8, //右上
  u = 15, //上
  ul = 22, //左上
  l = 29, //左
  bl = 36, //左下
  b = 43, //下
  br = 50, //右下
}
enum State {
  stand = 6, //站着
  walk = 5, //走着
}

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.SpriteAtlas)
  sa: cc.SpriteAtlas = null;
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {}

  start() {
    this.dir = Dir.ul;
    this.state = State.stand;
    this.ImgIndex = 0;

    this.timer = setInterval(() => {
      let index = this.getStart() + this.ImgIndex;
      let limit = this.state == State.stand ? 6 : 9;
      this.node.getComponent(cc.Sprite).spriteFrame = this.sa.getSpriteFrame(`${this.state}-${index}`)
      this.ImgIndex = (index >= this.getStart() + limit) ? 0 : this.ImgIndex + 1;
    }, 200);
  }

  getStart() {
    const isStand = this.state == State.stand;
    if(isStand) return  this.dir;
    switch(this.dir) {
      case Dir.b:
        return 61;
      case Dir.bl:
        return 51;
      case Dir.br:
        return 71;
      case Dir.l:
        return 41;
      case Dir.r:
        return 1;
      case Dir.u:
        return 21;
      case Dir.ul:
        return 31;
      case Dir.ur:
        return 11;
    }
  }

  move() {
    console.log("1111");
  }
  rbtn() {
    console.log('右')
    this.dir = Dir.r;
    this.ImgIndex = 0;
  }
  urbtn() {
    console.log('右上')
    this.dir = Dir.ur;
    this.ImgIndex = 0;
  }
  ubtn() {
    console.log('上')
    this.dir = Dir.u;
    this.ImgIndex = 0;
  }
  ulbtn() {
    console.log('左上')
    this.dir = Dir.ul;
    this.ImgIndex = 0;
  }
  lbtn() {
    console.log('左')
    this.dir = Dir.l;
    this.ImgIndex = 0;
  }
  blbtn() {
    console.log('左下')
    this.dir = Dir.bl;
    this.ImgIndex = 0;
  }
  bbtn() {
    console.log('下')
    this.dir = Dir.b;
    this.ImgIndex = 0;
  }
  brbtn() {
    console.log('右下')
    this.dir = Dir.br;
    this.ImgIndex = 0;
  }
  walk() {
    console.log('走')
    this.state = State.walk;
    this.ImgIndex = 0;
  }
  stand() {
    console.log('站')
    this.state = State.stand;
    this.ImgIndex = 0;
  }

  // update (dt) {}
}
