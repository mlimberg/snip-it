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
  icon: path.join(__dirname, 'assets/icons/png/16x16.png'),
  tooltip: 'click to take a screenshot! \nPress spacebar to toggle between selector tool and full window selector'
});
const screenshot = require('electron-screenshot-service');
const shell = require('shelljs');
const sizeOf = require('image-size');
const electronShell = electron.shell

let editWindow = null;
let currentFolder = '';

mb.on('after-show', () => {
  enableScreenshot();
})

const takeNewSS = () => {
  editWindow.hide();
  enableScreenshot();
}

const enableScreenshot = () => {
  let directories;
  const newImg = Date.now() + '.png'
  const folder = app.getPath('desktop') + `/snip-it-images`;

  shell.mkdir('-p', '~/Desktop/snip-it-images')

  fs.readdir(folder, (err, files) => {
    directories = files.filter(file => fs.statSync(path.join(folder, file)).isDirectory())
  })

  shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    fs.exists(`${folder}/${newImg}`, (exists) => {
      if (exists) {
        openEditWindow(newImg, directories)
      }
    })
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
    width: 1000,
    height: d.height + 200,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });

  fs.exists(filePath, (exists) => {
    if(exists) {
      editWindow.show()
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
