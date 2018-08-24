import React, { Component } from 'react';

import SingleCellForm from './SingleCellForm';
import SingleClassEntry from './SingleClassEntry';

class SingleCell extends Component {
  render() {
    // console.log('SingleCell.js got ', this.props.data);
    return (
      <td>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {this.props.data.classes && (
            <SingleCellForm
              day={this.props.day}
              Period_ID={this.props.data.id}
            />
          )}
          {this.props.data.classes &&
            this.props.data.classes.length > 0 &&
            this.props.data.classes.map((singleClassItem, index) => (
              <SingleClassEntry
                day={this.props.day}
                Period_ID={this.props.data.id}
                data={singleClassItem}
                key={index}
              />
            ))}
        </div>
      </td>
    );
  }
}

export default SingleCell;
