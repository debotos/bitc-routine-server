import React, { Component } from 'react';

import './buttonAltSpinner.css';

export default class ButtonAltSpinner extends Component {
  render() {
    return (
      <div className="lds-ellipsis">
        <div style={{ background: this.props.color }} />
        <div style={{ background: this.props.color }} />
        <div style={{ background: this.props.color }} />
        <div style={{ background: this.props.color }} />
      </div>
    );
  }
}
