import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.screenShot = this.screenShot.bind(this)
  }

  screenShot() {
  }

  render() {
    return (
      <div>
        <h1>Hey Gurl!</h1>
        <button onClick={this.screenShot}>Screenshot</button>
      </div>
    )
  }
}
