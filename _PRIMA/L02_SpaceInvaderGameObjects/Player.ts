namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class Player extends fudge.Node {
        constructor() {
            super("Player");
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            const head: fudge.Node = new fudge.Node("Head");
            head.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            head.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            head.addComponent(new fudge.ComponentTransform());
            head.getComponent(fudge.ComponentMesh).mtxPivot.translateY(0.7);
            head.getComponent(fudge.ComponentMesh).mtxPivot.scale(new fudge.Vector3(0.4, 0.4, 0.4));
            this.addChild(head);
        }
        public MovePlayer(pos: number): void {
            this.mtxLocal.translateX(pos);
        }
    }
}