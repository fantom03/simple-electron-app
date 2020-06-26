const electron = require('electron');
const path = require('path')

const remote = electron.remote;
const dialog = remote.dialog;
const ipc = electron.ipcRenderer;
const { BrowserWindow } = remote;

const closeBtn = window.document.getElementById("close-btn");
closeBtn.addEventListener('click', () => {
    const allWindows = BrowserWindow.getAllWindows()
    allWindows.forEach(i => i.close())
})

const title = document.getElementById("input-title");

const inputBtn = document.getElementById("input-btn");
inputBtn.addEventListener('click', () => {
    let window = new BrowserWindow({
        width: 400,
        height: 200,
        // alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    const modalPath = path.join(__dirname, "..", "comp_input", "changeTitle.html")
    window.loadFile(modalPath);
    window.on('close', () => window = null);
    window.setMenu(null)
    // window.webContents.openDevTools()
    // window.show()
})

const gmailBtn = document.getElementById("gmail-btn");
gmailBtn.addEventListener('click', () => {
    let window = new BrowserWindow({
        width: 1500,
        height: 1200,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })
    const modalPath = path.join(__dirname, "..", "comp_gmail", "gmail.html")
    window.loadFile(modalPath);
    window.on('close', () => window = null);
    window.on('ready-to-show', () => {
        window.show()
    })
    window.setMenu(null)
})

const githubBtn = document.getElementById("github-btn");
githubBtn.addEventListener('click', () => {
    let window = new BrowserWindow({
        width: 1500,
        height: 1200,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })
    const modalPath = path.join(__dirname, "..", "comp_github", "github.html")
    window.loadFile(modalPath);
    window.on('close', () => window = null);
    window.on('ready-to-show', () => {
        window.show()
    })
    // window.webContents.openDevTools()
    window.setMenu(null)
})

ipc.on('target-input-title', (_, arg) => {
    title.innerHTML = arg
})