namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class Invader extends QuadNode {
        constructor(_xPosition: number, _yPosition: number) {
            super(`Invader-${_xPosition}:${_yPosition}`, _xPosition, _yPosition, 1, 1);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.translateX(_xPosition);
        }
    }
}