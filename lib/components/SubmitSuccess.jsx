import React, { Component } from 'react';

export default class SubmitSuccess extends Component {

  render() {
    return (
      <div>
        <h1>Success!</h1>

        <div className='btn-container'>
          <button className='btn view-photos-btn'>View Photos</button>
          <button className='btn take-another-btn'>Take Another</button>
          <button className='btn close-btn'>Close</button>
        </div>
      </div>
    )
  }
}
