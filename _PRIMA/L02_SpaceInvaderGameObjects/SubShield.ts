namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class SubShield extends QuadNode {
        constructor(_xPosition: number, _yPosition: number) {
            const SCALEX: number = 0.8;
            const SCALEY: number = 0.8;
            super(`SubShield-${_xPosition}:${_yPosition}`, _xPosition, _yPosition, SCALEX, SCALEY);
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.mtxLocal.translateX(_xPosition);
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.scale(new fudge.Vector3(SCALEX, SCALEY, 0.8));
        }
        public setrect(posx: number, posy: number): void {
            this.rectangle.position.x = posx - this.rectangle.size.x / 2;
            this.rectangle.position.y = posy - this.rectangle.size.y / 2;
        }
    }
} 