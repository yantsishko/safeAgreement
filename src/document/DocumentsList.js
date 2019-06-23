import React, { Component } from 'react';
import { getUserAgreements } from './../helpers/agreements';
import Loader from 'react-loader-spinner'

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
        <div>
          {item.id} - {item.participantname} - Waiting signature
        </div>
      )
    }

    if (item.pathtopdf !== '') {
      return (
        <div>
          {item.id} - {item.participantname} - {`http://arweave.net/${item.pathtopdf}`}
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
            ) : (
              <div style={{marginLeft: '60px'}}>
                <Loader
                  type="Watch"
                  color="#000000"
                  height="30"
                  width="30"
                />
              </div>
          )
        }
      </div>
    )
  }

}
