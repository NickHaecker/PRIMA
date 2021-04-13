namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class SubShield extends QuadNode {
        constructor(_xPosition: number, _yPosition: number) {
            const SCALEX: number = 0.8;
            const SCALEY: number = 0.8;
          
            super(`SubShield-${_xPosition}:${_yPosition}`, _xPosition, _yPosition, SCALEX, SCALEY);
            // const parent: fudge.Node = this.getAncestor();
            this.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            this.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            this.mtxLocal.translateX(_xPosition);
            this.mtxLocal.translateY(_yPosition);
            this.mtxLocal.scale(new fudge.Vector3(SCALEX, SCALEY, 0.8));
            
            // this.setRectPosition();
            console.log("shield")
            console.log(this.mtxLocal.translation.x)
            console.log("rect")
            console.log(this.rectangle.position.x)
        }    
    }
} 