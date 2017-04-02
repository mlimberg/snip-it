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
  }

  takeAnotherSS() {
    mainProcess.takeNewSS()
  }

  closeWindow() {
    mainProcess.closeWindow()
  }

  render() {
    return (
      <div>
        <h1>Success!</h1>

        <div className='btn-container'>
          <FlatButton className='btn view-photos-btn'
                      onTouchTap
                      label='View Images'/>
          <FlatButton className='btn take-another-btn'
                      onTouchTap={this.takeAnotherSS}
                      label='Take Another Screenshot'/>
          <FlatButton className='btn close-btn'
                      onTouchTap={this.closeWindow}
                      label='Close'/>
        </div>
      </div>
    )
  }
}
