"use strict";
var L05;
(function (L05) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(event) {
        const dialog = document.querySelector("dialog");
        dialog?.addEventListener("click", function (_event) {
            dialog.close();
            react(_event);
        });
        dialog?.showModal();
    }
    async function react(event) {
        await FudgeCore.Project.loadResourcesFromHTML();
        let g = f.Project.resources["Graph|2021-04-27T14:39:07.865Z|46119"];
        console.log(g);
    }
})(L05 || (L05 = {}));
//# sourceMappingURL=index.js.map