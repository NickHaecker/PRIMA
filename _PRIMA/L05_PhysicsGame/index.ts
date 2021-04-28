namespace L05 {
    import f = FudgeCore;
    window.addEventListener("load", handleLoad);


    function handleLoad(event: Event): void {

        const dialog: HTMLDialogElement = document.querySelector("dialog");
        dialog?.addEventListener("click", function (_event: Event) {
            dialog.close();
            react(_event);
        });
        dialog?.showModal();
    }
    async function react(event: Event): Promise<void> {
        await FudgeCore.Project.loadResourcesFromHTML();
        let g: any =  f.Project.resources["Graph|2021-04-27T14:39:07.865Z|46119"];
        console.log(g);
    }
}