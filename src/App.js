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

  deleteRow(index, path) {
    const { data } = this.state;
    if (index === path) {
      data.splice(index, 1);
    } else {
      path = `kids.${path}`;
      // console.log(`DELETE ${index}-${path}`);
      for (const p of path.split('.')) {
        // console.log(p);
        delete data[index][p];
      }
    }
    data.filter(d => d);
    // console.log(`AFTER DELETE`, data);
    this.setState({ data });
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
