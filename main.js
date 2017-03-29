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

mb.on('after-create-window', () => {
  mb.window.loadURL('file://' + __dirname + '/public/index.html');
})

mb.on('show', () => {
  const content = 'stuff!'
  mb.window.webContents.send('imageList', content)
})

const enableScreenshot = () => {
  mb.window.hide();
  const temp = Date.now()
  shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  shell.exec(`screencapture -i ~/Desktop/snip-it-images/${temp}.png`, { async: true })
}

exports.enableScreenshot = enableScreenshot;
