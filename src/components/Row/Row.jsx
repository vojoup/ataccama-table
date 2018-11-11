import React, { Component } from 'react';
import './Row.css';

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
    return (
      <>
        <tr className="row" onClick={this.toggleShowKids}>
          {this.renderData()}
        </tr>
        <tr>{displayingKids && <div className="wrapper">KIDS</div>}</tr>
      </>
    );
  }
}
