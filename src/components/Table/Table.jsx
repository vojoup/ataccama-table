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

  renderTableHeading() {
    const { data } = this.props;
    const headingHtml = Object.keys(data[0].data).map((key, i) => (
      <th className="lable" key={key + i}>
        {key}
      </th>
    ));
    const blank = <th key="blank" className="label" />;
    headingHtml.unshift(blank);
    return headingHtml;
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="table-heading">{this.renderTableHeading()}</tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}
