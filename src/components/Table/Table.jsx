import React, { Component } from "react";
import Row from "../Row/Row";
import "./Table.css";
import isEmpty from "../../helpers/helpers";

export default class Table extends Component {
  renderRows(dataToProccess, isKids) {
    const { deleteRow } = this.props;
    if (isEmpty(dataToProccess)) {
      return [];
    }
    if (!isKids) {
      return dataToProccess.map(({ data, kids }, i) => {
        console.log("data to process", dataToProccess);
        console.log("data 1st level index", i);
        return (
          <Row
            data={data}
            kids={kids}
            index={i}
            key={i}
            path={i}
            deleteRow={deleteRow}
          />
        );
      });
    } else {
      return dataToProccess[Object.keys(dataToProccess)[0]].records.map(
        ({ data, kids }, i) => {
          const { path } = this.props;
          const dataName = Object.keys(dataToProccess)[0];
          const childPath = `${path}.kids.${dataName}.records.${i}`;
          console.log("Final child path", childPath);
          return (
            <Row
              data={data}
              kids={kids}
              key={i}
              index={i}
              path={childPath}
              deleteRow={deleteRow}
            />
          );
        }
      );
    }
  }

  getHeadings(data, isKids) {
    if (data instanceof Object && !isEmpty(data)) {
      if (!isKids) {
        return Object.keys(data[0].data) || [];
      } else {
        const childHeadings = Object.keys(
          data[Object.keys(data)[0]].records[0].data
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
