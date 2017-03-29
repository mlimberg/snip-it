import React, { Component } from 'react';

export default class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { imgData, path } = this.props

    if(imgData) {
      const images = imgData.map(img => {
        console.log(img);
        return (
          <img src={path+img} />
        )
      })
    }


    return (
      <div>
        {/* {!images ? '' : images } */}
      </div>
    )
  }
}
