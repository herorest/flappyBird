(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MainController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f4a597ZImRJH41SVlUXAyZN', 'MainController', __filename);
// Script/MainController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Pipe_1 = require("./Pipe");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.birdParent = null;
        _this.background = null;
        _this.allpipe = null;
        _this.fabPipe = null;
        _this.scoreLb = null;
        _this.nodeGameover = null;
        _this.retryBtn = null;
        _this.birds = [];
        _this.time = 0;
        _this.pipeArr = [1, 2, 3];
        _this.speed = 0;
        _this.over = false;
        _this.gamestart = false;
        _this.score = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Main.prototype.onLoad = function () {
        console.log('----load');
    };
    Main.prototype.start = function () {
        var _this = this;
        var pipeStartX = 200;
        var spaceX = (288 + 52) / 3;
        this.pipeArr = this.pipeArr.map(function (v, i) {
            var instance = cc.instantiate(_this.fabPipe).getComponent(Pipe_1.default);
            instance.node.parent = _this.allpipe;
            instance.node.x = pipeStartX + spaceX * i;
            return instance;
        });
        this.birds.forEach(function (v, i) {
            if (i !== 0) {
                v.node.active = false;
            }
        });
    };
    Main.prototype.touch = function () {
        if (this.over) {
            return;
        }
        this.speed = 2.6;
    };
    Main.prototype.update = function (dt) {
        var _this = this;
        this.time += dt;
        if (this.time > 0.2) {
            for (var i = 0; i < this.birds.length; i++) {
                var v = this.birds[i];
                if (v.node.active) {
                    v.node.active = false;
                    if (i === 3) {
                        this.birds[0].node.active = true;
                    }
                    else {
                        this.birds[i + 1].node.active = true;
                    }
                    break;
                }
            }
            this.time = 0;
        }
        if (!this.gamestart) {
            return;
        }
        this.speed -= 0.1;
        this.birdParent.y += this.speed;
        if (this.over) {
            this.birdParent.rotation += 10;
            return;
        }
        this.background.x -= 1;
        if (this.background.x == -288) {
            this.background.x = 0;
        }
        this.pipeArr.forEach(function (v, i) {
            if (v.node.x < -26) {
                console.log('===========', v.counted);
                if (!v.counted) {
                    _this.score += 1;
                    v.counted = true;
                    _this.scoreLb.string = _this.score + '';
                }
            }
            v.move();
            _this.over = v.check(_this.birdParent) || _this.over;
        });
        if (this.over) {
            this.gameOver();
        }
    };
    Main.prototype.handleStart = function () {
        this.gamestart = true;
        this.over = false;
        this.nodeGameover.active = false;
        this.retryBtn.node.active = false;
        this.reset();
    };
    Main.prototype.gameOver = function () {
        this.nodeGameover.active = true;
        this.retryBtn.node.active = true;
    };
    Main.prototype.reset = function () {
        this.time = 0;
        this.pipeArr.forEach(function (v, i) {
            v.reset(i);
        });
        this.speed = 0;
        this.score = 0;
        this.birdParent.x = 0;
        this.birdParent.y = 0;
        this.birdParent.rotation = 0;
    };
    __decorate([
        property(cc.Node)
    ], Main.prototype, "birdParent", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "background", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "allpipe", void 0);
    __decorate([
        property(cc.Prefab)
    ], Main.prototype, "fabPipe", void 0);
    __decorate([
        property(cc.Label)
    ], Main.prototype, "scoreLb", void 0);
    __decorate([
        property(cc.Node)
    ], Main.prototype, "nodeGameover", void 0);
    __decorate([
        property(cc.Button)
    ], Main.prototype, "retryBtn", void 0);
    __decorate([
        property([cc.Sprite])
    ], Main.prototype, "birds", void 0);
    __decorate([
        property
    ], Main.prototype, "time", void 0);
    Main = __decorate([
        ccclass
    ], Main);
    return Main;
}(cc.Component));
exports.default = Main;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainController.js.map
        