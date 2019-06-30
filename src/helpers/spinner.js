import React from 'react';
import Loader from 'react-loader-spinner';

export default class Spinner extends React.Component {
  render () {
    return (
      <div className="d-flex justify-content-center">
        <Loader
          type="Watch"
          color="#000000"
          height="30"
          width="30"
        />
      </div>
    );
  }
}
