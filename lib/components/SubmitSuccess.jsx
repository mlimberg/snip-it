import React, { Component } from 'react';
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const mainProcess = remote.require('./main.js');

export default class SubmitSuccess extends Component {
  constructor() {
    super();

    this.takeAnotherSS = this.takeAnotherSS.bind(this);
  }

  takeAnotherSS() {
    mainProcess.takeNewSS()
  }

  render() {
    return (
      <div>
        <h1>Success!</h1>

        <div className='btn-container'>
          <button className='btn view-photos-btn'>View Photos</button>
          <button className='btn take-another-btn'
                  onClick={this.takeAnotherSS}>Take Another</button>
          <button className='btn close-btn'>Close</button>
        </div>
      </div>
    )
  }
}
