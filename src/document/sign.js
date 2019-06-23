import React from 'react'
import Canvas from "../Canvas";
import {uploadFile} from "../helpers/arweave";
import {getAggreementById} from "../helpers/agreements";

export default class SignDocument extends React.Component {
  state = {
    customHtml: null,
    signature: null
  }

  async componentWillMount() {
    const a = await getAggreementById()
    console.log(a)
  }

  onPaintSign = (signature) => {
    this.setState({ signature })
  }

  handleSign = () => {
    uploadFile(this.state)
  }

  render () {
    return (
      <div className="container-fluid">
        <h2>Sign the Document</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.customHtml }} />;
        <Canvas onPaintSign={ this.onPaintSign } />
        <div className="d-flex flex-row-reverse">
          <button onClick={ this.handleSign }>Sign</button>
        </div>
      </div>
    )
  }
}