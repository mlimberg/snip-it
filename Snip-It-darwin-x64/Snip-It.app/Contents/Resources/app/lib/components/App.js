import React, { Component } from 'react';
import SaveScreenshot from './SaveScreenshot.jsx';
import SubmitSuccess from './SubmitSuccess.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    }
  }

  render() {

    const displayApp = () => {
      return !this.state.submitted ?
        <SaveScreenshot toggleView={() => this.setState({ submitted: true })} /> : <SubmitSuccess />
    }

    return (
      <div>
        {displayApp()}
      </div>
    )
  }
}
