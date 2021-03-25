namespace L01_FirstFudge {
    import f = FudgeCore;
    // let node: f.Node = new f.Node("firstNode");
    // console.log(node);
    window.addEventListener("load", handleLoad);
    let viewport: f.Viewport;
    let node: f.Node = new f.Node("Quad");
    let fps: number = 60;
    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        node.addComponent(new f.ComponentTransform());



        // let node: f.Node = new f.Node("Quad");

        let mesh: f.Mesh = new f.MeshCube;
        console.log(mesh);
        let componentMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        // componentMesh.mtxPivot.translateY(-0.5);
        node.addComponent(componentMesh);

        let materialSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("YELLOW")));
        let componentMaterial: f.ComponentMaterial = new f.ComponentMaterial(materialSolidWhite);
        node.addComponent(componentMaterial);

        let componentCamera: f.ComponentCamera = new f.ComponentCamera();
        componentCamera.mtxPivot.translateZ(-2);
        // componentCamera.mtxPivot.rotateY(180);

        console.log("Node:", node);
        console.log("Cam: ", componentCamera);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, componentCamera, canvas);

        f.Debug.log(viewport);

        viewport.draw();


        f.Loop.start(f.LOOP_MODE.TIME_REAL, fps);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    }
    function update(_event: Event): void {
        let rootSpeed: number = 90;
        let timeSinceLastFrameInSeconds: number = f.Loop.timeFrameReal / 100;
        node.getComponent(f.ComponentMesh).mtxPivot.rotateY(timeSinceLastFrameInSeconds * rootSpeed);
        viewport.draw();
    }
}