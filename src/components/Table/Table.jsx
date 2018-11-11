import React, { Component } from 'react';
import Row from '../Row/Row';
import './Table.css';

export default class Table extends Component {
  renderRows(data, isKids) {
    if (!isKids) {
      return data.map(({ data, kids }, i) => (
        <Row data={data} kids={kids} key={i} />
      ));
    } else {
      return data[Object.keys(data)[0]].records.map(({ data, kids }, i) => (
        <Row data={data} kids={kids} key={i} />
      ));
      // console.log('DATA to render', data);
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
    headingHtml.unshift(blank);
    return headingHtml;
  }

  render() {
    const { data, isKids, tableLable } = this.props;
    const headings = this.getHeadings(data, isKids);
    return (
      <table>
        {tableLable && <caption>{tableLable}</caption>}
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
