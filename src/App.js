import React, { Component } from 'react';
import CreateDocument from './document/create';
import SignDocument from './document/sign';
import DocumentsList from './document/DocumentsList';

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
        <SignDocument />
      </div>
    );
  }
}

export default App;
