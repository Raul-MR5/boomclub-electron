const { app, BrowserWindow } = require('electron')

const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600, //1100
        height: 900, //720
        resizable: false,
        title: 'BoomClub',
        icon: 'https://firebasestorage.googleapis.com/v0/b/boomclub-tfg.appspot.com/o/boomclub.png?alt=media&token=14ede50f-dcfc-41e3-8bea-03b90978e28a',
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})