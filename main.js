const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menubar = require('menubar');
const webContents = electron.webContents;
const mb = Menubar({
  width: -1,
  height: -1,
  icon: './snip-it-logo.png',
  tooltip: 'click to take a screenshot!'
});
const screenshot = require('electron-screenshot-service');
const shell = require('shelljs');

let mainWindow = null;

mb.on('after-show', () => {
  mb.hideWindow()
  enableScreenshot();
  // mb.window.loadURL('file://' + __dirname + '/public/index.html');
  // mb.window.openDevTools();
})

const openNewImageFile = (file) => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${file}`
  let newWindow = new BrowserWindow({ show: false });
  fs.exists(filePath, (exists) => {
    if(exists) {
      newWindow.show()
    }
  })
}

const enableScreenshot = () => {
  // mb.window.hide();
  const newImg = Date.now() + '.png'
  shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  const sShot = shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    openNewImageFile(newImg)
  })
}


exports.enableScreenshot = enableScreenshot;
