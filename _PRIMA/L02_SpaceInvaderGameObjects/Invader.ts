namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class Invader extends fudge.Node{
        constructor(_xPosition: number, _yPosition: number) {
            super(`Invader-${_xPosition}:${_yPosition}`);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            this.getComponent(fudge.ComponentMesh).mtxPivot.translateY(_yPosition);
            this.getComponent(fudge.ComponentMesh).mtxPivot.translateX(_xPosition);
        }
    }
}