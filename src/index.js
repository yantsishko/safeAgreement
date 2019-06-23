import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { initArweave } from "./helpers/arweave";
import { initFluence } from "./helpers/fluence";

async function run () {
  await Promise.all([initFluence(), initArweave()]);
  ReactDOM.render(<App />, document.getElementById('root'));
}

run();
