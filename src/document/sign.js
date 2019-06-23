import React from 'react'
import Canvas from "../Canvas";
import {uploadFile} from "../helpers/arweave";
import {getAggreementById} from "../helpers/agreements";
import {createPdf} from "../helpers/pdfCreator";

export default class SignDocument extends React.Component {
  state = {
    customhtml: null,
    signature: null
  }

  async componentWillMount() {
    const res = await getAggreementById(this.props.match.params.id)
    this.setState(res[0] || this.state)
  }

  onPaintSign = (signature) => {
    this.setState({ signature })
  }

  handleSign = async () => {
    const pdf = await createPdf(this.state);
    // const pdfLink = await uploadFile(pdf);
    // const result = await addPdfLink(pdfLink);
    // console.log(result)
    console.log(pdf)
  }

  render () {
    return (
      <div className="container-fluid">
        <h2>Sign the Document</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.customhtml }} />
        <Canvas onPaintSign={ this.onPaintSign } />
        <div className="d-flex flex-row-reverse">
          <button onClick={ this.handleSign }>Sign</button>
        </div>
      </div>
    )
  }
}