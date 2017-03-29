const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menubar = require('menubar');
const mb = Menubar({
  width: 400,
  height: 500,
  icon: './snip-it-logo.png'
});
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

// app.on('ready', (file) => {
//   let contents = fs.readFileSync(file)
//   console.log(contents)
// })

const enableScreenshot = () => {
  let temp = Date.now()
  let createFolder = shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  if (createFolder === 0) {
    shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  }
  shell.exec(`screencapture -i ~/Desktop/snip-it-images/${temp}.png`, { async: true })
}

exports.enableScreenshot = enableScreenshot;

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
