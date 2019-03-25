"use strict";
cc._RF.push(module, 'e05dfuoAS9HAqWo0Sq3TGFI', 'Pipe');
// Script/Pipe.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Pipe = /** @class */ (function (_super) {
    __extends(Pipe, _super);
    function Pipe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counted = false;
        return _this;
    }
    Pipe.prototype.check = function (bird) {
        if (bird.x + 17 < this.node.x - 26) {
            return false;
        }
        if (bird.x - 17 > this.node.x + 26) {
            return false;
        }
        if ((bird.y + 12 < this.node.y + 55) && (bird.y - 12 > this.node.y - 55)) {
            return false;
        }
        return true;
    };
    Pipe.prototype.reset = function (index) {
        var pipeStartX = 200;
        var spaceX = (288 + 52) / 3;
        this.node.x = pipeStartX + spaceX * index;
    };
    Pipe.prototype.move = function () {
        this.node.x -= 2;
        if (this.node.x < (-144 - 26)) {
            this.counted = false;
            this.node.y = 80 - Math.random() * 80;
            this.node.x = this.node.x + 288 + 52;
        }
    };
    Pipe.prototype.update = function (dt) {
    };
    __decorate([
        property
    ], Pipe.prototype, "counted", void 0);
    Pipe = __decorate([
        ccclass
    ], Pipe);
    return Pipe;
}(cc.Component));
exports.default = Pipe;

cc._RF.pop();