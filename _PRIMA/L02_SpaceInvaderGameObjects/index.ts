namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    export let nodes: any = {};
    export const viewport: fudge.Viewport = new fudge.Viewport();
    export const FPS: number = 60;
    export let canvas: HTMLCanvasElement;
    export const cam: fudge.ComponentCamera = new fudge.ComponentCamera();
    cam.mtxPivot.translateZ(33);
    cam.mtxPivot.rotateY(180);
    cam.mtxPivot.translateY(7);
    export const startX: number = -3;

    function GetNode(name: string): fudge.Node {
        const response: fudge.Node = nodes[name];
        if (response) {
            return response;
        } else {
            AddNodes([name]);
            return GetNode(name);
        }
    }

    function AddNodes(names: string[]): void {
        names.forEach((item: string) => {
            nodes[item] = new fudge.Node(item);
        });
    }
    function AddNode(node: fudge.Node): void {
        nodes[node.name] = node;
    }

    function AddChildByString(parent: string, child: string): void {
            const parentNode: fudge.Node = GetNode(parent);
            const childNode: fudge.Node = GetNode(child);
            parentNode.addChild(childNode);
    }
    function AddChildByNode(parent: string, childNode: fudge.Node): void {
        const parentNode: fudge.Node = GetNode(parent);
        AddNode(childNode);
        parentNode.addChild(childNode);
    }
    function InitPlayer(): void {
        AddChildByNode("Character", new Player());
    }
    function InitShields(shieldAmount: number): void {
        const startY: number = 2;
        for (let i: number = 0; i < shieldAmount; i++) {
            AddChildByNode("Shields", new Shield(startX + (2 * i), startY, 4));
        }
    }

    function InitEnemies(rows: number, columns: number): void {
        const startY: number = 14;
        for (let y: number = rows; y > 0; y--) {
            for (let x: number = 0; x < columns; x++) {
                AddChildByNode("Enemies", new Invader(startX - 2 + (2 * x), startY - (2 * y)));
            }
        }
    }
    function InitStructure(): void {
        AddNodes(["Game", "Character", "Shields", "Enemy", "Alienship", "Enemies"]);
        AddChildByString("Game", "Character");
        AddChildByString("Game", "Shields");
        AddChildByString("Game", "Enemy");
        AddChildByString("Enemy", "Alienship");
        AddChildByString("Enemy", "Enemies");
    }
    window.addEventListener("load", handleLoad);
    function handleLoad(_event: Event): void {
        canvas = document.querySelector("canvas");
        InitStructure();
        InitPlayer();
        InitShields(4);
        InitEnemies(3, 6);









        const gameNode: fudge.Node = GetNode("Game");
        console.log(nodes)
        console.log(gameNode);


        viewport.initialize("Viewport", gameNode, cam, canvas);
        viewport.draw();
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, FPS);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, handleMain);
    }
    
    function handleMain(_event: Event): void {
        viewport.draw();
    }
}