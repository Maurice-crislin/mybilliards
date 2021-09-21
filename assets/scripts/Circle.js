// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        impulse: {
            default: 0,
            type: cc.Integer
        }

    },

    onLoad() {
        this.heroRigidBody = this.node.getComponent(cc.RigidBody)
        this.isMoving = false
    },

    beat(angle) {
        console.log("beat")
        angle = cc.misc.degreesToRadians(angle)
        this.heroRigidBody
            .applyLinearImpulse(
                cc.v2(this.impulse * Math.cos(angle), this.impulse * Math.sin(angle)),
                this.heroRigidBody.getWorldCenter(),
                true
            )
        this.isMoving = true

    },
    update(dt) {
        let { x, y } = this.heroRigidBody.linearVelocity
        if (x == 0 && y == 0 && this.isMoving) {
            this.isMoving = false
        }

    },
});