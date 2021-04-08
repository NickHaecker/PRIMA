namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class Projectile extends QuadNode {
        private gunner: fudge.Node;
        constructor(_gunner: fudge.Node) {
            super(`Projectile-${_gunner.name}`, _gunner.mtxLocal.translation.x, _gunner.mtxLocal.translation.y + 0.7, 0.1, 0.8);
            this.gunner = _gunner;
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("YELLOW")))));
            this.mtxLocal.translate(this.gunner.mtxLocal.translation);
            this.mtxLocal.translateY(0.7);
            this.mtxLocal.scale(new fudge.Vector3(0.1, 0.8, 1));
            this.deleteProjectile();
        }
        public MoveProjectile(pos: number): void {
            this.mtxLocal.translateY(pos);
            this.setRectPosition();
        }
        public getGunner(): fudge.Node {
            return this.gunner;
        }
        private deleteProjectile(): void {
            setTimeout(() => {
                this.activate(false);
            },         2000);
        }
    }
}