"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class Invader extends fudge.Node {
        constructor(_xPosition, _yPosition) {
            super(`Invader-${_xPosition}:${_yPosition}`);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.translateX(_xPosition);
        }
    }
    L02_SpaceInvaderGameObjects.Invader = Invader;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=Invader.js.map