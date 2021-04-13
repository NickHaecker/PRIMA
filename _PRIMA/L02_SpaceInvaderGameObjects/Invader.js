"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class Invader extends L02_SpaceInvaderGameObjects.QuadNode {
        constructor(_xPosition, _yPosition) {
            super(`Invader-${_xPosition}:${_yPosition}`, _xPosition, _yPosition, 1, 1);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.translateX(_xPosition);
        }
        moveInvader(newPosition) {
            this.mtxLocal.translate(newPosition);
            this.setRectPosition();
        }
        move(direction) {
            let timeSinceLastFrame = fudge.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateX(timeSinceLastFrame * direction);
            this.setRectPosition();
        }
    }
    L02_SpaceInvaderGameObjects.Invader = Invader;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=Invader.js.map