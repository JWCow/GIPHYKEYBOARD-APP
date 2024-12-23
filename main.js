const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        transparent: true,
        resizable: false,
        show: false
    });

    // Load the app
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }

    mainWindow.center();
}

function toggleWindow() {
    if (mainWindow === null) {
        createWindow();
    } else if (mainWindow.isVisible()) {
        mainWindow.hide();
    } else {
        mainWindow.show();
        mainWindow.center();
    }
}

app.whenReady().then(() => {
    // Use Command on Mac and Control on Windows/Linux
    const modifier = process.platform === 'darwin' ? 'Command' : 'Super';
    globalShortcut.register(`${modifier}+C`, toggleWindow);

    // Register Escape key to hide window
    globalShortcut.register('Escape', () => {
        if (mainWindow && mainWindow.isVisible()) {
            mainWindow.hide();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
}); 