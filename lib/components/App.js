import React, { Component } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer
const mainProcess = remote.require('./main.js');
import ImageCard from './ImageCard.jsx';
// import { SketchField, Tools } from 'react-sketch';
import ReactPaint from 'react-paint';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: ''
    }
  }

  componentWillMount() {
    ipc.on('currentImg', (event, imgData) => {
      console.log('imgData ', imgData);
      this.setState({ imgData })
    })
  }

  render() {
    const props = {
      style: {
        backgroundImage: `url(${this.state.imgData.filePath})`,
        backgroundRepeat: 'no-repeat'
      },
      brushCol: '#ffffff',
      lineWidth: 3,
      className: 'react-paint',
      height: this.state.imgData.height,
      width: this.state.imgData.width
    };


    return (
      <div>
        <h1>Hey Gurl!</h1>
        {/* <canvas width='200px' height='200px'></canvas> */}
        {/* <SketchField height='300px'
                     width='200px'
                     tool={Tools.Pencil}
                     color='black'
                     lineWidth={3}/> */}
        <ReactPaint {...props} />
      </div>
    )
  }
}
