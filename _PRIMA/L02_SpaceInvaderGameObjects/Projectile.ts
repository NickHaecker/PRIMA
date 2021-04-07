namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class Projectile extends fudge.Node {
        private gunner: fudge.Node;
        constructor(_gunner: fudge.Node) {
            super(`Projectile-${_gunner.name}`);
            this.gunner = _gunner;
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            this.mtxLocal.translate(this.gunner.mtxLocal.translation);
            this.deleteProjectile();
        }
        public MoveProjectile(pos: number): void {
            this.mtxLocal.translateY(pos);
        }
        private deleteProjectile(): void {
            setTimeout(() => {
                this.activate(false);
            },         3000);
        }
    }
}