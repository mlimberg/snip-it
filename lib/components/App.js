import React, { Component } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const mainProcess = remote.require('./main.js');
import ImageCard from './ImageCard.jsx';
import ReactPaint from 'react-paint';
import FileSaver from 'FileSaver';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: '',
      folder: '',
      newName: '',
      errorMessage: false
    }

    this.saveFile = this.saveFile.bind(this);
    this.fileCheck = this.fileCheck.bind(this);
  }

  componentDidMount() {
    ipc.send('mounted', 'mounted')

    ipc.on('currentImg', (event, imgData) => {
      this.setState({ imgData })

    })
  }

  fileCheck(e) {
    const { folder, imgData } = this.state;
    const { file } = imgData;
    const newName = e.target.value;

    mainProcess.fileCheck({ folder, newName, file })

    ipc.on('duplicate', (event, response) => {
      if (response === true) {
        this.setState({ errorMessage: true })
      }
      else if (response === false) {
        this.setState({ errorMessage: false })
      }
    })
  }

  saveFile() {
    const { folder, newName, imgData } = this.state;
    const { file } = imgData;

    const fileToSave = {
      folder,
      newName,
      file
    }
    mainProcess.saveFile(fileToSave);
    this.setState({ folder: '', newName: '' })
  }

  render() {
    const { imgData, folder, newName, errorMessage } = this.state

    const dispErrorMessage = () => {
      if (this.state.errorMessage) {
        console.log('errorMessage true')
        return <p>This file already exists in this folder.  Please enter a new name</p>
      }
    }

    return (
      <div>
        <div className='save-inputs'>
          <label>
            Desktop/snip-it-images/
            <input
              placeholder='Folder'
              value={folder}
              onChange={(e) => this.setState({ folder: e.target.value })}/>
          </label>
          <input
            placeholder={imgData.file}
            value={newName}
            onChange={(e) => this.setState({ newName: e.target.value })}
            onKeyUp={this.fileCheck}/>
          <button
            className='btn'
            onClick={this.saveFile}
            disabled={errorMessage || !newName && !folder}
            >Save
          </button>
        </div>
        {dispErrorMessage()}


        <div className='canvas-container'>
          <img id='screenshot'
               src={imgData.filePath}
               width={imgData.width}
               height={imgData.height}/>
          {/* <ReactPaint {...props} /> */}
        </div>

      </div>
    )
  }
}
