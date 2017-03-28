import React, { Component } from 'react';

const fs = window.require('fs');
const ImageList = './images/';
// import pic from './images/1490661116074.png';

// import imageFolder from '../../images';

const electron = window.require('electron');
const remote = electron.remote;
console.log(remote);
const ipcRenderer = electron.ipcRenderer
// import main from '../../main.js'
const mainProcess = remote.require('./main.js');


export default class App extends Component {
  constructor() {
    super();
    this.screenshot = this.screenshot.bind(this)
  }

  screenshot() {
    mainProcess.enableScreenshot()
  }

  componentDidMount() {
    fs.readDir('./images', function(dir) {
      console.log(dir)
    });
  }

  render() {

    return (
      <div>
        <h1>Hey Gurl!</h1>
        <button onClick={this.screenshot}
                className='btn'>
                screenshot
        </button>
        <img src={`${ImageList}1490661116074.png`} />
      </div>
    )
  }
}
