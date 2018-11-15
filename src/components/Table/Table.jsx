import React, { Component } from 'react';
import Row from '../Row/Row';
import './Table.css';
import isEmpty from '../../helpers/helpers';

export default class Table extends Component {
  renderRows(dataToProccess, isKids) {
    const { deleteRow } = this.props;
    if (isEmpty(dataToProccess)) {
      return [];
    }
    if (!isKids) {
      return dataToProccess.map(({ data, kids }, i) => (
        <Row
          data={data}
          kids={kids}
          index={i}
          key={i}
          path={i}
          deleteRow={deleteRow}
        />
      ));
    } else {
      return dataToProccess[Object.keys(dataToProccess)[0]].records.map(
        ({ data, kids }, i) => (
          <Row
            data={data}
            kids={kids}
            key={i}
            index={i}
            path={this.getPath(dataToProccess, 'records')}
            deleteRow={deleteRow}
          />
        ),
      );
    }
  }

  getPath(obj, keyToFind) {
    let finalPath;
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === keyToFind) {
          return prop;
        }
        let item = obj[prop];
        if (item instanceof Array || item instanceof Object) {
          let localResult = (p => {
            let result = this.getPath(item, keyToFind);
            if (result) {
              return p + '.' + result;
            }
          })(prop);

          if (localResult) {
            finalPath = localResult;
            break;
          }
        }
      }
    }
    console.log('Final Path', finalPath);
    return finalPath;
  }

  getHeadings(data, isKids) {
    if (data instanceof Object && !isEmpty(data)) {
      if (!isKids) {
        return Object.keys(data[0].data) || [];
      } else {
        const childHeadings = Object.keys(
          data[Object.keys(data)[0]].records[0].data,
        );
        return childHeadings;
      }
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
            {headings && this.renderTableHeading(headings, isKids)}
          </tr>
        </thead>
        <tbody>{data && this.renderRows(data, isKids)}</tbody>
      </table>
    );
  }
}
