import React from 'react';
import Spinner from '../helpers/spinner';
import { findDocuments } from '../helpers/arweave';

export default class FindDocuments extends React.Component {
  state = {
    list: [],
    isLoading: false,
  };

  handleSearch = async (e) => {
    this.setState({ isLoading: true });
    const list = await findDocuments(e.target.value);
    this.setState({ list, isLoading: false });
  };

  render () {
    return (
      <div className="container-fluid">
        <div className="form-group">
          <label htmlFor="participant">Participant Full Name:</label>
          <input className="form-control" id="participant" onChange={ this.handleSearch } placeholder="Participant Full Name" />
        </div>
        <div>
          { this.state.isLoading
            ? <Spinner />
            : (
              <div>
                {
                  this.state.list.map(item => (
                    <div key={item} className="d-block">
                      <a rel="noopener noreferrer" target="_blank" href={ `http://arweave.net/${item}` }>{`http://arweave.net/${item}`}</a>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
