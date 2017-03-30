import React, { Component } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer
const mainProcess = remote.require('./main.js');
import ImageCard from './ImageCard.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: ''
    }
    this.screenshot = this.screenshot.bind(this)
  }

  // screenshot() {
  //   mainProcess.enableScreenshot()
  // }

  render() {
    return (
      <div>
        <h1>Hey Gurl!</h1>
        {/* <button onClick={this.screenshot}
                className='btn'>
                screenshot
        </button> */}
      </div>
    )
  }
}
