import React, { Component } from 'react';
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const mainProcess = remote.require('./main.js');
import FlatButton from 'material-ui/FlatButton';

export default class SubmitSuccess extends Component {
  constructor() {
    super();

    this.takeAnotherSS = this.takeAnotherSS.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.viewImages = this.viewImages.bind(this);
  }

  takeAnotherSS() {
    mainProcess.takeNewSS()
  }

  closeWindow() {
    mainProcess.closeWindow()
  }

  viewImages() {
      // const { filePath } = this.state.imgData;
      mainProcess.viewImages();
  }

  render() {
    return (
      <div>
        <h1>Success!</h1>

        <div className='btn-container'>
          <FlatButton className='view-btn'
                      onTouchTap={this.viewImages}
                      label='View My Photos' />
          <FlatButton className='btn take-another-btn'
                      onTouchTap={this.takeAnotherSS}
                      label='Take Another Screenshot' />
          <FlatButton className='btn close-btn'
                      onTouchTap={this.closeWindow}
                      label='Close' />
        </div>
      </div>
    )
  }
}
