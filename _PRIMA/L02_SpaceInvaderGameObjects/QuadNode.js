"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class QuadNode extends fudge.Node {
        constructor(name, posX, posY, scaleX, scaleY) {
            super(name);
            this.addComponent(new fudge.ComponentTransform());
            this.rectangle = new fudge.Rectangle(posX, posY, scaleX, scaleY, fudge.ORIGIN2D.CENTER);
        }
        checkCollision(_target) {
            return this.rectangle.collides(_target.rectangle);
        }
        setRectPosition() {
            this.rectangle.position.x = this.mtxLocal.translation.x - this.rectangle.size.x / 2;
            this.rectangle.position.y = this.mtxLocal.translation.y - this.rectangle.size.y / 2;
        }
    }
    L02_SpaceInvaderGameObjects.QuadNode = QuadNode;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=QuadNode.js.map