const {app, dialog, BrowserWindow, ipcMain, Menu, shell, globalShortcut, Tray, nativeImage} = require("electron");
const path = require('path');

const template = [
    { label: 'Fichier',
      submenu: [
          {
              label: 'Nouveau',
              accelerator: "CmdOrCtrl+Alt+I",
              click: function() {
                  console.log("coucou");
              }
          },
          { type: "separator"},
          {
              label: 'Ouvrir un fichier',
              type: 'checkbox',
              checked: true
          },
          {
              label: "Accéder au site",
              click: function() {
                    shell.openExternal('mailto:jblavisse@truc.fr')
              }
          }
      ]
    },
    { label: 'Editer'},
    { label: 'Personnaliser',
      submenu: [
          {label: "Zoomer", role: "zoomIn"},
          {label: "Dézoomer", role: "zoomOut"},
          {label: "Open dev tools", role:"toggleDevTools"}
      ]}
]

let tray;
const trayMenu = Menu.buildFromTemplate([
    {
        label: "Créer fichier"
    }
])

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname,'preload.js')
        },
        backgroundColor: '#7878f6',
        show: false
    });

    win.loadFile('index.html');
    //win.loadURL('https://github.com/')
    win.once('ready-to-show', () => {
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
        win.setIcon(path.join(__dirname, 'icone.ico'));
        win.show()
    })

    ipcMain.on("msg", (event,data) => {
        console.log(data);
        const dialogOptions =  {
            message: "coucou la famille!",
            type: "warning",
            checkboxLabel: "coche-moi",
            title: "Bienvenue"
        }

        dialog.showMessageBox(win, dialogOptions).then(
            (response, checkboxChecked) => {
                console.log(response);
                console.log(checkboxChecked);
            })
    })


}

app.whenReady().then(() => {

    const icon = nativeImage.createFromPath('icone.ico')
    tray = new Tray(icon)
    tray.setToolTip('Ceci est mon application') // infobulle
    tray.setTitle('Ceci est mon titre') // titre icone
    tray.setContextMenu(trayMenu)


    globalShortcut.register("CmdOrCtrl+Alt+Y", () => {
        shell.openExternal("https://www.google.fr")
    })

    console.log("Desktop app is ready");
    console.log(path.join(__dirname, "icone.ico"));
    console.log(path.resolve("icone.ico"));
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()

        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


app.setUserTasks([
    {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'Nouvelle fenêtre',
        description: 'Créer une nouvelle fenêtre'
    },
    {
        program: process.execPath,
        arguments: '',
        iconPath: nativeImage.createFromPath("icone.ico"),
        iconIndex: 0,
        title: 'Ajouter un fichier',
        description: 'Pour ajouter un fichier qui tue sa mère'
    }
])


require('update-electron-app')()