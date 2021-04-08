namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class SubShield extends QuadNode {
        constructor(_xPosition: number, _yPosition: number) {
            super(`SubShield-${_xPosition}:${_yPosition}`, _xPosition, _yPosition, 0.8, 0.8);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored( fudge.Color.CSS("WHITE")))));
            this.mtxLocal.translateX(_xPosition);
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.scale(new fudge.Vector3(0.8, 0.8, 0.8));
        }    
    }
}