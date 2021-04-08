"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class Player extends L02_SpaceInvaderGameObjects.QuadNode {
        constructor() {
            super("Player", 0, 0, 1, 1);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            const head = new fudge.Node("Head");
            head.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            head.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            head.addComponent(new fudge.ComponentTransform());
            head.getComponent(fudge.ComponentMesh).mtxPivot.translateY(0.7);
            head.getComponent(fudge.ComponentMesh).mtxPivot.scale(new fudge.Vector3(0.4, 0.4, 0.4));
            this.addChild(head);
        }
        MovePlayer(pos) {
            this.mtxLocal.translateX(pos);
        }
        ShootProjectile() {
            return new L02_SpaceInvaderGameObjects.Projectile(this);
        }
    }
    L02_SpaceInvaderGameObjects.Player = Player;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=Player.js.map