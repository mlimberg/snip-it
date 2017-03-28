const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const menubar = require('menubar');
const mb = menubar();
const screenshot = require('electron-screenshot-service');
const shell = require('shelljs');

let mainWindow = null;

// app.on('window-all-closed', function() {
//   if (process.platform != 'darwin') {
//     app.quit();
//   }
// });

mb.on('after-create-window', () => {

  mb.window.loadURL('file://' + __dirname + '/public/index.html');
})

app.on('ready', () => {
  let temp = Date.now()
  let img = shell.exec(`screencapture -i images/${temp}.png`, { async: true })
})

// app.on('ready', function() {
//   mainWindow = new BrowserWindow({width: 1360, height: 800});
//
//   mainWindow.loadURL('file://' + __dirname + '/public/index.html');
//
//   mainWindow.openDevTools();
//
//   mainWindow.on('closed', function() {
//     mainWindow = null;
//   });
// });
