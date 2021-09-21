// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node
        },

    },



    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            console.log(this.canvas)
        }, this);
    },

    start() {

    },

    // update (dt) {},
});