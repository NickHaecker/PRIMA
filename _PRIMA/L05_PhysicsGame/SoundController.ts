namespace L05_PhysicsGame {
    import f = FudgeCore;

    export class SoundController extends f.ComponentScript {
        // private _name: string = "SoundController";
        constructor() {
            super();
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.Created.bind(this));
        }
        private Created(_event: CustomEvent): void {
            // this.getContainer().addComponent(new f.ComponentAudioListener())
            this.getContainer().getComponent(f.ComponentRigidbody).addEventListener(f.EVENT_PHYSICS.COLLISION_ENTER, this.HandleCollision.bind(this))
        }
        private HandleCollision(_event: CustomEvent): void {
            let cmpAudio: ƒ.ComponentAudio = this.getContainer().getComponent(ƒ.ComponentAudio);
            console.log(cmpAudio)
            cmpAudio.play(true);
        }
 
    }
}