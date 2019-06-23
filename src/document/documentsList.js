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

  renderItem = (item, index) => {
    return (
      <tr key={ index }>
        <th scope="row">{ +index + 1 }</th>
        <td>{item.participantname}</td>
        <td>{item.createDate}</td>
        <td>
          {
            item.pathtopdf === ''
            ? <Link to={ `/sign/${item.id}` } >Sign</Link>
            : <a rel="noopener noreferrer" target="_blank" href={ `http://arweave.net/${item.pathtopdf}` }>View</a>
          }
        </td>
      </tr>
    )
  };

  render() {
    return (
      <div className="container">
        <h2>Documents</h2>
        {
          this.state.agreements.length
            ? (
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Participant Name</th>
                    <th scope="col">Sign Date</th>
                    <th scope="col">Link</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.state.agreements.map(this.renderItem)
                }
                </tbody>
              </table>
            )
            : <Spinner />
        }
      </div>
    )
  }

}
