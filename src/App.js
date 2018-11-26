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
      data.filter(d => d);
      this.setState({ data });
    } else {
      this.deleteChildren(data, path);
      this.setState({ data });
    }
  }

  deleteChildren(data, path) {
    if (typeof path === 'string') {
      const parts = path.split('.');
      if (parts.length === 1) {
        return delete data[parts[0]];
      }
      return this.deleteChildren(data[parts[0]], parts.slice(1).join('.'));
    }
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
