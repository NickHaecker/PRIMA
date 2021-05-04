namespace L05 {
    import f = FudgeCore;
    let root: f.Node;
    let avatar: f.ComponentRigidbody;
    let viewport: f.Viewport;
    let cam: f.ComponentCamera = new f.ComponentCamera();
    let player: f.Node = new f.Node("Player");
    window.addEventListener("load", handleLoad);
  
    async function handleLoad(): Promise<void> {
        ƒ.Physics.settings.debugDraw = true;
        await FudgeCore.Project.loadResourcesFromHTML();
        let g: f.SerializableResource =  f.Project.resources["Graph|2021-04-27T14:39:07.865Z|46119"];
        root = g as f.Graph;
        console.log(root);

        settingUpAPlayer();
        createRigidbodies();
        
        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        viewport = new f.Viewport();
        viewport.initialize("Playground", root, cam, canvas);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }
    function settingUpAPlayer(): void {
        avatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.GROUP_2);
        avatar.restitution = 0.5;
        avatar.rotationInfluenceFactor = f.Vector3.ZERO();
        avatar.friction = 1;
        
        player.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        player.addComponent(avatar);
        root.addChild(player);
        player.addComponent(cam);
    }
    function update(_event: Event): void {
        let speed: number = 5;
        let rotate: number = 1;
        let forward: f.Vector3;
        forward = player.mtxWorld.getZ();

        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])) {
            avatar.setVelocity(f.Vector3.SCALE(forward, speed)); 
        }

        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])) {
            avatar.setVelocity(f.Vector3.SCALE(forward, - speed));
        }

        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])) {
            avatar.rotateBody(f.Vector3.Y(rotate));
        }

        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])) {
            avatar.rotateBody(f.Vector3.Y(-rotate));
        }
        // console.log(avatar)''

        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }
    function createRigidbodies(): void {
        const nodes: f.Node[] = [];
        nodes.push(root.getChildrenByName("ramp")[0]);
        nodes.push(root.getChildrenByName("board")[0]);
        nodes.push(root.getChildrenByName("Test")[0]);
        console.log(nodes);
        nodes.forEach((node: f.Node) => {
            let cmpRigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
            console.log(node.name, node.cmpTransform?.mtxLocal.toString());
        });

        ƒ.Physics.adjustTransforms(root, true);
    }
}

