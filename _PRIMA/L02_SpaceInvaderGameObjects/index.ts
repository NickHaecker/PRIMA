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
    const wandLeft: number = -7;
    const wandRight: number = 7;
    let direction: number = 1;

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
        const startY: number = 3;
        const x: number = -6;
        for (let i: number = 0; i < shieldAmount; i++) {
            AddChildByNode("Shields", new Shield(x + (4 * i), startY, 4));
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
    window.addEventListener("keydown", handleInput);
    function handleLoad(_event: Event): void {
        canvas = document.querySelector("canvas");
        InitStructure();
        InitPlayer();
        InitShields(4);
        InitEnemies(4, 6);
        player = GetNode("Character").getChildrenByName("Player")[0] as Player;
        const gameNode: fudge.Node = GetNode("Game");
        viewport.initialize("Viewport", gameNode, cam, canvas);
        viewport.draw();
        fudge.Loop.start(fudge.LOOP_MODE.TIME_REAL, FPS);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, handleMain);
    }
    function handleMain(_event: Event): void {
        handleInput(_event);
        MovementController();
        CollisionDetection();
        viewport.draw();
    }
    function handleInput(_event: Event | KeyboardEvent): void {
        const newPosition: number = speed * fudge.Loop.timeFrameReal / 100;
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.A, fudge.KEYBOARD_CODE.ARROW_LEFT]) && player.mtxLocal.translation.x >= wandLeft) {
            player.MovePlayer(-newPosition);
        }
        if (fudge.Keyboard.isPressedOne([fudge.KEYBOARD_CODE.D, fudge.KEYBOARD_CODE.ARROW_RIGHT]) && player.mtxLocal.translation.x <= wandRight) {
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
        for (let projectile of GetNode("Projectiles").getChildren() as Projectile[]) {
            if (projectile.isActive) {
                switch (projectile.getGunner().name) {
                    default:
                        projectile.MoveProjectile(newPosition);
                        break;
                }
            } else {
                GetNode("Projectiles").removeChild(projectile);
            }
        }
        for (let invader of GetNode("Enemies").getChildren() as Invader[]) {
            if (invader.mtxLocal.translation.x <= wandLeft) {
                direction = direction * -1;
                for (let i of GetNode("Enemies").getChildren() as Invader[]) {
                    i.mtxLocal.translateX(0.1);
                    i.mtxLocal.translateY(-0.1);
                    i.setRectPosition();

                }
            }
            if (invader.mtxLocal.translation.x >= wandRight) {
                direction = direction * -1;
                for (let i of GetNode("Enemies").getChildren() as Invader[]) {
                    i.mtxLocal.translateX(-0.1);
                    i.mtxLocal.translateY(-0.1);
                    i.setRectPosition();
                }
            }
            invader.move(direction);

        }
    }
    function CollisionDetection(): void {
        for (let projectile of GetNode("Projectiles").getChildren() as Projectile[]) {
            for (let invader of GetNode("Enemies").getChildren() as Invader[]) {
                if (projectile.checkCollision(invader)) {
                    GetNode("Projectiles").removeChild(projectile);
                    GetNode("Enemies").removeChild(invader);
                }
            }
            for (let shield of GetNode("Shields").getChildren() as Shield[]) {
                for (let stripe of shield.getChildren() as SubShield[]) {
                    if (projectile.checkCollision(stripe)) {
                        GetNode("Projectiles").removeChild(projectile);
                        shield.removeChild(stripe);
                    }
                }
            }
        }
    }
}