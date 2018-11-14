import React, { Component } from 'react';
import Row from '../Row/Row';
import './Table.css';

export default class Table extends Component {
  renderRows(data, isKids) {
    const { deleteRow } = this.props;
    if (!isKids) {
      return data.map(({ data, kids }, i) => (
        <Row data={data} kids={kids} index={i} key={i} deleteRow={deleteRow} />
      ));
    } else {
      return data[Object.keys(data)[0]].records.map(({ data, kids }, i) => (
        <Row data={data} kids={kids} key={i} deleteRow={deleteRow} />
      ));
    }
  }

  getHeadings(data, isKids) {
    if (!isKids) {
      return Object.keys(data[0].data);
    } else {
      const childHeadings = Object.keys(
        data[Object.keys(data)[0]].records[0].data,
      );
      return childHeadings;
    }
  }

  renderTableHeading(headings, isKids) {
    const headingHtml = headings.map((key, i) => (
      <th className="lable" key={key + i}>
        {key}
      </th>
    ));
    const blank = <th key="blank" className="label" />;
    const remove = <th key="remove" className="label" />;
    return [blank, ...headingHtml, remove];
  }

  render() {
    const { data, isKids, tableLabel } = this.props;
    const headings = this.getHeadings(data, isKids);
    return (
      <table>
        <caption>{tableLabel}</caption>
        <thead>
          <tr className="table-heading">
            {this.renderTableHeading(headings, isKids)}
          </tr>
        </thead>
        <tbody>{this.renderRows(data, isKids)}</tbody>
      </table>
    );
  }
}
