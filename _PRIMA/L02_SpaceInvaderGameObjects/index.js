"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    let nodes = {};
    const viewport = new fudge.Viewport();
    const FPS = 60;
    let canvas;
    const cam = new fudge.ComponentCamera();
    cam.mtxPivot.translateZ(33);
    cam.mtxPivot.rotateY(180);
    cam.mtxPivot.translateY(5);
    const startX = -3;
    function GetNode(name) {
        const response = nodes[name];
        if (response) {
            return response;
        }
        else {
            AddNodes([name]);
            return GetNode(name);
        }
    }
    function AddNodes(names) {
        names.forEach((item) => {
            nodes[item] = new fudge.Node(item);
        });
    }
    function AddChild(parent, child) {
        const parentNode = GetNode(parent);
        const childNode = GetNode(child);
        parentNode.appendChild(childNode);
    }
    function initPlayer() {
        const base = GetNode("Base");
        base.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        base.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        const head = GetNode("Head");
        head.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        head.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        head.addComponent(new fudge.ComponentTransform());
        head.getComponent(fudge.ComponentMesh).mtxPivot.translateY(0.7);
        head.getComponent(fudge.ComponentMesh).mtxPivot.scale(new fudge.Vector3(0.4, 0.4, 0.4));
    }
    function initShields(shields) {
        const startY = 2;
        for (let i = 0; i < shields; i++) {
            const shield = GetNode(`Shield-${i}`);
            shield.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            shield.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            shield.addComponent(new fudge.ComponentTransform());
            shield.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY);
            const calcX = startX + (2 * i);
            shield.getComponent(fudge.ComponentMesh).mtxPivot.translateX(calcX);
            AddChild("Shields", shield.name);
        }
    }
    function initEnemies(rows, columns) {
        const startY = 13;
        let enemieCount = 0;
        for (let y = rows; y > 0; y--) {
            for (let x = 0; x < columns; x++) {
                const enemy = GetNode(`Enemy-${enemieCount}`);
                enemy.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
                enemy.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
                enemy.addComponent(new fudge.ComponentTransform());
                enemy.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY - (2 * y));
                enemy.getComponent(fudge.ComponentMesh).mtxPivot.translateX(startX + (2 * x));
                AddChild("Enemies", enemy.name);
                enemieCount++;
            }
        }
        const motherShip = GetNode("Alienship");
        motherShip.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        motherShip.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        motherShip.addComponent(new fudge.ComponentTransform());
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY + 1);
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.translateX(startX);
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.scaleX(2);
    }
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        canvas = document.querySelector("canvas");
        AddNodes(["Game", "Character", "Shields", "Enemy", "Alienship", "Spawner", "Enemies"]);
        AddChild("Game", "Character");
        AddChild("Game", "Shields");
        AddChild("Game", "Enemy");
        AddChild("Enemy", "Alienship");
        AddChild("Enemy", "Spawner");
        AddChild("Enemy", "Enemies");
        AddChild("Character", "Base");
        AddChild("Base", "Head");
        initPlayer();
        initShields(4);
        initEnemies(3, 4);
        const gameNode = GetNode("Game");
        console.log(gameNode);
        viewport.initialize("Viewport", gameNode, cam, canvas);
        viewport.draw();
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, FPS);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, handleMain);
    }
    function handleMain(_event) {
        viewport.draw();
    }
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=index.js.map