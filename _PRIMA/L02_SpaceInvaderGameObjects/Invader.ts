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
        public moveInvader(newPosition: fudge.Vector3): void {
            console.log(`position to: ${newPosition}`);
            console.log(`current: ${this.mtxLocal.translation}`)
            this.mtxLocal.translate(newPosition);
            this.setRectPosition();
        }
        public move(direction: number): void {
            let timeSinceLastFrame: number = fudge.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateX(timeSinceLastFrame * direction);
            this.setRectPosition();
        }
    }
}