"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    // let node: f.Node = new f.Node("firstNode");
    // console.log(node);
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshQuad();
        let componentMesh = new f.ComponentMesh(mesh);
        node.addComponent(componentMesh);
        let materialSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let componentMaterial = new f.ComponentMaterial(materialSolidWhite);
        node.addComponent(componentMaterial);
        let componentCamera = new f.ComponentCamera();
        componentCamera.mtxPivot.translateZ(2);
        componentCamera.mtxPivot.rotateY(180);
        L01_FirstFudge.viewport = new f.Viewport();
        L01_FirstFudge.viewport.initialize("Viewport", node, componentCamera, canvas);
        f.Debug.log(L01_FirstFudge.viewport);
        L01_FirstFudge.viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=index.js.map