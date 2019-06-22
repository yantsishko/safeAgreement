import React, { Component } from 'react';
import Quill from 'quill';
import { createPdf } from "../helpers/pdfCreator";

import { saveAgreement } from './../helpers/agreements';

export default class CreateDocument extends Component {
  quill = null;
  state = {
    participantName: ''
  };

  componentDidMount() {
    this.quill = new Quill(document.getElementById('editor'), {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'  // or 'bubble'
    });
  }

  handleName = (e) => {
    this.setState({ participantName: e.target.value })
  }

  handleSubmit = async () => {
    const container = document.getElementById('editor')
    const customHtml = container.querySelector('.ql-editor').innerHTML

    console.log({ participantName: this.state.participantName, customHtml });

    await saveAgreement(+localStorage.getItem('user'), {
      customHtml: customHtml,
      pathToPdf: '',
      participantName: this.state.participantName,
    });

    createPdf(customHtml)
  };

  render () {
    return (
      <div className="container-fluid">
        <h2>Create a Document</h2>
        <div id="editor" />
        <div style={ { display: 'flex', justifyContent: 'space-between' }} className="mt-2">
          <input type="text" placeholder="Participant Name" onChange={ this.handleName } value={ this.state.participantName }/>
          <button className="btn btn-primary" onClick={ this.handleSubmit }>Create</button>
        </div>
      </div>
    )
  }
}
