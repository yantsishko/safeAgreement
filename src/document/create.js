import React, { Component } from 'react';
import Quill from 'quill';
import { saveAgreement } from './../helpers/agreements';
import Loader from 'react-loader-spinner'

export default class CreateDocument extends Component {
  quill = null;
  state = {
    isLoading: false,
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
      placeholder: 'Place for agreement',
      theme: 'snow'  // or 'bubble'
    });
  }

  handleName = (e) => {
    this.setState({ participantName: e.target.value })
  }

  handleSubmit = async () => {
    this.setState({ isLoading: true })
    const container = document.getElementById('editor');
    const customHtml = container.querySelector('.ql-editor').innerHTML;

    await saveAgreement(+localStorage.getItem('user'), {
      customHtml: customHtml,
      pathToPdf: '',
      participantName: this.state.participantName,
    });

    this.props.history.push(`/`)
  };

  render () {
    return (
      <div className="container-fluid">
        { this.state.isLoading
          ? (
            <div className="d-flex justify-content-center">
              <Loader
                type="Watch"
                color="#000000"
                height="30"
                width="30"
              />
            </div>
          )
          : (
            <>
              <h2>Create a Document</h2>
              <div id="editor" />
              <div style={ { display: 'flex', justifyContent: 'space-between' }} className="mt-2">
                <input type="text" placeholder="Participant Name" onChange={ this.handleName } value={ this.state.participantName }/>
                <button className="btn btn-primary" onClick={ this.handleSubmit }>Create</button>
              </div>
            </>
          )
        }
      </div>
    )
  }
}
