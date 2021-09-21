// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        targetCircle: {
            default: null,
            type: cc.Node
        },

    },


    onLoad() {
        this.node.goToBeat = false;
        this.script = this.targetCircle.getComponent("Circle")
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {

            //获取鼠标的当前位置坐标
            var loc = event.getLocation();

            this._mousePosition = loc;
            //将坐标转换到父节点的坐标系下
            loc = this.parent.convertToNodeSpaceAR(loc);

            //计算与（1，0）向量的夹脚，改夹脚即为球杆需要转动的角度
            let angle = loc.signAngle(cc.v2(1, 0));
            angle = cc.misc.radiansToDegrees(angle);
            //设置球杆的角度
            this.angle = -angle;

        }, this.node);

        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function(event) {
            if (event.getScrollY() <= 0 && !this.goToBeat) {
                this.goToBeat = true
            }
        }, this.node)

    },

    fade() {
        this.node.opacity = 0
    },
    recover() {
        this.node.opacity = 255

    },

    update(dt) {
        console.log(this.node.opacity)
        if (this.node.goToBeat) {
            this.node.goToBeat = false
            this.fade()
            this.script.beat(this.node.angle)

        }

        if (!this.script.isMoving) {
            this.recover();
        }
    },
});