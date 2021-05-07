namespace L05_PhysicsGame {
  import f = FudgeCore;
  // import fAid = FudgeAid;
  let root: f.Graph;
  let cmpAvatar: f.ComponentRigidbody;
  let camera: f.Node = new f.Node("Camera");
  let viewport: f.Viewport;
  let canvas: HTMLCanvasElement;
  let speed: number = 1;
  let forward: f.Vector3;
  let rotate: number = 3;
  let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
  let avatar: f.Node = new f.Node("Avatar");
  // let ctrRotation: f.Control = new f.Control("AvatarRotation", -0.1, f.CONTROL_TYPE.PROPORTIONAL);
  // ctrRotation.setDelay(100);
  window.addEventListener("load", start);

  async function start(_event: Event): Promise<void> {
    f.Physics.settings.debugDraw = true;

    await FudgeCore.Project.loadResourcesFromHTML();
    // await FudgeCore.Project.loadResources("PhysicsGame.json");
    FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
    // pick the graph to show
    root = <f.Graph>FudgeCore.Project.resources["Graph|2021-04-27T14:37:42.239Z|64317"];

    createAvatar();
    createRigidbodies();

    f.Physics.adjustTransforms(root, true);

  
    camera.addComponent(cmpCamera);
    // cmpCamera.mtxPivot.translate(f.Vector3.ONE(20));
    // cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());

    canvas = document.querySelector("canvas");
    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    
    canvas.addEventListener("click", canvas.requestPointerLock);
    canvas.addEventListener("mousemove", mouseMove);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start();
  }

  function createAvatar(): void {
    cmpAvatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
    cmpAvatar.restitution = 0.5;
    cmpAvatar.rotationInfluenceFactor = f.Vector3.ZERO();
    cmpAvatar.friction = 2;
  
    avatar.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.Y(3))));
    avatar.addComponent(cmpAvatar);

    avatar.appendChild(camera);
    root.appendChild(avatar);
  }

  function update(): void {
    
   
    
    forward = cmpAvatar.getContainer().mtxWorld.getZ();
   
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP]))
      cmpAvatar.applyForce(f.Vector3.SCALE(forward, speed));

    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN]))
      cmpAvatar.applyForce(f.Vector3.SCALE(forward, - speed));

    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT]))
      cmpAvatar.rotateBody(f.Vector3.Y(rotate));
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]))
      cmpAvatar.rotateBody(f.Vector3.Y(-rotate));
    
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.E]))
      tryGrab();

    f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);

    //cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
    // playerIsGroundedRaycast();
    viewport.draw();
    
    f.Physics.settings.debugDraw = true;
  }
  function mouseMove(_event: MouseEvent): void {
    console.log(_event);
    // ctrRotation.setInput(_event.movementX);
    // cmpAvatar.rotateBody(f.Vector3.X( _event.movementY / 10));
    // cmpAvatar.rotateBody(f.Vector3.Y( -1 * _event.movementX / 10 ));
    cmpCamera.mtxPivot.rotateX(_event.movementY / 10);
    cmpCamera.mtxPivot.rotateY(-1 * _event.movementX / 10 )
    // cmpAvatar.
    // avatar.mtxLocal.rotateX(_event.movementY);
    // avatar.mtxLocal.rotateY(-1 * _event.movementX);
  } 

  function tryGrab(): void {
    let mtxAvatar: f.Matrix4x4 = cmpAvatar.getContainer().mtxLocal;
    // let rayHit: f.RayHitInfo = f.Physics.raycast(mtxAvatar.translation, mtxAvatar.getZ(), 4, f.PHYSICS_GROUP.DEFAULT);
    // console.log(rayHit.hit);
    let moveables: f.Node = root.getChildrenByName("moveables")[0];
    for (let node of moveables.getChildren()) {
      let distance: f.Vector3 = f.Vector3.DIFFERENCE(mtxAvatar.translation, node.mtxLocal.translation);
      if (distance.magnitude > 2)
        continue;
      pickup(node);
      break;
    }
  }

  function pickup(_node: f.Node): void {
    let avatar: f.Node = cmpAvatar.getContainer();
    avatar.appendChild(_node);
    _node.mtxLocal.set(f.Matrix4x4.TRANSLATION(f.Vector3.Z(1.5)));
    _node.getComponent(f.ComponentRigidbody).physicsType = f.PHYSICS_TYPE.KINEMATIC;
  }

  function createRigidbodies(): void {
    let level: f.Node = root.getChildrenByName("level")[0];
    for (let node of level.getChildren()) {
      let cmpRigidbody: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
      node.addComponent(cmpRigidbody);
      // console.log(node.name, node.cmpTransform?.mtxLocal.toString());
    }

    let moveables: f.Node = root.getChildrenByName("moveables")[0];
    for (let node of moveables.getChildren()) {
      let cmpRigidbody: f.ComponentRigidbody = new f.ComponentRigidbody(0.01, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.SPHERE, f.PHYSICS_GROUP.DEFAULT);
      cmpRigidbody.restitution = 2.5;
      cmpRigidbody.friction = 2.5;
      node.addComponent(cmpRigidbody);
      // console.log(node.name, node.cmpTransform?.mtxLocal.toString());
    }
  }
}