import React, { Component } from 'react';
import './Column.css';

export default class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayingKids: false,
    };
    this.showKids = this.showKids.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  showKids() {
    const { displayingKids } = this.state;
    this.setState({ displayingKids: !displayingKids });
  }

  renderData() {
    const { data, kids } = this.props;
    const { displayingKids } = this.state;
    const html = [];
    if (!this.isEmpty(kids)) {
      html.push(
        <span key="<" className="data-cell">
          {displayingKids ? '˅' : '>'}
        </span>,
      );
    }
    Object.keys(data).map((item, i) =>
      html.push(
        <span className="data-cell" key={i}>
          {data[item]}
        </span>,
      ),
    );
    return html;
  }

  render() {
    return (
      <div className="row" onClick={this.showKids}>
        {this.renderData()}
      </div>
    );
  }
}
