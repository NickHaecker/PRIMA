namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class SubShield extends fudge.Node {
        constructor(_xPosition: number, _yPosition: number) {
            super(`SubShield-${_xPosition}:${_yPosition}`);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored( fudge.Color.CSS("WHITE")))));
            this.addComponent(new fudge.ComponentTransform());
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.translateX(_xPosition);
        }    
    }
}