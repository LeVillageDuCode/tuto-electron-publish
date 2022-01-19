const {ipcRenderer} = require("electron");

function openDialogJson() {
    console.log("Je veux pouvoir envoyer un message au main");
    ipcRenderer.send("msg", "coucou, c'est moi le renderer process");
}

window.addEventListener('DOMContentLoaded', () => {

    const electronVersion = document.getElementById('electronVersion')
    if (electronVersion) {
        electronVersion.textContent = process.versions.electron;
    }

    const osName = document.getElementById('os');
    if (osName) {
        osName.textContent = process.platform;
    }

    const h1 = document.getElementById('title');
    if(h1) {
        h1.addEventListener("click",openDialogJson)
    }

})
