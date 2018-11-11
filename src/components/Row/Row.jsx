import React, { Component } from 'react';
import './Row.css';
import Table from '../Table/Table';

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayingKids: false,
    };
    this.toggleShowKids = this.toggleShowKids.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  toggleShowKids() {
    const { displayingKids } = this.state;
    this.setState({ displayingKids: !displayingKids });
  }

  getTableLable(kids) {
    return Object.keys(kids)[0];
  }

  renderData() {
    const { data, kids } = this.props;
    const { displayingKids } = this.state;
    const html = [];
    if (!this.isEmpty(kids)) {
      html.push(
        <th key="<" className="data-cell">
          {displayingKids ? ' ˅ ' : ' > '}
        </th>,
      );
    } else {
      html.push(<th key="<" className="data-cell" />);
    }
    Object.keys(data).map((item, i) =>
      html.push(
        <th className="data-cell" key={i}>
          {data[item]}
        </th>,
      ),
    );
    return html;
  }

  render() {
    const { displayingKids } = this.state;
    const { kids } = this.props;
    return (
      <>
        <tr
          className="row"
          onClick={this.isEmpty(kids) ? null : this.toggleShowKids}
        >
          {this.renderData()}
        </tr>
        <tr colSpan="0">
          <td colSpan="0">
            {displayingKids && (
              <Table
                data={kids}
                isKids={true}
                tableLabel={this.getTableLable(kids)}
              />
            )}
          </td>
        </tr>
      </>
    );
  }
}
