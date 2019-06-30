import React from 'react';
import Spinner from '../helpers/spinner';

import Canvas from '../canvas';
import { uploadFile } from '../helpers/arweave';
import { getAggreementById, addPdfLink } from '../helpers/agreements';
import { createPdf } from '../helpers/pdfCreator';

export default class SignDocument extends React.Component {
  state = {
    customhtml: null,
    signature: null,
  };

  async componentWillMount() {
    this.setState({ isLoading: true });
    const res = await getAggreementById(this.props.match.params.id);
    this.setState({ ...res[0], isLoading: false });
  }

  onPaintSign = (signature) => {
    this.setState({ signature });
  };

  handleSign = async () => {
    this.setState({ isLoading: true });
    const pdf = await createPdf(this.state);

    const transaction = await uploadFile(pdf, this.state.participantname || '');
    await addPdfLink(this.props.match.params.id, transaction);

    this.props.history.push(`/`);
  };

  render () {
    return (
      <div className="container-fluid">
        <h2>Sign the Document</h2>
        { this.state.isLoading
          ? <Spinner />
          :
          (
            <div>
              <div dangerouslySetInnerHTML={{ __html: this.state.customhtml }} />
              <div className="form-group">
                <label htmlFor="signature">{ this.state.participantname } signature:</label>
                <Canvas class="form-control d-block" id="signature" onPaintSign={ this.onPaintSign } />
              </div>
              <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary" onClick={ this.handleSign }>Sign</button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
