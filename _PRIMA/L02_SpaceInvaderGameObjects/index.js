"use strict";
var L02_SpaceInvaderGameObjects;
(function (L02_SpaceInvaderGameObjects) {
    var fudge = FudgeCore;
    L02_SpaceInvaderGameObjects.nodes = {};
    L02_SpaceInvaderGameObjects.viewport = new fudge.Viewport();
    L02_SpaceInvaderGameObjects.FPS = 60;
    L02_SpaceInvaderGameObjects.cam = new fudge.ComponentCamera();
    L02_SpaceInvaderGameObjects.cam.mtxPivot.translateZ(33);
    L02_SpaceInvaderGameObjects.cam.mtxPivot.rotateY(180);
    L02_SpaceInvaderGameObjects.cam.mtxPivot.translateY(7);
    L02_SpaceInvaderGameObjects.startX = -3;
    L02_SpaceInvaderGameObjects.speed = 1;
    function GetNode(name) {
        const response = L02_SpaceInvaderGameObjects.nodes[name];
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
            L02_SpaceInvaderGameObjects.nodes[item] = new fudge.Node(item);
        });
    }
    function AddNode(node) {
        L02_SpaceInvaderGameObjects.nodes[node.name] = node;
    }
    function AddChildByString(parent, child) {
        const parentNode = GetNode(parent);
        const childNode = GetNode(child);
        parentNode.addChild(childNode);
    }
    function AddChildByNode(parent, childNode) {
        const parentNode = GetNode(parent);
        AddNode(childNode);
        parentNode.addChild(childNode);
    }
    function InitPlayer() {
        AddChildByNode("Character", new L02_SpaceInvaderGameObjects.Player());
    }
    function InitShields(shieldAmount) {
        const startY = 2;
        for (let i = 0; i < shieldAmount; i++) {
            AddChildByNode("Shields", new L02_SpaceInvaderGameObjects.Shield(L02_SpaceInvaderGameObjects.startX + (2 * i), startY, 4));
        }
    }
    function InitEnemies(rows, columns) {
        const startY = 16;
        for (let y = rows; y > 0; y--) {
            for (let x = 0; x < columns; x++) {
                AddChildByNode("Enemies", new L02_SpaceInvaderGameObjects.Invader(L02_SpaceInvaderGameObjects.startX - 2 + (2 * x), startY - (2 * y)));
            }
        }
    }
    function InitStructure() {
        AddNodes(["Game", "Character", "Shields", "Enemy", "Alienship", "Enemies"]);
        AddChildByString("Game", "Character");
        AddChildByString("Game", "Shields");
        AddChildByString("Game", "Enemy");
        AddChildByString("Enemy", "Alienship");
        AddChildByString("Enemy", "Enemies");
    }
    window.addEventListener("load", handleLoad);
    // window.addEventListener("keydown", handleInput);
    function handleLoad(_event) {
        L02_SpaceInvaderGameObjects.canvas = document.querySelector("canvas");
        InitStructure();
        InitPlayer();
        InitShields(4);
        InitEnemies(4, 6);
        L02_SpaceInvaderGameObjects.player = GetNode("Character").getChildrenByName("Player")[0];
        const gameNode = GetNode("Game");
        console.log(gameNode);
        console.log(L02_SpaceInvaderGameObjects.nodes);
        L02_SpaceInvaderGameObjects.viewport.initialize("Viewport", gameNode, L02_SpaceInvaderGameObjects.cam, L02_SpaceInvaderGameObjects.canvas);
        L02_SpaceInvaderGameObjects.viewport.draw();
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, L02_SpaceInvaderGameObjects.FPS);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, handleMain);
    }
    function handleMain(_event) {
        handleInput(_event);
        L02_SpaceInvaderGameObjects.viewport.draw();
    }
    function handleInput(_event) {
        const newPosition = L02_SpaceInvaderGameObjects.speed * fudge.Loop.timeFrameReal / 100;
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.A, fudge.KEYBOARD_CODE.ARROW_LEFT])) {
            L02_SpaceInvaderGameObjects.player.MovePlayer(-newPosition);
        }
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.D, fudge.KEYBOARD_CODE.ARROW_RIGHT])) {
            L02_SpaceInvaderGameObjects.player.MovePlayer(newPosition);
        }
    }
})(L02_SpaceInvaderGameObjects || (L02_SpaceInvaderGameObjects = {}));
//# sourceMappingURL=index.js.map