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
const sizeOf = require('image-size');

let editWindow = null;

mb.on('after-show', () => {
  enableScreenshot();
  // mb.window.loadURL('file://' + __dirname + '/public/index.html');
  // mb.window.openDevTools();
})

const enableScreenshot = () => {
  const newImg = Date.now() + '.png'
  shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  const sShot = shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    openEditWindow(newImg)
  })
}

const openEditWindow = (file) => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${file}`
  let d = sizeOf(filePath)
  const imgData = {
    filePath,
    width: d.width,
    height: d.height
  }
  editWindow = new BrowserWindow({
    show: false,
    // backgroundColor: '#000',
    title: 'Edit Screenshot',
  });

  fs.exists(filePath, (exists) => {
    if(exists) {
      editWindow.show()
      editWindow.openDevTools();
      editWindow.loadURL('file://' + __dirname + '/public/index.html')
    }
  })

  editWindow.on('focus', () => {
    setTimeout( () => {
      editWindow.webContents.send('currentImg', imgData)
    }, 500)
  })

}


exports.enableScreenshot = enableScreenshot;
