"use strict";
var L05;
(function (L05) {
    var f = FudgeCore;
    let root;
    let avatar;
    let viewport;
    let cam = new f.ComponentCamera();
    let player = new f.Node("Player");
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        ƒ.Physics.settings.debugDraw = true;
        await FudgeCore.Project.loadResourcesFromHTML();
        let g = f.Project.resources["Graph|2021-04-27T14:39:07.865Z|46119"];
        root = g;
        console.log(root);
        settingUpAPlayer();
        createRigidbodies();
        let canvas = document.querySelector("canvas");
        viewport = new f.Viewport();
        viewport.initialize("Playground", root, cam, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function settingUpAPlayer() {
        avatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.GROUP_2);
        avatar.restitution = 0.5;
        avatar.rotationInfluenceFactor = f.Vector3.ZERO();
        avatar.friction = 1;
        player.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        player.addComponent(avatar);
        root.addChild(player);
        player.addComponent(cam);
    }
    function update(_event) {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        // cam.mtxPivot.translate(player.mtxWorld.translation);
        // cam.mtxPivot.lookAt()
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }
    function createRigidbodies() {
        const nodes = [];
        nodes.push(root.getChildrenByName("ramp")[0]);
        nodes.push(root.getChildrenByName("board")[0]);
        nodes.push(root.getChildrenByName("Test")[0]);
        console.log(nodes);
        nodes.forEach((node) => {
            let cmpRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
            console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        });
        ƒ.Physics.adjustTransforms(root, true);
    }
})(L05 || (L05 = {}));
//# sourceMappingURL=index.js.map