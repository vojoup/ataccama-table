import React, { Component } from 'react';
import Table from './components/Table/Table';
import './App.css';
import Data from './assets/data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
    };
  }

  render() {
    const { data } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <h1>Super dupper app</h1>
        </header>
        <main className="main-content">
          <Table data={data} isKids={false} />
        </main>
      </div>
    );
  }
}

export default App;
