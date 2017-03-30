const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menubar = require('menubar');
const webContents = electron.webContents;
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
  mb.window.openDevTools();
})

// app.on('ready', () => {
//   console.log('ready!');
//   app.send('imageList', 'yo!')
// })

// mb.on('show', () => {
//   console.log('show');
//   const pathToFile = app.getPath('desktop') + '/snip-it-images'
//   const content = fs.readdir(pathToFile, (err, data) => {
//     const package = {
//       path: pathToFile,
//       data: data
//     }
//     mb.window.webContents.send('imageList', package)
//   })
// })

mb.on('ready', () => {
  console.log('ready');
  // let package = 'hey'
  // const pathToFile = app.getPath('desktop') + '/snip-it-images'
  // fs.readdir(pathToFile, (err, data) => {
  //   package = {
  //     path: pathToFile,
  //     data: data
  //   }
  // })
  // mb.on('show', () => {
  //   mb.window.webContents.send('imageList', package)
  //
  // })
})

const openNewImageFile = (file) => {
  const filePath = app.getPath('desktop') + `/snip-it-images/${file}`
  let newWindow = new BrowserWindow({ show: false });
  fs.exists(filePath, (exists) => {
    if(exists) {
      console.log('exists!');
      newWindow.show()
    }
  })
}

const enableScreenshot = () => {
  mb.window.hide();
  const newImg = Date.now() + '.png'
  shell.exec('mkdir ~/Desktop/snip-it-images', { async: true })
  const sShot = shell.exec(`screencapture -i ~/Desktop/snip-it-images/${newImg}`, () => {
    openNewImageFile(newImg)
  })
}

exports.enableScreenshot = enableScreenshot;
