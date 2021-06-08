"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var f = FudgeCore;
    class SoundController extends f.ComponentScript {
        // private _name: string = "SoundController";
        constructor() {
            super();
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.Created.bind(this));
        }
        Created(_event) {
            // this.getContainer().addComponent(new f.ComponentAudioListener())
            this.getContainer().getComponent(f.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, this.HandleCollision.bind(this));
        }
        HandleCollision(_event) {
            let cmpAudio = this.getContainer().getComponent(ƒ.ComponentAudio);
            console.log(cmpAudio);
            cmpAudio.play(true);
        }
    }
    L05_PhysicsGame.SoundController = SoundController;
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=SoundController.js.map