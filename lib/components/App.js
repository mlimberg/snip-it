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
      imgName: ''
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
    const { folder, imgName, imgData } = this.state;
    // const canvas = document.querySelector('canvas');
    // const file = canvas.toDataURL('image/png');
    const img = document.getElementById('screenshot')
    const imgFile = img.src.toDataURL('image/png')
    console.log(imgFile);
    mainProcess.saveFile({ folder, imgName, imgFile })
  }

  render() {
    const { imgData, folder, imgName } = this.state

    // const props = {
    //   style: {
    //     backgroundImage: `url(${imgData.filePath})`,
    //     backgroundRepeat: 'no-repeat'
    //   },
    //   brushCol: '#ffffff',
    //   lineWidth: 3,
    //   className: 'react-paint',
    //   height: imgData.height,
    //   width: imgData.width
    // };

    return (
      <div>
        <div className='buttons-container'>
          <button className='btn'
                  onClick={this.saveFile}>Save</button>
          <button className='btn'>Undo</button>
        </div>

        <div className='save-inputs'>
          <label>
            Desktop/snip-it-images/
            <input placeholder='Folder'
                   onChange={(e) => this.setState({ folder: e.target.value })}/>
          </label>
          <input placeholder='Name'
                 onChange={(e) => this.setState({ imgName: e.target.value })}/>
        </div>

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
