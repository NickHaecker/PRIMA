namespace L02_SpaceInvaderGameObjects {
    import fudge = FudgeCore;
    let nodes: any = {};
    const viewport: fudge.Viewport = new fudge.Viewport();
    const FPS: number = 60;
    let canvas: HTMLCanvasElement;
    const cam: fudge.ComponentCamera = new fudge.ComponentCamera();
    cam.mtxPivot.translateZ(33);
    cam.mtxPivot.rotateY(180);
    cam.mtxPivot.translateY(5);
    const startX: number = -3;

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

    function AddChild(parent: string, child: string): void {
        const parentNode: fudge.Node = GetNode(parent);
        const childNode: fudge.Node = GetNode(child);
        parentNode.appendChild(childNode);
    }
   
    function initPlayer(): void {
        const base: fudge.Node = GetNode("Base");
        base.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        base.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        const head: fudge.Node = GetNode("Head");
        head.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        head.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        head.addComponent(new fudge.ComponentTransform());
        head.getComponent(fudge.ComponentMesh).mtxPivot.translateY(0.7);
        head.getComponent(fudge.ComponentMesh).mtxPivot.scale(new fudge.Vector3(0.4, 0.4, 0.4));
    }

    function initShields(shields: Number): void {
        const startY: number = 2;
        for (let i: number = 0; i < shields; i++) {
            const shield: fudge.Node = GetNode(`Shield-${i}`);
            shield.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
            shield.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
            shield.addComponent(new fudge.ComponentTransform());
            shield.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY);
            const calcX: number = startX + (2 * i);
            shield.getComponent(fudge.ComponentMesh).mtxPivot.translateX(calcX);
            AddChild("Shields", shield.name);
        }
    }

    function initEnemies(rows: number, columns: number): void {
        const startY: number = 13;
       
        let enemieCount: number = 0;
        for (let y: number = rows; y > 0; y--) {
            for (let x: number = 0; x < columns; x++) {
                const enemy: fudge.Node = GetNode(`Enemy-${enemieCount}`);
                enemy.addComponent(new fudge.ComponentMesh(new fudge.MeshSphere()));
                enemy.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
                enemy.addComponent(new fudge.ComponentTransform());
                enemy.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY - (2 * y));
                enemy.getComponent(fudge.ComponentMesh).mtxPivot.translateX(startX + (2 * x));
                AddChild("Enemies", enemy.name);
                enemieCount++;
            }
        }
        const motherShip: fudge.Node = GetNode("Alienship");
        motherShip.addComponent(new fudge.ComponentMesh(new fudge.MeshQuad()));
        motherShip.addComponent(new fudge.ComponentMaterial(new fudge.Material("White", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("WHITE")))));
        motherShip.addComponent(new fudge.ComponentTransform());
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.translateY(startY + 1);
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.translateX(startX);
        motherShip.getComponent(fudge.ComponentMesh).mtxPivot.scaleX(2)
    }
    
    window.addEventListener("load", handleLoad);
    function handleLoad(_event: Event): void {
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









        const gameNode: fudge.Node = GetNode("Game");
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