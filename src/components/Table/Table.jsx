import React, { Component } from 'react';
import Row from '../Row/Row';
import './Table.css';

export default class Table extends Component {
  renderRows() {
    const { data } = this.props;
    return data.map(({ data, kids }, i) => (
      <Row data={data} kids={kids} key={i} />
    ));
  }

  renderTableLable() {
    const { data } = this.props;
    return Object.keys(data[0].data).map((key, i) => (
      <span className="lable" key={key + i}>
        {key}
      </span>
    ));
  }

  render() {
    return (
      <div>
        <div className="table-heading">{this.renderTableLable()}</div>
        <div>{this.renderRows()}</div>
      </div>
    );
  }
}
