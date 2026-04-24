const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;

function startServer() {
    // Caminho relativo para o JAR que você vai gerar
    const jarPath = path.join(__dirname, '../projeto-api/target/seu-app.jar');
    serverProcess = spawn('java', ['-jar', jarPath], { stdio: 'pipe' });
}

function createWindow() {
    const win = new BrowserWindow({ width: 1200, height: 800 });
    win.loadURL('http://localhost:8080');
}

app.whenReady().then(() => {
    startServer();
    // ideal: verificar se servidor está no ar, mas para teste:
    setTimeout(createWindow, 3000);
});

app.on('window-all-closed', () => {
    if (serverProcess) serverProcess.kill();
    app.quit();
});