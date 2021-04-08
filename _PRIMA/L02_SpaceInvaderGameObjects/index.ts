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
    export const speed: number = 1;
    export let player: Player;
    export const projectiles: Projectile[] = [];
    window.addEventListener("keydown", handleInput);
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
        const startY: number = 16;
        for (let y: number = rows; y > 0; y--) {
            for (let x: number = 0; x < columns; x++) {
                AddChildByNode("Enemies", new Invader(startX - 2 + (2 * x), startY - (2 * y)));
            }
        }
    }
    function InitStructure(): void {
        AddNodes(["Game", "Character", "Shields", "Enemy", "Alienship", "Enemies", "Projectiles"]);
        AddChildByString("Game", "Projectiles");
        AddChildByString("Game", "Character");
        AddChildByString("Game", "Shields");
        AddChildByString("Game", "Enemy");
        AddChildByString("Enemy", "Alienship");
        AddChildByString("Enemy", "Enemies");
    }
    window.addEventListener("load", handleLoad);
    // window.addEventListener("keydown", handleInput);
    function handleLoad(_event: Event): void {
        canvas = document.querySelector("canvas");
        InitStructure();
        InitPlayer();
        InitShields(4);
        InitEnemies(4, 6);





        player = GetNode("Character").getChildrenByName("Player")[0] as Player;

        const gameNode: fudge.Node = GetNode("Game");
        console.log(gameNode);
        console.log(nodes);


        viewport.initialize("Viewport", gameNode, cam, canvas);
        viewport.draw();
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, FPS);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, handleMain);
    }

    function handleMain(_event: Event): void {
        handleInput(_event);
        MovementController();
        viewport.draw();
    }
    function handleInput(_event: Event | KeyboardEvent): void {
        const newPosition: number = speed * fudge.Loop.timeFrameReal / 100;
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.A, fudge.KEYBOARD_CODE.ARROW_LEFT])) {
            player.MovePlayer(-newPosition);
        }
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.D, fudge.KEYBOARD_CODE.ARROW_RIGHT])) {
            player.MovePlayer(newPosition);
        }
        if (_event?.type === "keydown") {
            const _e: KeyboardEvent = _event as KeyboardEvent;
            if (_e.code === "Space" && GetNode("Projectiles").nChildren === 0) {
                const projectile: Projectile = player.ShootProjectile();
                AddChildByNode("Projectiles", projectile);
            }
        }
    }
    function MovementController(): void {
        const newPosition: number = speed * fudge.Loop.timeFrameReal / 100;
        GetNode("Projectiles").getChildren().forEach((item: fudge.Node) => {
            const i: Projectile = item as Projectile;
            if (i.isActive) {
                i.MoveProjectile(newPosition);
            } else {
                GetNode("Projectiles").removeChild(i);
            }
        });
    }
}