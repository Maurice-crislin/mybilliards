// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
        extends: cc.Component,

        properties: {
            scoreDisplay: {
                default: null,
                type: cc.Label
            },
            circlePrefab: {
                default: null,
                type: cc.Prefab
            },
            circleGroupPrefab: {
                default: null,
                type: cc.Prefab
            },
            failedPrefab: {
                default: null,
                type: cc.Prefab
            },
            successPrefab: {
                default: null,
                type: cc.Prefab
            },


        },

        onLoad() {

            //绘制调试信息
            cc.director.getPhysicsManager().enabled = true;
            //16 = cc.PhysicsManager.e_centerOfMassBit
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit | 16 | cc.PhysicsManager.DrawBits.e_jointBit;

            //重力
            cc.director.getPhysicsManager().gravity = cc.v2(0, 0);

            // 开启物理步长的设置
            var physicsManager = cc.director.getPhysicsManager();
            physicsManager.enabledAccumulator = true;
            // 物理步长，默认 FIXED_TIME_STEP 是 1/60
            cc.PhysicsManager.FIXED_TIME_STEP = 1 / 30;
            // 每次更新物理系统处理速度的迭代次数，默认为 10
            cc.PhysicsManager.VELOCITY_ITERATIONS = 8;
            // 每次更新物理系统处理位置的迭代次数，默认为 10
            cc.PhysicsManager.POSITION_ITERATIONS = 8;

            //碰撞检测系统
            this.collisionManager = cc.director.getCollisionManager();
            this.collisionManager.enabled = true;
            this.collisionManager.enabledDebugDraw = true;

            this.restart()

        },
        destroyWhiteBallAndCircleGroup() {
            if (this.whiteBall) {
                this.whiteBall.destroy();
                this.whiteBall = null;
            }

            if (this.circleGroup) {
                this.circleGroup.destroy()
                this.circleGroup = null
            }

        },
        restart() {
            this.destroyWhiteBallAndCircleGroup();
            if (this.curNode) {
                this.curNode.destroy()
                this.curNode = null
            }
            this.collisionManager.enabled = true;
            // 初始化计分
            this.score = 0;
            this.scoreDisplay.string = 'Score: ' + this.score;
            //生成一个白球
            this.spawnNewCircleAndStick();
            // 生成一个新球群
            this.spawnNewCircleGroup();


        },
        onCollisionEnter(other, self) { //onCollisionEnter self.node.group self.tag

            if (self.node.group == "default" && other.node.group == "circleGroup") {
                this.gainScore()
                cc.tween(other.node)
                    .to(0.05, { opacity: 0 })
                    .call(() => { other.node.destroy(); })
                    .start()
            } else if (self.node.group == "default" && other.node.group == "circle") {
                this.collisionManager.enabled = false; //碰撞检测关闭，防止反复触发

                //cc.tween(other.node) //白球落袋了
                //.to(0.1, { opacity: 0 })
                //.call(() => {
                this.destroyWhiteBallAndCircleGroup();
                let curNode = cc.instantiate(this.failedPrefab)
                curNode.parent = this.node;
                let button = curNode.children[0];
                this.curNode = curNode
                button.on('click', function() {
                    this.restart();
                }, this);
                // })
                //.start()
            }
            if (this.score == 1) {
                this.collisionManager.enabled = false; //碰撞检测关闭，放置反复触发
                let curNode = cc.instantiate(this.successPrefab)
                curNode.parent = this.node;
                let button = curNode.children[0];
                this.curNode = curNode
                button.on('click', function() {
                    this.restart();
                }, this);
            }
        },
        gainScore() {
            this.score += 1;
            // 更新 scoreDisplay Label 的文字
            this.scoreDisplay.string = 'Score: ' + this.score;

        },
        spawnNewCircleAndStick() {
            this.whiteBall = cc.instantiate(this.circlePrefab);
            this.whiteBall.parent = this.node;

        },
        spawnNewCircleGroup() {

            // 使用给定的模板在场景中生成一个新节点, 将新增的节点添加到 Canvas 节点下面
            this.circleGroup = cc.instantiate(this.circleGroupPrefab);
            this.circleGroup.parent = this.node;
        }

    },

    // update (dt) {},
);