import React, { Component } from 'react';

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

  render() {

    return (
      <div>
        <h1>Hey Gurl!</h1>
        <button onClick={this.screenshot}
                className='btn'>
          Screenshot
        </button>
      </div>
    )
  }
}
