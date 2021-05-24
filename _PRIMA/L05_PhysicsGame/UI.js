"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var ƒui = FudgeUserInterface;
    class GameState extends ƒ.Mutable {
        constructor() {
            super(...arguments);
            this.hits = 0;
        }
        reduceMutator(_mutator) { }
    }
    L05_PhysicsGame.GameState = GameState;
    L05_PhysicsGame.gameState = new GameState();
    class UI {
        static start() {
            let domHud = document.querySelector("div#hud");
            Hud.controller = new ƒui.Controller(L05_PhysicsGame.gameState, domHud);
            Hud.controller.updateUserInterface();
        }
    }
    L05_PhysicsGame.UI = UI;
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=UI.js.map