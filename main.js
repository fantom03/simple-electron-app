const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path')

require('dotenv').config()

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        frame: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    const isOk = true
    mainWindow.on('close', function(e){
        e.preventDefault()
            const response = dialog.showMessageBox(this, {
                type: "question",
                cancelId: 0,
                buttons: ['Cancel', 'Yes'],
                title: "Confirmation Dialog",
                message: "Are you sure you want to close this application?"
            }).then(response => {
                if(response.response) this.destroy()
            })
            
        }
    );

    mainWindow.loadFile(path.join(__dirname, "src/comp_index/index.html"))

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()           // Readying the components
    })

    let menu = Menu.buildFromTemplate([
        { label: "Test1" },
        { label: "Test2" },
        { label: "Test3" },
        { label: "Test4" },
        { label: "Test5" }
    ])
    Menu.setApplicationMenu(menu)

    
    // mainWindow.webContents.openDevTools()
}



app.whenReady().then(createWindow)
    .catch(err => {
        console.log(err.message)
    })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('update-input-title', (_, arg) => {
    mainWindow.webContents.send('target-input-title', arg)
})

