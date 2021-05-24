namespace L05_PhysicsGame {
    import f = FudgeCore;
    import ƒui = FudgeUserInterface;

    export class GameState extends ƒ.Mutable {
         public hits: number = 0;
    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */ }
  }

    export let gameState: GameState = new GameState();

    export class HUD {
    public static controller: ƒui.Controller;

    public static start(): void {
      let domHud: HTMLDivElement = document.querySelector("div#hud");
      HUD.controller = new ƒui.Controller(gameState, domHud);
      HUD.controller.updateUserInterface();
    }
  }
}