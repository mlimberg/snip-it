import React, { Component } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const mainProcess = remote.require('./main.js');
import ImageCard from './ImageCard.jsx';
import FileSaver from 'FileSaver';
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';


export default class SaveScreenshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: '',
      directories: [],
      folder: '',
      newName: '',
      errorMessage: false,
    }

    this.saveFile = this.saveFile.bind(this);
    this.fileCheck = this.fileCheck.bind(this);
    this.viewPhotos = this.viewPhotos.bind(this);
  }

  componentDidMount() {
    ipc.send('mounted', 'mounted')

    ipc.on('currentImg', (event, imgData) => {
      this.setState({ imgData })
      this.setState({ directories: imgData.directories })
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
    console.log('save')
    const { folder, newName, imgData } = this.state;
    const { file } = imgData;

    const fileToSave = {
      folder,
      newName,
      file
    }
    mainProcess.saveFile(fileToSave);
    this.setState({ folder: '', newName: '', imgData: '' }, () => {
      this.props.toggleView()
    })
  }

  viewPhotos() {
      const { filePath } = this.state.imgData;
      mainProcess.viewPhotos(filePath);
    }

  render() {
    const { imgData, folder, newName, directories, errorMessage, submitted } = this.state

    console.log(folder);

    const dispErrorMessage = () => {
      if (errorMessage) {
        return <p>This file already exists in this folder.  Please enter a new name</p>
      }
    }

    return (
      <div>
        <div className='save-inputs'>
          <button
            className='view-btn'
            onClick={this.viewPhotos}
            >View My Photos

          </button>
          <label>
            Desktop/snip-it-images/

              <AutoComplete
                floatingLabelText="Change Screenshot Location"
                hintText='Choose Folder'
                onNewRequest={(folder) => this.setState({ folder })}
                filter={AutoComplete.fuzzyFilter}
                dataSource={directories}
                openOnFocus
              />
          </label>

          <TextField
            id='file-input'
            floatingLabelText="Change Screenshot Name"
            hintText={imgData.file}
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
        </div>
      </div>
    )
  }
}
