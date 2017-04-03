import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const mainProcess = remote.require('./main.js');

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
    mainProcess.viewImages();
  }

  render() {
    return (
      <div className='success-container'>
        <h1>Success!</h1>

        <div className='btn-container'>
          <FlatButton className=' btn view-btn'
                      onTouchTap={this.viewImages}
                      label='Show In Finder' />
          <FlatButton className='btn take-another-btn'
                      onTouchTap={this.takeAnotherSS}
                      label='New Screenshot' />
          <FlatButton className='btn close-btn'
                      onTouchTap={this.closeWindow}
                      label='Close' />
        </div>
      </div>
    )
  }
}
