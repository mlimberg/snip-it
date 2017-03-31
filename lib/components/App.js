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
    const canvas = document.querySelector('canvas');
    const file = canvas.toDataURL('image/png');

  }

  render() {
    const {imgData} = this.state

    const props = {
      style: {
        backgroundImage: `url(${imgData.filePath})`,
        backgroundRepeat: 'no-repeat'
      },
      brushCol: '#ffffff',
      lineWidth: 3,
      className: 'react-paint',
      height: imgData.height,
      width: imgData.width
    };

    return (
      <div>
        <div className='buttons-container'>
          <button className='btn'
                  onClick={this.saveFile}>Save</button>
          <button className='btn'>Undo</button>
        </div>

        <div className='canvas-container'>
          <ReactPaint {...props} />
        </div>

      </div>
    )
  }
}
