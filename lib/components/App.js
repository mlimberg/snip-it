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
  }

  componentDidMount() {
    ipc.send('mounted', 'mounted')

    ipc.on('currentImg', (event, imgData) => {
      this.setState({ imgData })

    })
  }

  saveFile() {
    const { folder, newName, imgData } = this.state;
    const { file } = imgData;
    const img = document.getElementById('screenshot')
    mainProcess.fileCheck({ folder, newName, file })
    ipc.on('duplicate', (event, response) => {
      if (response === true) {
        console.log('true: ', response)
        this.setState({ errorMessage: true })
      }
      else if (response === false) {
        console.log('false: ', response)
        this.setState({ errorMessage: false })
      }
    })
    // ipc.removeAllListeners('duplicate')
  }

  render() {
    const { imgData, folder, newName } = this.state
    const errorMessage = () => {
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
              onChange={(e) => this.setState({ folder: e.target.value })}/>
          </label>
          <input
            placeholder='Name'
            onChange={(e) => this.setState({ newName: e.target.value })}/>
          <button
            className='btn'
            onClick={this.saveFile}
            // disabled={this.enableSaveBtn()}
            >Save
          </button>
        </div>
        {errorMessage()}


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
