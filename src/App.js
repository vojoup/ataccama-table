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
    this.deleteRow = this.deleteRow.bind(this);
  }

  deleteRow(i) {
    console.log(`DELETE ${i}`);
    const { data } = this.state;
    delete data[i];
    const newData = data.filter(i => i);
    this.setState({ data: newData });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <h1>Super dupper app</h1>
        </header>
        <main className="main-content">
          <Table data={data} isKids={false} deleteRow={this.deleteRow} />
        </main>
      </div>
    );
  }
}

export default App;
