"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class Shield extends fudge.Node {
        constructor(_xPosition, _yPosition, subShields) {
            super(`Shield-${_xPosition}:${_yPosition}`);
            this.addComponent(new fudge.ComponentTransform());
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.translateX(_xPosition);
            if (subShields % 2 === 0) {
                for (let x = 0; x < subShields / 2; x++) {
                    for (let y = 0; y < subShields / 2; y++) {
                        const sub = new L02_SpaceInvaderGameObjects.SubShield(this.mtxWorld.translation.x + (-0.5 + x), this.mtxWorld.translation.y + (-0.5 + y));
                        sub.setrect(this.mtxLocal.translation.x + (-0.5 + x), this.mtxLocal.translation.y + (-0.5 + y));
                        this.addChild(sub);
                    }
                }
            }
        }
    }
    L02_SpaceInvaderGameObjects.Shield = Shield;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=Shield.js.map