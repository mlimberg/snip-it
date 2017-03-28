import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.screenShot = this.screenShot.bind(this)
  }


  render() {
    console.log(img);

    return (
      <div>
        <h1>Hey Gurl!</h1>
        <button onClick={this.screenShot}
                className='btn'>
          Screenshot
        </button>
      </div>
    )
  }
}
