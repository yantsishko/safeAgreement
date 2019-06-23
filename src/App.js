import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateDocument from './document/create';
import SignDocument from './document/sign';
import DocumentsList from './document/DocumentsList';

import './App.css';

class App extends Component {
  componentWillMount() {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', '1');
    }
  }

  // CREATE TABLE users(id varchar(11), name varchar(128))
  // INSERT INTO users VALUES('%1%', '%Yan%'), ('%2%', '%Egor%')
  // CREATE TABLE agreements(id varchar(11), userId varchar(11), customHtml text, pathToPdf varchar(128), participantName varchar(128))
  // INSERT INTO agreements VALUES('%1%', '%1%', '%<p>Text</p>%', '%%', '%Yan T1%')

  // SELECT * FROM agreements LEFT JOIN users ON (users.id = argeements.userId) get agreements list

  render() {
    return (
      <Router>
        <div className="container">
          <ul className="nav mb-3">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/create">Create a Document</Link></li>
          </ul>
          <Route path="/" exact component={DocumentsList} />
          <Route path="/create" component={CreateDocument} />
          <Route path="/sign/:tx" component={SignDocument} />
        </div>
      </Router>
    )
  }
}

export default App;
