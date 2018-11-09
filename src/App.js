import React, { Component } from 'react';
import Table from './components/Table/Table';
import './App.css';
import Data from './assets/data.json';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Super dupper app</h1>
        </header>
        <main className="main-content">
          <Table data={Data} />
        </main>
      </div>
    );
  }
}

export default App;
