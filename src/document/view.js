import React from 'react';

export default class ViewDocument extends React.Component {
  state = {
    customHtml: null,
    signature: null,
  };

  render () {
    return (
      <div className="container-fluid">
        <h2>Document</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.customHtml }} />;
      </div>
    );
  }
}
