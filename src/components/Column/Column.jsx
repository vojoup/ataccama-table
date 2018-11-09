import React, { Component } from 'react';
import './Column.css';

export default class Column extends Component {
  renderData() {
    const { data } = this.props;
    return Object.keys(data).map(item => (
      <span className="data-cell">{data[item]}</span>
    ));
  }

  render() {
    return <div className="row">{this.renderData()}</div>;
  }
}
