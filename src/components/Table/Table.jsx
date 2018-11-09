import React, { Component } from 'react';
import Column from '../Column/Column';
import './Table.css';

export default class Table extends Component {
  renderColumns() {
    const { data } = this.props;
    return data.map(({ data, i }) => <Column data={data} key={i} />);
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
      <>
        <div className="table-heading">{this.renderTableLable()}</div>
        <div>{this.renderColumns()}</div>
      </>
    );
  }
}
