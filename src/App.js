import React, { Component } from 'react';
import CreateDocument from './document/create';
import DocumentsList from './document/DocumentsList';
import * as fluence from "fluence";

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isloadedFluence: false,
    };

    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', '1');
    }

    let privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
    let contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
    let appId = 258;                                                                      // Deployed database id
    let ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL

    fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
      console.log("Session created");
      window.session = s;
      this.setState({
        isloadedFluence: true,
      });
    });

    window.arweave.network.getInfo().then(console.log);
  }

  // CREATE TABLE users(id int, name varchar(128))
  // INSERT INTO users VALUES(1, 'Yan'), (2, 'Egor')
  // CREATE TABLE agreements(id int, userId int, customHtml text, pathToPdf varchar(128), participantName varchar(128))
  // INSERT INTO agreements VALUES(1, 1, '<p>Text</p>', '', '')

  // SELECT * FROM agreements LEFT JOIN users ON (users.id = argeements.userId) get agreements list

  render() {
    return (
      <div className="container">
        <CreateDocument />
        {
          this.state.isloadedFluence &&  <DocumentsList />
        }
      </div>
    );
  }
}

export default App;
