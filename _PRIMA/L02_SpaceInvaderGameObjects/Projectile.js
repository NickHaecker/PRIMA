"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    class Projectile extends fudge.Node {
        constructor(_gunner) {
            super(`Projectile-${_gunner.name}`);
            console.log(`Projectile-${_gunner.name}`);
            this.gunner = _gunner;
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            this.mtxLocal.translate(this.gunner.mtxLocal.translation);
            this.mtxLocal.translateY(0.7);
            this.mtxLocal.scale(new fudge.Vector3(0.1, 0.8, 1));
            this.deleteProjectile();
        }
        MoveProjectile(pos) {
            this.mtxLocal.translateY(pos);
        }
        getGunner() {
            return this.gunner;
        }
        deleteProjectile() {
            setTimeout(() => {
                this.activate(false);
            }, 3000);
        }
    }
    L02_SpaceInvaderGameObjects.Projectile = Projectile;
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=Projectile.js.map