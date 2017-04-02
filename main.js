const electron = require('electron');
const fs = require('fs');
const path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menubar = require('menubar');
const webContents = electron.webContents;
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const mb = Menubar({
  width: -1,
  height: -1,
  icon: './snip-it-logo.png',
  tooltip: 'click to take a screenshot!'
});
const screenshot = require('electron-screenshot-service');
const shell = require('shelljs');
const sizeOf = require('image-size');
const electronShell = electron.shell

let editWindow = null;
let currentFolder = '';
app.dock.setIcon('./snip-it-logo.png');
app.dock.setBadge('Snip-It');
// app.getFileIcon('./snip-it-logo.png', (error, image) => {
//   icon: './snip-it-logo.png'
//   console.log(error)
// })

mb.on('after-show', () => {
  enableScreenshot();
})

const takeNewSS = () => {
  editWindow.hide();
  enableScreenshot();
}

const enableScreenshot = () => {
  const newImg = Date.now() + '.png'
  shell.mkdir('-p', '~/Desktop/snip-it-images')
  const folder = app.getPath('desktop') + `/snip-it-images`;
  let directories;
  fs.readdir(folder, (err, files) => {
    directories = files.filter(file => fs.statSync(path.join(folder, file)).isDirectory())
  })
  const sShot = shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    openEditWindow(newImg, directories)
  })
}

const openEditWindow = (file, directories) => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${file}`
  const d = sizeOf(filePath)
  const imgData = {
    filePath,
    file,
    width: d.width,
    height: d.height,
    directories
  }

  editWindow = new BrowserWindow({
    show: false,
    title: 'Edit Screenshot',
    width: d.width + 50,
    height: d.height + 150
  });

  fs.exists(filePath, (exists) => {
    if(exists) {
      editWindow.show()
      editWindow.openDevTools();
      editWindow.loadURL('file://' + __dirname + '/public/index.html')
      app.dock.show()
    }
  })

  editWindow.on('focus', () => {
    ipc.on('mounted', (event, response) => {
      if(response === 'mounted') {
        editWindow.webContents.send('currentImg', imgData)
      }
    })
  })
}

const saveFile = (input) => {
  const { folder, newName, file } = input;
  currentFolder = folder;
  shell.mkdir('-p', `~/Desktop/snip-it-images/${folder}`)
  shell.cd(`~/Desktop/snip-it-images`)
  shell.mv('-n' ,`${file}`, `${folder}/${newName}.png`)
}

const fileCheck = (input) => {
  const { folder, newName } = input;
  const filePath = app.getPath('desktop') + `/snip-it-images/${folder}/${newName}.png`

  fs.exists(filePath, (exists) => {
    if (exists) {
      editWindow.webContents.send('duplicate', true)
    }
    else {
      editWindow.webContents.send('duplicate', false)
    }
  })
}

const viewImages = () => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${currentFolder}/`
  editWindow.hide()
  electronShell.openItem(filePath)
}

const deleteFile = (image) => {
  shell.rm(image.filePath);
  editWindow.hide();
  enableScreenshot();
}

const closeWindow = () => {
  editWindow.hide();
}

exports.enableScreenshot = enableScreenshot;
exports.fileCheck = fileCheck;
exports.saveFile = saveFile;
exports.viewImages = viewImages;
exports.takeNewSS = takeNewSS;
exports.deleteFile = deleteFile;
exports.closeWindow = closeWindow;
