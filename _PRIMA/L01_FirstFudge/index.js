"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    // let node: f.Node = new f.Node("firstNode");
    // console.log(node);
    window.addEventListener("load", handleLoad);
    let viewport;
    let node = new f.Node("Quad");
    let fps = 60;
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        node.addComponent(new f.ComponentTransform());
        // let node: f.Node = new f.Node("Quad");
        let mesh = new f.MeshCube;
        console.log(mesh);
        let componentMesh = new f.ComponentMesh(mesh);
        // componentMesh.mtxPivot.translateY(-0.5);
        node.addComponent(componentMesh);
        let materialSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("YELLOW")));
        let componentMaterial = new f.ComponentMaterial(materialSolidWhite);
        node.addComponent(componentMaterial);
        let componentCamera = new f.ComponentCamera();
        componentCamera.mtxPivot.translateZ(-2);
        // componentCamera.mtxPivot.rotateY(180);
        console.log("Node:", node);
        console.log("Cam: ", componentCamera);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, componentCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        f.Loop.start(f.LOOP_MODE.TIME_REAL, fps);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        let rootSpeed = 90;
        let timeSinceLastFrameInSeconds = f.Loop.timeFrameReal / 100;
        node.getComponent(f.ComponentMesh).mtxPivot.rotateY(timeSinceLastFrameInSeconds * rootSpeed);
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=index.js.map