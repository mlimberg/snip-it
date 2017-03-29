import React, { Component } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer
const mainProcess = remote.require('./main.js');
import ImageList from './ImageList';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      images: ''
    }
    this.screenshot = this.screenshot.bind(this)

  }

  componentWillMount() {
    ipc.on('imageList', (event, content) => {
      this.setState({ images: content })
    })
  }

  screenshot() {
    mainProcess.enableScreenshot()
  }

  render() {
    console.log(this.state.images);
    return (
      <div>
        <h1>Hey Gurl!</h1>
        <button onClick={this.screenshot}
                className='btn'>
                screenshot
        </button>
        <ImageList />
      </div>
    )
  }
}
