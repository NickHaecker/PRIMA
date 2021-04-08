namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export class QuadNode extends fudge.Node {
        public rectangle: fudge.Rectangle;
        constructor(name: string, posX: number, posY: number, scaleX: number, scaleY: number) {
            super(name);
            this.addComponent(new fudge.ComponentTransform());
            this.rectangle = new fudge.Rectangle(posX, posY, scaleX, scaleY, fudge.ORIGIN2D.CENTER);
        }
        public checkCollision(_target: QuadNode): boolean {
            return this.rectangle.collides(_target.rectangle);
        }
        public setRectPosition(): void {
            this.rectangle.position.x = this.mtxLocal.translation.x - this.rectangle.size.x / 2;
            this.rectangle.position.y = this.mtxLocal.translation.y - this.rectangle.size.y / 2;
        }
    }
}