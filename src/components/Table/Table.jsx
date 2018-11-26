import React, { Component } from 'react';
import Row from '../Row/Row';
import './Table.css';
import isEmpty from '../../helpers/helpers';

export default class Table extends Component {
  getHeadings(data, isKids) {
    if (data instanceof Object && !isEmpty(data)) {
      if (!isKids) {
        return Object.keys(data[0].data) || [];
      }
      if (data[Object.keys(data)[0]].records[0]) {
        const childHeadings = Object.keys(data[Object.keys(data)[0]].records[0].data);
        return childHeadings || [];
      }
    }
  }

  renderRows(dataToProccess, isKids) {
    const { deleteRow } = this.props;
    if (isEmpty(dataToProccess)) {
      return [];
    }
    if (!isKids) {
      return dataToProccess.map(({ data, kids }, i) => (
        <Row data={data} kids={kids} index={i} key={i} path={i} deleteRow={deleteRow} />
      ));
    }
    return dataToProccess[Object.keys(dataToProccess)[0]].records.map(({ data, kids }, i) => {
      const { path } = this.props;
      const dataName = Object.keys(dataToProccess)[0];
      const childPath = `${path}.kids.${dataName}.records.${i}`;
      return <Row data={data} kids={kids} key={i} index={i} path={childPath} deleteRow={deleteRow} />;
    });
  }

  renderTableHeading(headings) {
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
          <tr className="table-heading">{headings && this.renderTableHeading(headings)}</tr>
        </thead>
        <tbody>{data && this.renderRows(data, isKids)}</tbody>
      </table>
    );
  }
}
