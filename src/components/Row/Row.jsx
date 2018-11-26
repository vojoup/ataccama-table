import React, { Component } from "react";
import "./Row.css";
import Table from "../Table/Table";
import isEmpty from "../../helpers/helpers";

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayingKids: false
    };
    this.toggleShowKids = this.toggleShowKids.bind(this);
    this.renderData = this.renderData.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  toggleShowKids() {
    const { displayingKids } = this.state;
    this.setState({ displayingKids: !displayingKids });
  }

  getTableLable(kids) {
    if (kids) {
      return Object.keys(kids)[0];
    }
  }

  deleteRow(e) {
    e.stopPropagation();
    const { deleteRow, index, path } = this.props;
    deleteRow(index, path);
  }

  renderData(displayingKids, kids) {
    const { data } = this.props;
    const html = [];
    if (!isEmpty(kids)) {
      html.push(
        <th key="<" className="data-cell">
          {displayingKids ? " ˅ " : " > "}
        </th>
      );
    } else {
      html.push(<th key="<" className="data-cell" />);
    }
    Object.keys(data).map((item, i) =>
      html.push(
        <th className="data-cell" key={i}>
          {data[item]}
        </th>
      )
    );
    html.push(
      <th key="X" className="data-cell delete" onClick={this.deleteRow}>
        X
      </th>
    );
    return html;
  }

  render() {
    const { displayingKids } = this.state;
    const { kids, deleteRow, index, path } = this.props;
    return (
      <>
        <tr
          className="row"
          onClick={isEmpty(kids) ? null : this.toggleShowKids}
        >
          {this.renderData(displayingKids, kids)}
        </tr>
        <tr colSpan="12">
          <td colSpan="12">
            {displayingKids && (
              <Table
                data={kids}
                isKids={true}
                tableLabel={this.getTableLable(kids)}
                deleteRow={deleteRow}
                index={index}
                path={path}
              />
            )}
          </td>
        </tr>
      </>
    );
  }
}
