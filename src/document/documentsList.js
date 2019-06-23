import React, { Component } from 'react';
import { getUserAgreements } from './../helpers/agreements';
import { Link } from "react-router-dom";
import Spinner from '../helpers/spinner'

export default class DocumentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreements: [],
    }
  }

  async componentDidMount() {
    const agreements = await getUserAgreements(+localStorage.getItem('user'));

    this.setState({
      agreements,
    });
  }

  renderItem = (item) => {
    if (item.pathtopdf === '') {
      return (
        <div className="d-flex justify-content-between">
          <div>
            {item.id}. {item.participantname}
          </div>
          <div style={{ width: '315px' }}>
            <Link to={ `/sign/${item.id}` } >Sign Document</Link>
          </div>
        </div>
      )
    }

    if (item.pathtopdf !== '') {
      return (
        <div className="d-flex justify-content-between">
          {item.id}. {item.participantname}
          <div>
            <a rel="noopener noreferrer" target="_blank" href={ `http://arweave.net/${item.pathtopdf}` }>Document Link</a>
            {item.createDate ? `   Sign date ${item.createDate}` : ''}
          </div>
        </div>
      )
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Documents</h2>
        {
          this.state.agreements.length ? (
            <div>
              {
                this.state.agreements.map((item) => (
                  <div key={item.id}>
                    {this.renderItem(item)}
                  </div>
                ))
              }
            </div>
            ) : <Spinner />
        }
      </div>
    )
  }

}
