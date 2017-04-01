const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menubar = require('menubar');
const webContents = electron.webContents;
const ipc = electron.ipcMain;
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
  shell.mkdir('-p', '~/Desktop/snip-it-images')
  const sShot = shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    openEditWindow(newImg)
  })
}

const openEditWindow = (file) => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${file}`
  const d = sizeOf(filePath)

  const imgData = {
    filePath,
    file,
    width: d.width,
    height: d.height
  }

  editWindow = new BrowserWindow({
    show: false,
    // backgroundColor: '#000',
    title: 'Edit Screenshot',
    width: d.width + 50,
    height: d.height + 150
  });

  fs.exists(filePath, (exists) => {
    if(exists) {
      editWindow.show()
      editWindow.openDevTools();
      editWindow.loadURL('file://' + __dirname + '/public/index.html')
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
  shell.mkdir('-p', `~/Desktop/snip-it-images/${folder}`)
  shell.cd(`~/Desktop/snip-it-images`)
  shell.mv('-n' ,`${file}`, `${folder}/${newName}.png`)
}

const fileCheck = (input) => {
  const { folder, newName } = input;
  const filePath = app.getPath('desktop') + `/snip-it-images/${folder}/${newName}`
  console.log('filepath:', filePath)
  fs.exists(filePath, (exists) => {
    console.log('exists', exists)
    if (exists) {
      editWindow.webContents.send('duplicate', true)
    }
    else {
      editWindow.webContents.send('duplicate', false)
      saveFile(input)
    }
  })
}

exports.enableScreenshot = enableScreenshot;
exports.fileCheck = fileCheck
