import React from 'react';
import CreateDocument from './document/create';

function App() {
  window.arweave.network.getInfo().then(console.log);
  return (
    <div className="container">
      <CreateDocument/>
    </div>
  );
}

export default App;
